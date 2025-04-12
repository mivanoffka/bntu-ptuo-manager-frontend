import { createContext, ReactNode, useEffect, useState } from "react";
import { IEmployee, IEmployeeVersion, IPagination } from "@/model";
import { createHook } from "@/controller/utils";
import { useApi } from "@/controller/api";
import { EmployeesEndPoint } from "@/controller/employee/constants";

export interface IEmployeesContext {
    list: IEmployee[];
    pagination: IPagination;
    setPage: (page: number) => void;
    push: (employee: IEmployee, employeeVersion: IEmployeeVersion) => void;
    remove: (ids: number[]) => void;
    invalidated: boolean;
    invalidate: () => void;
    needsNext: boolean;
    next: () => void;
    hasMore: () => boolean;
}

export const EmployeesContext = createContext<IEmployeesContext>({
    list: [],
    pagination: { current: 0, total: 0, size: 10 },
    setPage: () => {},
    push: () => {},
    remove: () => {},
    invalidated: false,
    invalidate: () => {},
    needsNext: false,
    next: () => {},
    hasMore: () => false,
});

export interface IPaginatedData<T> {
    results: T[];
    count: number;
    next: string | null;
    previous: string | null;
}

export function EmployeesProvider({ children }: { children: ReactNode }) {
    const [list, setList] = useState<IEmployee[]>([]);
    const [pagination, setPagination] = useState<IPagination>({
        current: 0,
        total: 0,
        size: 10,
    });

    const [limit, setLimit] = useState(25);

    const [totalItems, setTotalItems] = useState(0);

    const [pagesLoaded, setPagesLoaded] = useState(0);

    const [invalidated, setInvalidated] = useState(false);

    const [needsNext, setNeedsNext] = useState(false);

    function hasMore() {
        return totalItems > pagesLoaded * limit;
    }

    function invalidate() {
        setInvalidated(true);
    }

    function next() {
        setNeedsNext(true);
    }

    useEffect(() => {
        invalidate();
    }, []);

    useEffect(() => {
        console.log(list);
    }, [list]);

    useEffect(() => {
        if (invalidated) {
            refetchEmployees();
            setInvalidated(false);
        }
    }, [invalidated]);

    useEffect(() => {
        if (needsNext) {
            fetchNextEmployees();
            setNeedsNext(false);
        }
    }, [needsNext]);

    const { axiosInstance } = useApi();

    async function setPage(page: number) {
        setPagination({ ...pagination, current: page });
    }

    async function fetchEmployees(
        page: number,
        limit: number
    ): Promise<IPaginatedData<IEmployee>> {
        const params = {
            page,
            limit,
        };

        const data = await axiosInstance
            .get(EmployeesEndPoint.PREFIX, { params })
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                console.log(error);
                return undefined;
            });

        return data;
    }

    async function refetchEmployees() {
        setPagesLoaded(0);
        setList([]);

        const page = 1;

        const data = await fetchEmployees(page, limit);

        if (data) {
            const { results, count } = data;

            setPagesLoaded(page);
            setTotalItems(count);
            setList([...list, ...results]);
        }
    }

    async function fetchNextEmployees() {
        const page = pagesLoaded + 1;

        const data = await fetchEmployees(page, limit);

        if (data) {
            const { results, count } = data;

            setPagesLoaded(page);
            setTotalItems(count);
            setList([...list, ...results]);
        }
    }

    async function push(
        employee: IEmployee,
        employeeVersion: IEmployeeVersion
    ) {
        const { id } = employee;

        const body = {
            newEmployeeVersion: employeeVersion,
        };

        await axiosInstance
            .patch(`${EmployeesEndPoint.PREFIX}/${id}/`, body)
            .then((response) => {
                invalidate();
            })
            .catch((error) => {
                console.log(error);
            });
    }

    async function remove(ids: number[]) {}

    const context: IEmployeesContext = {
        list,
        pagination,
        setPage,
        push,
        remove,
        invalidated,
        invalidate,
        needsNext,
        next,
        hasMore,
    };

    return (
        <EmployeesContext.Provider value={context}>
            {children}
        </EmployeesContext.Provider>
    );
}

export const useEmployees = createHook(EmployeesContext);
