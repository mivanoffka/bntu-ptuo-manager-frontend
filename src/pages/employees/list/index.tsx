import { IconButton } from "@/components/buttons";
import { SelectableList } from "@/components/selectable-list";
import { Palette } from "@/constants";
import { useEmployees } from "@/contexts/employees";
import { useEditMode } from "@/contexts/employees/edit-mode";
import { EmployeesListItem } from "@/pages/employees/list/list-item";
import {
    DownloadOutlined,
    PlusOutlined,
    ReloadOutlined,
} from "@ant-design/icons";
import { Flex } from "antd";

export function EmployeesList() {
    const {
        employeesList,
        fetchNextEmployees,
        fetchAllEmployees,
        selectedId,
        selectId,
        downloadAllEmployeesExcel,
        employeesPagination,
    } = useEmployees();

    const { next = false } = employeesPagination;

    const footer = (
        <Flex
            justify="space-around"
            align="center"
            style={{ height: "25px", width: "100%" }}
        >
            <Flex justify="center" align="center" style={{ width: "33%" }}>
                <IconButton
                    disabled={employeesList.length === 0}
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
                    backgroundColor: "#d9d9d9",
                }}
            />
            {next ? (
                <Flex justify="center" align="center" style={{ width: "67%" }}>
                    <IconButton
                        onClick={fetchNextEmployees}
                        title="Больше"
                        icon={<PlusOutlined />}
                    />
                </Flex>
            ) : (
                <Flex justify="center" align="center" style={{ width: "67%" }}>
                    <IconButton
                        onClick={fetchAllEmployees}
                        title="Обновить"
                        icon={<ReloadOutlined />}
                    />
                </Flex>
            )}
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
