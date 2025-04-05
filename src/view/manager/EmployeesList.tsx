import { useEmployees } from "@/controller/employee/EmployeesContext";
import { IEmployeeVersion, IName } from "@/model";
import { Table, Button, Pagination, Card } from "antd";

import "@/view/manager/style/employees-list.css";
import dayjs from "dayjs";
import { useSelectedEmployees } from "@/controller/employee/SelectedEmployeesContext";
import { useEffect } from "react";

export function EmployeesList() {
    const { list } = useEmployees();
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
        // {
        //     title: "",
        //     key: "",
        //     width: "15px",
        // },
        {
            title: "Имя",
            key: "name",
            render: (item: IEmployeeVersion) => {
                if (!item) {
                    return;
                }
                const { names } = item;
                if (names) {
                    const { firstName, lastName, middleName } = names[0];

                    return `${lastName} ${firstName} ${middleName}`;
                }
            },
            width: "200px",
        },
        // {
        //     title: "Дата рождения",
        //     key: "birthdate",
        //     render: (item: IEmployeeVersion) => {
        //         if (item.birthdate) {
        //             return dayjs(item.birthdate).format("DD.MM.YYYY");
        //         }
        //     },
        //     width: "150px",
        // },
        // {
        //     title: "Место рождения",
        //     key: "birthplace",
        //     render: (item: IEmployeeVersion) => {
        //         if (item.birthplace) {
        //             return item.birthplace;
        //         }
        //     },
        // width: "150px",
        // },
        // {
        // title: "Полнота",
        // key: "fullfilled",
        // render: () => {
        //     return "+";
        // },
        // },
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
                dataSource={list?.map((item) => item.latestEmployeeVersion)}
                pagination={{ position: ["none", "none"] }}
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
                <Pagination size="small" total={list?.length} />
            </div>
        </div>
        // </div>
    );
}
