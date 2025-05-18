import { IconButton } from "@/components/buttons";
import { Palette } from "@/constants";
import { useEmployees } from "@/contexts/employees";
import { useEmployeeEditor } from "@/contexts/employees/editor";
import {
    CloseOutlined,
    EditOutlined,
    DeleteOutlined,
    HistoryOutlined,
    ArrowUpOutlined,
    CheckOutlined,
    StopOutlined,
    UserAddOutlined,
} from "@ant-design/icons";
import { FormInstance } from "antd";

export function CloseIconButton() {
    const { selectId } = useEmployees();

    return (
        <IconButton
            color={Palette.BLUE}
            onClick={() => selectId(null)}
            title={"Закрыть"}
            icon={<CloseOutlined />}
        />
    );
}

export function EditIconButton() {
    const { startEdit } = useEmployeeEditor();

    return (
        <IconButton
            color={Palette.BLUE}
            onClick={startEdit}
            title={"Редактировать"}
            icon={<EditOutlined />}
        />
    );
}

export function DeleteIconButton() {
    const { deleteSelectedEmployee } = useEmployees();

    return (
        <IconButton
            color={Palette.RED}
            onClick={deleteSelectedEmployee}
            title={"Удалить запись"}
            icon={<DeleteOutlined />}
        />
    );
}

export function RestoreVersionIconButton() {
    const { restoreToSelectedVersion } = useEmployees();

    return (
        <IconButton
            onClick={restoreToSelectedVersion}
            title={"Откатить к этой версии"}
            icon={<HistoryOutlined />}
        />
    );
}

export function DeleteVersionIconButton() {
    const { deleteSelectedVersion } = useEmployees();

    return (
        <IconButton
            color={Palette.RED}
            onClick={deleteSelectedVersion}
            title={"Удалить версию из истории"}
            icon={<DeleteOutlined />}
        />
    );
}

export function ToLatestVersionIconButton() {
    const { selectedEmployee, selectTimestamp, latestTimestamp } =
        useEmployees();

    return (
        <IconButton
            color={Palette.GREEN}
            onClick={() => selectTimestamp(latestTimestamp)}
            title={"К актуальной версии"}
            icon={<ArrowUpOutlined />}
        />
    );
}

export interface IApplyIconButtonProps {
    form: FormInstance;
}

export function ApplyIconButton(props: IApplyIconButtonProps) {
    const { applyEdit } = useEmployeeEditor();
    const { form } = props;

    return (
        <IconButton
            color={Palette.GREEN}
            onClick={() => applyEdit(form)}
            title={"Применить"}
            icon={<CheckOutlined />}
        />
    );
}

export function CancelIconButton() {
    const { cancelEdit } = useEmployeeEditor();

    return (
        <IconButton
            color={Palette.RED}
            onClick={cancelEdit}
            title={"Отменить"}
            icon={<StopOutlined />}
        />
    );
}

export function CreateIconButton() {
    const { createNew } = useEmployeeEditor();

    return (
        <IconButton
            color={Palette.BLUE}
            onClick={createNew}
            title={"Добавить учётную карточку"}
            icon={<UserAddOutlined />}
        />
    );
}
