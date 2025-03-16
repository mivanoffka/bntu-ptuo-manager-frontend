import { createContext, useState } from "react";
import { Employee, IPagination } from "@/model";
import { createHook } from "@/controller/utils";

export interface IEmployees {
    list: Employee[];
    pagination: IPagination;
    setPage: (page: number) => void;
    push: (employee: Employee) => void;
    remove: (ids: number[]) => void;
}

export const Employees = createContext<IEmployees>({
    list: [],
    pagination: { current: 0, total: 0, size: 10 },
    setPage: () => {},
    push: () => {},
    remove: () => {},
});

export function EmployeesProvider() {
    const [list, setList] = useState<Employee[]>([]);
    const [pagination, setPagination] = useState<IPagination>({
        current: 0,
        total: 0,
        size: 10,
    });

    async function setPage(page: number) {
        setPagination({ ...pagination, current: page });
    }

    async function push(employee: Employee) {}

    async function remove(ids: number[]) {}

    const context: IEmployees = {
        list,
        pagination,
        setPage,
        push,
        remove,
    };

    return <Employees.Provider value={context}></Employees.Provider>;
}

export const useEmployeeList = createHook(Employees);
