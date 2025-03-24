import { createContext, ReactNode, useEffect, useState } from "react";
import { Employee, IPagination } from "@/model";
import { createHook } from "@/controller/utils";
import { useApi } from "@/controller/api";

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

export function EmployeesProvider({ children }: { children: ReactNode }) {
    const [serverList, setServerList] = useState<Employee[]>([]);
    const [list, setList] = useState<Employee[]>([]);
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
            .get("employees/spreadsheet")
            .then((response) => {
                const employees = response.data.employees;
                setList(employees);
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
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

    return <Employees.Provider value={context}>{children}</Employees.Provider>;
}

export const useEmployees = createHook(Employees);
