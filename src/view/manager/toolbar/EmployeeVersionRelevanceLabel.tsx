import { useEditMode, useEmployees } from "@/controller/employee";
import { getLatestTimestamp } from "@/controller/employee/utils";
import { Palette, FontSize } from "@/view/constants";
import { SecondaryLabel } from "@/view/primitives";
import { Flex, Typography } from "antd";

export function EmployeeVersionRelevanceLabel() {
    const { selectedEmployee, selectedTimestamp } = useEmployees();

    const isLatest =
        selectedEmployee &&
        selectedTimestamp ===
            getLatestTimestamp(selectedEmployee.employeeVersionTimestamps);

    const { editModeEnabled } = useEditMode();

    const label = editModeEnabled
        ? "РЕДАКТИРОВАНИE"
        : isLatest
        ? "АКТУАЛЬНАЯ ВЕРСИЯ"
        : "НЕАКТУАЛЬНАЯ ВЕРСИЯ";

    const color = editModeEnabled
        ? Palette.BLUE
        : isLatest
        ? Palette.GRAY
        : Palette.RED;

    return (
        <Flex align="center" justify="center">
            <Typography.Text style={{ color, fontSize: FontSize.SMALL }}>
                {label}
            </Typography.Text>
        </Flex>
    );
}
