import { useEmployees } from "@/controller/employee/EmployeesContext";
import { Employee, Name } from "@/model";
import { Table, Button, Pagination, Card } from "antd";

import "@/view/manager/style/employees-list.css";
import dayjs from "dayjs";
import { useEmployeesSelection } from "@/controller/employee/EmployeesSelectionContext";

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
    } = useEmployeesSelection();

    const columns = [
        // {
        //     title: "",
        //     key: "",
        //     width: "15px",
        // },
        {
            title: "Имя",
            key: "name",
            render: (item: Employee) => {
                if (item.names.relevant) {
                    const { firstName, lastName, middleName } =
                        item.names.relevant;

                    return `${lastName} ${firstName} ${middleName}`;
                }
            },
            width: "200px",
        },
        {
            title: "Дата рождения",
            key: "birthdate",
            render: (item: Employee) => {
                if (item.birthdate) {
                    return dayjs(item.birthdate).format("DD.MM.YYYY");
                }
            },
            width: "150px",
        },
        {
            title: "Место рождения",
            key: "birthplace",
            render: (item: Employee) => {
                if (item.birthplace) {
                    return item.birthplace;
                }
            },
            width: "150px",
        },
        {
            title: "Полнота",
            key: "fullfilled",
            render: () => {
                return "+";
            },
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
                pagination={{ position: ["none", "none"] }}
                onRow={(employee) => ({
                    onClick: (e) => {
                        if (employee.id) {
                            if (
                                selectedIds.length > 1 ||
                                e.shiftKey ||
                                e.button === 1
                            ) {
                                toggleMultipleSelection(employee.id);
                            }
                            {
                                toggleSingularSelection(employee.id);
                            }
                        }
                    },
                })}
            />
            <div className="pagination-row">
                <Pagination size="small" total={list.length} />
            </div>
        </div>
        // </div>
    );
}
