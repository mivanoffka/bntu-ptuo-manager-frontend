import { useEmployees } from "@/controller/employee/EmployeesContext";
import { HistoryUtility, IEmployee, IEmployeeVersion, IName } from "@/model";
import { Table, Button, Pagination, Card, List, Flex } from "antd";

import dayjs from "dayjs";
import { useSelectedEmployees } from "@/controller/employee/SelectedEmployeesContext";
import { useCallback, useEffect, useRef } from "react";
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

    const scrollContainerRef = useRef(null);

    const handleScroll = useCallback(() => {
        const { current } = scrollContainerRef;
        if (current) {
            const { scrollTop, scrollHeight, clientHeight } = current;
            if (scrollHeight - (scrollTop + clientHeight) < 50) {
                next();
            }
        }
    }, []);

    return (
        <Flex
            style={{
                width: "100%",
                height: "100%",
                overflow: "auto",
                backgroundColor: "#f0f0f0",
            }}
        >
            <List
                dataSource={list}
                renderItem={(employee) => (
                    <List.Item
                        style={{ width: "100%" }}
                        onClick={() => toggleSingularSelection(employee.id)}
                    >
                        <EmployeesListItem employee={employee} />
                    </List.Item>
                )}
            ></List>
        </Flex>
    );
}
