import { useSelectedEmployees } from "@/controller/employee";
import { useEmployees } from "@/controller/employee/EmployeesContext";
import { EmployeesListItem } from "@/view/manager/EmployeeListItem";
import { ToolBarButton } from "@/view/manager/toolbar/buttons/ToolBarButton";
import { EllipsisOutlined, PlusOutlined } from "@ant-design/icons";
import { Flex, List } from "antd";
import { useEffect, useRef } from "react";
import "./list-item.css";

export function EmployeesList() {
    const { employeesList, fetchNextEmployees } = useEmployees();
    const { selectedIds, toggleSingularSelection, selectMany, selectOne } =
        useSelectedEmployees();

    const handleLoadMore = () => {
        fetchNextEmployees();
    };

    return (
        <Flex
            vertical
            style={{
                width: "100%",
                height: "100%",
                border: "1px solid #d9d9d9",
                borderRadius: "4px",
                overflow: "auto",
            }}
        >
            <List
                dataSource={employeesList}
                renderItem={(employee, index) => {
                    const isSelected = selectedIds.includes(employee.id);
                    const rowClass = `employee-row ${
                        index % 2 === 0 ? "even" : "odd"
                    } ${isSelected ? "selected" : ""}`;
                    return (
                        <List.Item
                            style={{ height: "30px" }}
                            className={rowClass}
                            onClick={() => selectOne(employee.id)}
                        >
                            <EmployeesListItem employee={employee} />
                        </List.Item>
                    );
                }}
                loadMore={
                    <Flex
                        justify="center"
                        align="center"
                        style={{
                            height: "30px",
                        }}
                    >
                        <ToolBarButton
                            onClick={handleLoadMore}
                            title="Больше"
                            icon={<PlusOutlined />}
                        />
                    </Flex>
                }
            />
        </Flex>
    );
}
