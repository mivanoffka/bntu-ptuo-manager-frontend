import { useEditMode, useEmployees } from "@/controller/employee";
import { getLatestTimestamp } from "@/controller/employee/utils";
import { Palette, FontSize } from "@/view/constants";
import { SecondaryLabel } from "@/view/primitives";
import { Flex, Typography } from "antd";
import { useParams } from "react-router-dom";

export function EmployeeVersionRelevanceLabel() {
    const { selectedEmployee } = useEmployees();
    const { id, timestamp: selectedTimestamp } = useParams();

    const isLatest =
        selectedEmployee &&
        selectedTimestamp ===
            getLatestTimestamp(selectedEmployee.employeeVersionTimestamps);

    const { editModeEnabled } = useEditMode();

    const label = selectedTimestamp
        ? editModeEnabled
            ? "РЕДАКТИРОВАНИE"
            : isLatest
            ? "АКТУАЛЬНАЯ ВЕРСИЯ"
            : "НЕАКТУАЛЬНАЯ ВЕРСИЯ"
        : "АКТУАЛЬНАЯ ВЕРСИЯ";

    const color = selectedTimestamp
        ? editModeEnabled
            ? Palette.BLUE
            : isLatest
            ? Palette.GRAY
            : Palette.RED
        : Palette.GRAY;

    return (
        <Flex align="center" justify="center">
            <Typography.Text style={{ color, fontSize: FontSize.SMALL }}>
                {label}
            </Typography.Text>
        </Flex>
    );
}
