import { useEmployees } from "@/controller/employee/EmployeesContext";
import { ToolBarButton } from "@/view/manager/toolbar/buttons/ToolBarButton";
import { EllipsisOutlined, PlusOutlined } from "@ant-design/icons";
import { Flex, List, Typography } from "antd";
import { useEffect, useRef } from "react";
import "./list-item.css";

export function EmployeesList() {
    const { employeesList, fetchNextEmployees, selectedId, selectId } =
        useEmployees();

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
                    const {
                        id: employeeId,
                        latestEmployeeVersion: {
                            firstName,
                            lastName,
                            middleName,
                        },
                    } = employee;
                    const label = `${lastName} ${firstName} ${middleName}`;

                    const isSelected = selectedId === employeeId;
                    const rowClass = `employee-row ${
                        index % 2 === 0 ? "even" : "odd"
                    } ${isSelected ? "selected" : ""}`;

                    return (
                        <List.Item
                            style={{ height: "25px" }}
                            className={rowClass}
                            onClick={() => {
                                selectId(employeeId);
                            }}
                        >
                            <Typography.Text style={{ fontSize: "13px" }}>
                                {label}
                            </Typography.Text>
                        </List.Item>
                    );
                }}
                loadMore={
                    <Flex
                        justify="center"
                        align="center"
                        style={{
                            height: "25px",
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
