import { useEmployees } from "@/controller/employee/EmployeesContext";
import { Flex } from "antd";
import { SelectableList } from "@/view/list/SelectableList";

export function EmployeesList() {
    const { employeesList, fetchNextEmployees, selectedId, selectId } =
        useEmployees();

    const handleLoadMore = () => {
        fetchNextEmployees();
    };

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
                onLoadMore={handleLoadMore}
                renderLabel={(employee) => {
                    const { firstName, lastName, middleName } =
                        employee.latestEmployeeVersion;
                    return `${lastName} ${firstName} ${middleName}`;
                }}
                getId={(employee) => employee.id}
            />
        </Flex>
    );
}
