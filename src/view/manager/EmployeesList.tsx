import { useEmployees } from "@/controller/employee/EmployeesContext";
import { HistoryUtility, IEmployee, IEmployeeVersion, IName } from "@/model";
import { Table, Button, Pagination, Card, List } from "antd";

import "@/view/manager/style/employees-list.css";
import dayjs from "dayjs";
import { useSelectedEmployees } from "@/controller/employee/SelectedEmployeesContext";
import { useEffect } from "react";
import { EmployeesListItem } from "@/view/manager/EmployeeListItem";

export function EmployeesList() {
    const { list, hasMore, next } = useEmployees();
    const {
        selectedIds,
        selectOne,
        toggleSingularSelection,
        toggleMultipleSelection,
        addToSelection,
        removeFromSelection,
        selectMany,
    } = useSelectedEmployees();

    const rowSelection = {
        selectedRowKeys: selectedIds,
        onChange: (newSelectedRowKeys: number[]) => {
            if (!list || !newSelectedRowKeys) {
                return;
            }
            selectMany(newSelectedRowKeys);
        },
        // renderCell: () => null,
    };

    return (
        <div className="employees-list">
            <List
                dataSource={list}
                renderItem={(employee) => (
                    <List.Item
                        onClick={() => toggleSingularSelection(employee.id)}
                    >
                        <EmployeesListItem employee={employee} />
                    </List.Item>
                )}
            ></List>
            <div className="pagination-row">
                {hasMore() && (
                    <div className="pagination-row">
                        <Button onClick={next}>Загрузить еще</Button>
                    </div>
                )}
            </div>
        </div>
    );
}
