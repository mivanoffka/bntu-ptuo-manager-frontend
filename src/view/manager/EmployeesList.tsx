import { useEmployees } from "@/controller/employee/EmployeesContext";
import { ToolBarButton } from "@/view/manager/toolbar/buttons/ToolBarButton";
import { EllipsisOutlined, PlusOutlined } from "@ant-design/icons";
import { Flex, List } from "antd";
import { useEffect, useRef } from "react";
import "./list-item.css";
import { useNavigate, useParams } from "react-router-dom";

export function EmployeesList() {
    const { id } = useParams();
    const selectedId = id ? parseInt(id) : null;

    const navigate = useNavigate();

    const { employeesList, fetchNextEmployees } = useEmployees();

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
                    const isSelected = selectedId === employee.id;
                    const rowClass = `employee-row ${
                        index % 2 === 0 ? "even" : "odd"
                    } ${isSelected ? "selected" : ""}`;

                    const { latestEmployeeVersion: employeeVersion } = employee;
                    const { firstName, lastName, middleName } = employeeVersion;
                    const label = `${lastName} ${firstName} ${middleName}`;
                    return (
                        <List.Item
                            style={{ height: "30px" }}
                            className={rowClass}
                            onClick={() => {
                                navigate(`/employees/${employee.id}`);
                            }}
                        >
                            {label}
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
