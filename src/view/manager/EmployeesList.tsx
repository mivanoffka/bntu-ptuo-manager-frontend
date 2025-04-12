import { useEmployees } from "@/controller/employee/EmployeesContext";
import { HistoryUtility, IEmployee, IEmployeeVersion, IName } from "@/model";
import { Table, Button, Pagination, Card } from "antd";

import "@/view/manager/style/employees-list.css";
import dayjs from "dayjs";
import { useSelectedEmployees } from "@/controller/employee/SelectedEmployeesContext";
import { useEffect } from "react";

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

    const columns = [
        {
            title: "Имя",
            key: "name",
            render: (employee: IEmployee) => {
                const { latestEmployeeVersion } = employee;

                if (!latestEmployeeVersion) {
                    return;
                }
                const { names } = latestEmployeeVersion;
                if (names) {
                    const relevantName =
                        HistoryUtility.fromCollection(names).relevant;

                    if (!relevantName) {
                        return "Без имени";
                    }

                    const { firstName, lastName, middleName } = relevantName;

                    return `${lastName} ${firstName} ${middleName}`;
                }
            },
            width: "200px",
        },
        {
            title: "Дата рождения",
            key: "birthdate",
            render: (employee: IEmployee) => {
                const { latestEmployeeVersion } = employee;

                if (!latestEmployeeVersion) {
                    return;
                }

                const { birthdate } = latestEmployeeVersion;

                if (birthdate) {
                    return dayjs(birthdate).format("DD.MM.YYYY");
                }
            },
            width: "150px",
        },
        {
            title: "Место рождения",
            key: "birthplace",
            render: (employee: IEmployee) => {
                const { latestEmployeeVersion } = employee;

                if (!latestEmployeeVersion) {
                    return;
                }

                const { birthplace } = latestEmployeeVersion;

                if (birthplace) {
                    return birthplace;
                }
            },
            width: "150px",
        },
    ];

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
        // <div className="card">
        <div className="employees-list">
            <Table
                rowKey="id"
                rowSelection={rowSelection}
                size="small"
                columns={columns}
                dataSource={list}
                pagination={false}
                onRow={(employee) => ({
                    onClick: (e) => {
                        if (!employee.id) return;

                        if (
                            e.shiftKey ||
                            e.ctrlKey ||
                            e.metaKey ||
                            selectedIds.length >= 2
                        ) {
                            toggleMultipleSelection(employee.id);
                        } else {
                            toggleSingularSelection(employee.id);
                        }
                    },
                })}
            />
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
