import { Palette, FontSize } from "@/constants";
import { useEmployees } from "@/contexts/employees";
import { useEditMode } from "@/contexts/employees/edit-mode";
import { Flex, Typography } from "antd";

export function EditModeLabel() {
    const { editModeEnabled } = useEditMode();
    const { selectedEmployee } = useEmployees();

    const label = editModeEnabled
        ? !selectedEmployee
            ? "НОВАЯ УЧЁТНАЯ КАРТОЧКА"
            : "РЕДАКТИРОВАНИЕ"
        : "ОШИБКА";

    const color = editModeEnabled
        ? !selectedEmployee
            ? Palette.GREEN
            : Palette.BLUE
        : Palette.RED;

    return (
        <Flex align="center" justify="center">
            <Typography.Text style={{ color, fontSize: FontSize.SMALL }}>
                {label}
            </Typography.Text>
        </Flex>
    );
}
