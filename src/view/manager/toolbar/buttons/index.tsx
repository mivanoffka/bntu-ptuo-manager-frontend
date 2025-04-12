import {
    useEmployeeEditor,
    useOneSelectedEmployeeVersion,
} from "@/controller/employee";
import { ToolBarButton } from "@/view/manager/toolbar/buttons/ToolBarButton";
import {
    EditOutlined,
    DeleteOutlined,
    HistoryOutlined,
    CheckOutlined,
    CloseOutlined,
} from "@ant-design/icons";
import { Color } from "@/view/constants";

export function EditToolBarButton() {
    const { startEdit } = useEmployeeEditor();

    return (
        <ToolBarButton
            color={Color.BLUE}
            onClick={startEdit}
            title={"Редактировать"}
            icon={<EditOutlined />}
        />
    );
}

export function DeleteToolBarButton() {
    return (
        <ToolBarButton
            color={Color.RED}
            onClick={null}
            title={"Удалить"}
            icon={<DeleteOutlined />}
        />
    );
}

export function RestoreToolBarButton() {
    const { restoreToSelectedVersion } = useOneSelectedEmployeeVersion();

    return (
        <ToolBarButton
            onClick={restoreToSelectedVersion}
            title={"Откатить к этой версии"}
            icon={<HistoryOutlined />}
        />
    );
}

export function ApplyToolBarButton() {
    const { applyEdit } = useEmployeeEditor();

    return (
        <ToolBarButton
            color={Color.GREEN}
            onClick={applyEdit}
            title={"Применить"}
            icon={<CheckOutlined />}
        />
    );
}

export function CancelToolBarButton() {
    const { cancelEdit } = useEmployeeEditor();

    return (
        <ToolBarButton
            color={Color.RED}
            onClick={cancelEdit}
            title={"Отменить"}
            icon={<CloseOutlined />}
        />
    );
}
