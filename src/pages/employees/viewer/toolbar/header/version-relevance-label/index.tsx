import { Palette, FontSize } from "@/constants";
import { useEmployees } from "@/contexts/employees";
import { useEditMode } from "@/contexts/employees/edit-mode";
import { Flex, Typography } from "antd";

export function EmployeeVersionRelevanceLabel() {
    const { isLatest } = useEmployees();

    const label = isLatest ? "АКТУАЛЬНАЯ ВЕРСИЯ" : "НЕАКТУАЛЬНАЯ ВЕРСИЯ";

    const color = isLatest ? Palette.GRAY : Palette.RED;

    return (
        <Flex align="center" justify="center">
            <Typography.Text style={{ color, fontSize: FontSize.SMALL }}>
                {label}
            </Typography.Text>
        </Flex>
    );
}
