import { useEditMode, useEmployees } from "@/controller/employee";
import { SecondaryLabel } from "@/view/primitives";
import { Flex, Select, Typography } from "antd";
import { time } from "console";
import dayjs from "dayjs";
import { useNavigate, useParams } from "react-router-dom";

export function EmployeeVersionSelect() {
    const { selectedEmployee } = useEmployees();
    const { id, timestamp } = useParams();
    const selectedId = id ? parseInt(id) : null;
    const navigate = useNavigate();

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
            <Flex style={{ width: "80%" }}>
                <Select
                    disabled={editModeEnabled}
                    style={{ textAlign: "left", width: "100%" }}
                    value={timestamp}
                    onChange={(value) =>
                        navigate(`/employees/${selectedId}/${value}`)
                    }
                    options={options}
                ></Select>
            </Flex>
        </Flex>
    );
}
