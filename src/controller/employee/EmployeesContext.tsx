import { createContext, ReactNode, useEffect, useState } from "react";
import { IEmployee, IEmployeeVersion, IPagination } from "@/model";
import { createHook } from "@/controller/utils";
import { useApi } from "@/controller/api";

export interface IEmployeesContext {
    list: IEmployee[];
    pagination: IPagination;
    setPage: (page: number) => void;
    push: (employee: IEmployeeVersion) => void;
    remove: (ids: number[]) => void;
}

export const EmployeesContext = createContext<IEmployeesContext>({
    list: [],
    pagination: { current: 0, total: 0, size: 10 },
    setPage: () => {},
    push: () => {},
    remove: () => {},
});

export function EmployeesProvider({ children }: { children: ReactNode }) {
    const [list, setList] = useState<IEmployee[]>([]);
    const [pagination, setPagination] = useState<IPagination>({
        current: 0,
        total: 0,
        size: 10,
    });

    useEffect(() => {
        fetchEmployees();
    }, []);

    const { axiosInstance } = useApi();

    async function setPage(page: number) {
        setPagination({ ...pagination, current: page });
    }

    async function fetchEmployees() {
        await axiosInstance
            .get("employees")
            .then((response) => {
                const employees = response.data;
                setList(employees);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    async function push(employeeVersion: IEmployeeVersion) {}

    async function remove(ids: number[]) {}

    const context: IEmployeesContext = {
        list,
        pagination,
        setPage,
        push,
        remove,
    };

    return (
        <EmployeesContext.Provider value={context}>
            {children}
        </EmployeesContext.Provider>
    );
}

export const useEmployees = createHook(EmployeesContext);
