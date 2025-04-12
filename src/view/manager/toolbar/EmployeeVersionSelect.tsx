import {
    useEditMode,
    useEmployeeVersions,
    useOneSelectedEmployeeVersion,
} from "@/controller/employee";
import { SecondaryLabel } from "@/view/primitives";
import { Flex, Select, Typography } from "antd";
import dayjs from "dayjs";

export function EmployeeVersionSelect() {
    const {
        employeeVersionTimestamps,
        selectedVersionTimestamp,
        selectVersion,
    } = useEmployeeVersions();

    const { editModeEnabled } = useEditMode();

    const options = employeeVersionTimestamps
        .map((timestamp) => ({
            value: timestamp,
            label: dayjs(timestamp).format("DD.MM.YYYY, HH:mm"),
            date: dayjs(timestamp).toDate(), // преобразуем в Date для сортировки
        }))
        .sort((a, b) => b.date.getTime() - a.date.getTime()) // сортировка по убыванию даты
        .map(({ value, label }) => ({ value, label })); // убираем временное поле

    return (
        <Flex
            align="center"
            justify="center"
            gap="small"
            style={{ width: "100%" }}
        >
            <Flex style={{ width: "45px" }}>
                <SecondaryLabel>Версия</SecondaryLabel>
            </Flex>
            <Select
                disabled={editModeEnabled}
                style={{ textAlign: "left", width: "80%" }}
                value={selectedVersionTimestamp}
                onChange={selectVersion}
                options={options}
            ></Select>
        </Flex>
    );
}
