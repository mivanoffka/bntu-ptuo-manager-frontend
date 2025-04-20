import { useEditMode, useEmployees } from "@/controller/employee";
import { Palette, FontSize } from "@/view/constants";
import { Flex, Typography } from "antd";

export function EmployeeVersionRelevanceLabel() {
    const { isLatest } = useEmployees();
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
