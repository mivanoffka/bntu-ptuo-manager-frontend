import "@/view/manager/style/employee-toolbar.css";
import { EditOutlined, PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { Button } from "antd";

export function EmployeeToolbar() {
    return (
        <div className="employee-toolbar">
            <div className="toolbar-menu">
                <Button type="link" style={{ width: "10px" }}>
                    <PlusOutlined />
                </Button>

                <div>
                    <Button type="link" style={{ width: "10px" }}>
                        <EditOutlined />
                    </Button>
                    <Button type="link" style={{ width: "10px" }}>
                        <DeleteOutlined />
                    </Button>
                </div>
            </div>
        </div>
    );
}
