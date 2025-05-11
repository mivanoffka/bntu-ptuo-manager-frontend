import { useEmployees } from "@/controller/employee/EmployeesContext";
import { Flex } from "antd";
import { SelectableList } from "@/view/list/SelectableList";
import { ToolBarButton } from "@/view/manager/toolbar/buttons/ToolBarButton";
import { DownloadOutlined, PlusOutlined } from "@ant-design/icons";
import { Palette } from "@/view/constants";
import { EmployeesListItem } from "@/view/manager/EmployeesListItem";

export function EmployeesList() {
    const {
        employeesList,
        fetchNextEmployees,
        selectedId,
        selectId,
        downloadAllEmployeesExcel,
    } = useEmployees();

    const handleLoadMore = () => {
        fetchNextEmployees();
    };

    const footer = (
        <Flex justify="space-around" align="center" style={{ height: "25px" }}>
            <Flex justify="center" align="center" style={{ width: "33%" }}>
                <ToolBarButton
                    color={Palette.GREEN}
                    onClick={downloadAllEmployeesExcel}
                    title="Экспорт"
                    icon={<DownloadOutlined />}
                />
            </Flex>

            <div
                style={{
                    width: "1px",
                    height: "100%",
                    backgroundColor: Palette.LIGHT_GRAY,
                }}
            />

            <Flex justify="center" align="center" style={{ width: "67%" }}>
                <ToolBarButton
                    onClick={handleLoadMore}
                    title="Больше..."
                    icon={<PlusOutlined />}
                />
            </Flex>
        </Flex>
    );

    return (
        <Flex
            vertical
            style={{
                width: "100%",
                height: "100%",
                border: "1px solid #d9d9d9",
                borderRadius: "4px",
                overflow: "auto",
            }}
        >
            <SelectableList
                data={employeesList}
                selectedId={selectedId}
                onSelect={(id) => selectId(id)}
                footer={footer}
                RenderItem={EmployeesListItem}
                getId={(employee) => employee.id}
            />
        </Flex>
    );
}
