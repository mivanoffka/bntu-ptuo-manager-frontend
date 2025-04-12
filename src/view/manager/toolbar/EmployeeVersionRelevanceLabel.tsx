import {
    useEditMode,
    useOneSelectedEmployeeVersion,
} from "@/controller/employee";
import { Color, FontSize } from "@/view/constants";
import { SecondaryLabel } from "@/view/primitives";
import { Flex, Typography } from "antd";

export function EmployeeVersionRelevanceLabel() {
    const { isLatest } = useOneSelectedEmployeeVersion();
    const { editModeEnabled } = useEditMode();

    const label = editModeEnabled
        ? "РЕДАКТИРОВАНИE"
        : isLatest()
        ? "АКТУАЛЬНАЯ ВЕРСИЯ"
        : "НЕАКТУАЛЬНАЯ ВЕРСИЯ";

    const color = editModeEnabled
        ? Color.BLUE
        : isLatest()
        ? Color.GRAY
        : Color.RED;

    return (
        <Flex align="center" justify="center">
            <Typography.Text style={{ color, fontSize: FontSize.SMALL }}>
                {label}
            </Typography.Text>
        </Flex>
    );
}
