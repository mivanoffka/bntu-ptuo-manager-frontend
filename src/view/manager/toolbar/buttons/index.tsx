import {
    useEditMode,
    useEmployeeEditor,
    useEmployees,
} from "@/controller/employee";
import { ToolBarButton } from "@/view/manager/toolbar/buttons/ToolBarButton";
import {
    EditOutlined,
    DeleteOutlined,
    HistoryOutlined,
    CheckOutlined,
    CloseOutlined,
    StopOutlined,
    ArrowUpOutlined,
    PlusOutlined,
    UserAddOutlined,
} from "@ant-design/icons";
import { Palette } from "@/view/constants";
import { getLatestTimestamp } from "@/controller/employee/utils";
import { DateTimeString } from "@/model";
import { useNavigate, useParams } from "react-router-dom";

export function CloseToolBarButton() {
    const navigate = useNavigate();

    return (
        <ToolBarButton
            color={Palette.BLUE}
            onClick={() => navigate("/employees")}
            title={"Закрыть"}
            icon={<CloseOutlined />}
        />
    );
}

export function EditToolBarButton() {
    const { startEdit } = useEmployeeEditor();

    return (
        <ToolBarButton
            color={Palette.BLUE}
            onClick={startEdit}
            title={"Редактировать"}
            icon={<EditOutlined />}
        />
    );
}

export function DeleteToolBarButton() {
    const { editModeEnabled } = useEditMode();

    return (
        <ToolBarButton
            color={Palette.RED}
            disabled={editModeEnabled}
            onClick={null}
            title={"Удалить запись"}
            icon={<DeleteOutlined />}
        />
    );
}

export function RestoreVersionToolBarButton() {
    const { restoreToSelectedVersion } = useEmployees();

    return (
        <ToolBarButton
            onClick={restoreToSelectedVersion}
            title={"Откатить к этой версии"}
            icon={<HistoryOutlined />}
        />
    );
}

export function DeleteVersionToolBarButton() {
    return (
        <ToolBarButton
            disabled
            color={Palette.RED}
            onClick={null}
            title={"Удалить версию из истории"}
            icon={<DeleteOutlined />}
        />
    );
}

export function ToLatestVersionToolBarButton() {
    const { selectedEmployee } = useEmployees();
    const { id, timestamp } = useParams();
    const selectedId = id ? parseInt(id) : null;
    const navigate = useNavigate();

    const latestTimestamp = selectedEmployee
        ? getLatestTimestamp(selectedEmployee?.employeeVersionTimestamps)
        : null;

    return (
        <ToolBarButton
            color={Palette.GREEN}
            onClick={() => {
                if (latestTimestamp != null)
                    navigate(`/employees/${selectedId}/${latestTimestamp}`);
            }}
            title={"К актуальной версии"}
            icon={<ArrowUpOutlined />}
        />
    );
}

export function ApplyToolBarButton() {
    const { applyEdit } = useEmployeeEditor();

    return (
        <ToolBarButton
            color={Palette.GREEN}
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
            color={Palette.RED}
            onClick={cancelEdit}
            title={"Отменить"}
            icon={<StopOutlined />}
        />
    );
}

export function CreateToolBarButton() {
    const { createNew } = useEmployeeEditor();

    return (
        <ToolBarButton
            color={Palette.BLUE}
            onClick={createNew}
            title={"Добавить сотрудника"}
            icon={<UserAddOutlined />}
        />
    );
}
