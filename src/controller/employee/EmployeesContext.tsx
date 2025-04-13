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
    allInvalid: boolean;
    invalidate: () => void;
    invalidOne: number | null;
    invalidateOne: (id: number) => void;
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
    allInvalid: false,
    invalidate: () => {},
    needsNext: false,
    next: () => {},
    hasMore: () => false,
    invalidOne: null,
    invalidateOne: () => {},
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

    const [allInvalid, setAllInvalid] = useState(false);

    const [invalidOne, setInvalidOne] = useState<number | null>(null);

    const [needsNext, setNeedsNext] = useState(false);

    function hasMore() {
        return totalItems > pagesLoaded * limit;
    }

    function invalidate() {
        setAllInvalid(true);
    }

    function invalidateOne(id: number) {
        setInvalidOne(id);
    }

    function next() {
        setNeedsNext(true);
    }

    useEffect(() => {
        invalidate();
    }, []);

    useEffect(() => {
        if (invalidOne) {
            fetchInvalidatedOne(invalidOne);
        }
    }, [invalidOne]);

    useEffect(() => {
        console.log(list);
    }, [list]);

    useEffect(() => {
        if (allInvalid) {
            refetchEmployees();
            setAllInvalid(false);
        }
    }, [allInvalid]);

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

        const page = 1;

        const data = await fetchEmployees(page, limit);

        if (data) {
            const { results, count } = data;

            setPagesLoaded(page);
            setTotalItems(count);
            setList(results);
        }
    }

    async function fetchInvalidatedOne(id: number) {
        const employee = await fetchOneEmployee(id);

        setList((list) =>
            list.map((item) => (item.id === id ? employee : item))
        );

        setInvalidOne(null);
    }

    async function fetchOneEmployee(id: number) {
        const data = await axiosInstance
            .get(`${EmployeesEndPoint.PREFIX}/${id}/`)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                console.log(error);
                return undefined;
            });

        return data;
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
            .then((response) => {})
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
        allInvalid,
        invalidate,
        needsNext,
        next,
        hasMore,
        invalidOne,
        invalidateOne,
    };

    return (
        <EmployeesContext.Provider value={context}>
            {children}
        </EmployeesContext.Provider>
    );
}

export const useEmployees = createHook(EmployeesContext);
