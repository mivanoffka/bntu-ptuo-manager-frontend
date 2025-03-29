import { useEmployeeEditor } from "@/controller/employee/EmployeeEditorContext";
import { useEditMode } from "@/controller/employee/EditModeContext";
import "@/view/manager/style/employee-toolbar.css";
import {
    EditOutlined,
    PlusOutlined,
    DeleteOutlined,
    CheckOutlined,
    CloseOutlined,
} from "@ant-design/icons";
import create from "@ant-design/icons/lib/components/IconFont";
import { Button } from "antd";

export function EmployeeToolbar() {
    const { editModeEnabled } = useEditMode();

    const { applyEdit, cancelEdit, startEdit, createNew } = useEmployeeEditor();

    const defaultMenu = (
        <div className="toolbar-menu">
            <Button type="link" style={{ width: "10px" }} onClick={createNew}>
                <PlusOutlined />
            </Button>

            <div>
                <Button
                    type="link"
                    style={{ width: "10px" }}
                    onClick={startEdit}
                >
                    <EditOutlined />
                </Button>
                <Button type="link" style={{ width: "10px" }}>
                    <DeleteOutlined />
                </Button>
            </div>
        </div>
    );

    const editMenu = (
        <div className="toolbar-menu">
            <div>
                <Button
                    type="link"
                    style={{ width: "10px" }}
                    onClick={applyEdit}
                >
                    <CheckOutlined />
                </Button>
                <Button
                    type="link"
                    style={{ width: "10px" }}
                    onClick={cancelEdit}
                >
                    <CloseOutlined />
                </Button>
            </div>
        </div>
    );

    return (
        <div className="employee-toolbar">
            {editModeEnabled ? editMenu : defaultMenu}
        </div>
    );
}
