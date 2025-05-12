import { IconButton } from "@/components/buttons";
import { SelectableList } from "@/components/selectable-list";
import { Palette } from "@/constants";
import { useEmployees } from "@/contexts/employees";
import { EmployeesListItem } from "@/pages/employees/list/list-item";
import { DownloadOutlined, PlusOutlined } from "@ant-design/icons";
import { Flex } from "antd";

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
                <IconButton
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
                <IconButton
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
                height={"25px"}
            />
        </Flex>
    );
}
