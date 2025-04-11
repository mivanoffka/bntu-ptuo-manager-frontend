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
}

export const EmployeesContext = createContext<IEmployeesContext>({
    list: [],
    pagination: { current: 0, total: 0, size: 10 },
    setPage: () => {},
    push: () => {},
    remove: () => {},
    invalidated: false,
    invalidate: () => {},
});

export function EmployeesProvider({ children }: { children: ReactNode }) {
    const [list, setList] = useState<IEmployee[]>([]);
    const [pagination, setPagination] = useState<IPagination>({
        current: 0,
        total: 0,
        size: 10,
    });

    const [invalidated, setInvalidated] = useState(false);

    function invalidate() {
        setInvalidated(true);
    }

    useEffect(() => {
        fetchEmployees();
    }, [invalidated]);

    const { axiosInstance } = useApi();

    async function setPage(page: number) {
        setPagination({ ...pagination, current: page });
    }

    async function fetchEmployees() {
        await axiosInstance
            .get(EmployeesEndPoint.PREFIX)
            .then((response) => {
                const employees = response.data;
                setList(employees);
            })
            .catch((error) => {
                console.log(error);
            });
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
    };

    return (
        <EmployeesContext.Provider value={context}>
            {children}
        </EmployeesContext.Provider>
    );
}

export const useEmployees = createHook(EmployeesContext);
