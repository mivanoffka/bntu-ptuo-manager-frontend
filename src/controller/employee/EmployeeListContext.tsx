import { createContext, useState } from "react";
import { Employee } from "../../model";
import { createHook } from "@/controller/utils";

export interface IEmployeeList {
    list: Employee[];
    push: (employee: Employee) => void;
    remove: (ids: number[]) => void;
}

export const EmployeeList = createContext<IEmployeeList>({
    list: [],
    push: () => {},
    remove: () => {},
});

export function EmployeeListProvider() {
    const [list, setList] = useState<Employee[]>([]);

    async function push(employee: Employee) {}

    async function remove(ids: number[]) {}

    const context: IEmployeeList = {
        list,
        push,
        remove,
    };

    return <EmployeeList.Provider value={context}></EmployeeList.Provider>;
}

export const useEmployeeList = createHook(EmployeeList);
