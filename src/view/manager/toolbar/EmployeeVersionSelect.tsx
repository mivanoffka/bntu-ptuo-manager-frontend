import { useEditMode, useEmployees } from "@/controller/employee";
import { DateTimeString } from "@/model";
import { SecondaryLabel } from "@/view/primitives";
import { Flex, Select } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

export interface IEmployeeVersionSelectProps {}

export function EmployeeVersionSelect() {
    const {
        selectedEmployee,
        selectedId,
        selectedTimestamp,
        selectTimestamp,
        selectedEmployeeVersion,
    } = useEmployees();

    const { editModeEnabled } = useEditMode();
    const [displayedTimestamp, setDisplayedTimestamp] =
        useState<DateTimeString | null>(
            dayjs().toISOString() as DateTimeString
        );

    useEffect(() => {
        if (selectedEmployeeVersion) {
            setDisplayedTimestamp(selectedTimestamp);
        }
    }, [selectedEmployeeVersion]);

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
            <Flex style={{ width: "65px" }}>
                <SecondaryLabel>Версия</SecondaryLabel>
            </Flex>
            <Flex style={{ width: "80%" }}>
                <Select
                    disabled={editModeEnabled}
                    style={{ textAlign: "left", width: "100%" }}
                    value={displayedTimestamp}
                    onChange={selectTimestamp}
                    options={options}
                ></Select>
            </Flex>
        </Flex>
    );
}
