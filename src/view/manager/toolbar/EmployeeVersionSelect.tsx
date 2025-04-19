import { useEditMode, useEmployees } from "@/controller/employee";
import { SecondaryLabel } from "@/view/primitives";
import { Flex, Select, Typography } from "antd";
import dayjs from "dayjs";

export function EmployeeVersionSelect() {
    const { selectedEmployee, setSelectedTimestamp, selectedTimestamp } =
        useEmployees();

    const { editModeEnabled } = useEditMode();

    const options = selectedEmployee?.employeeVersionTimestamps
        .map((timestamp) => ({
            value: timestamp,
            label: dayjs(timestamp).format("DD.MM.YYYY, HH:mm"),
            date: dayjs(timestamp).toDate(),
        }))
        .sort((a, b) => b.date.getTime() - a.date.getTime())
        .map(({ value, label }) => ({ value, label }));

    return (
        <Flex
            align="center"
            justify="center"
            gap="small"
            style={{ width: "100%" }}
        >
            <Flex style={{ width: "55px" }}>
                <SecondaryLabel>Версия</SecondaryLabel>
            </Flex>
            <Select
                disabled={editModeEnabled}
                style={{ textAlign: "left", width: "80%" }}
                value={selectedTimestamp}
                onChange={setSelectedTimestamp}
                options={options}
            ></Select>
        </Flex>
    );
}
