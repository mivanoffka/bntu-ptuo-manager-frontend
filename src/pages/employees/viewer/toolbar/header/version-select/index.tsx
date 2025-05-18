import { SelectField } from "@/components/fields/select";
import { SecondaryLabel } from "@/components/labels";
import { useEmployees } from "@/contexts/employees";
import { useEditMode } from "@/contexts/employees/edit-mode";
import { DateTimeString } from "@/model";
import { Flex, Select } from "antd";
import dayjs from "dayjs";
import { useState, useEffect } from "react";

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
            label: dayjs(timestamp).format("D MMMM YYYY г. – HH:mm"),
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
                <SelectField
                    isEditable={!editModeEnabled}
                    style={{ textAlign: "left", width: "100%" }}
                    value={displayedTimestamp}
                    onChange={selectTimestamp}
                    options={options}
                ></SelectField>
            </Flex>
        </Flex>
    );
}
