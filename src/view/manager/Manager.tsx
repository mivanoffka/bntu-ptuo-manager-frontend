import React from "react";

export interface IEmployeesManager {
    children?: React.ReactNode;
}

export function EmployeesManager({ children }: IEmployeesManager) {
    return <div>Всем привет!{children}</div>;
}
