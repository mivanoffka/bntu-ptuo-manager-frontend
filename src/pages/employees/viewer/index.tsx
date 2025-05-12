import { useEmployeeEditor } from "@/contexts/employees/editor";
import { Employee } from "@/pages/employees/viewer/employee";
import { CreateIconButton } from "@/pages/employees/viewer/toolbar/buttons";
import { EmployeeFooterToolbar } from "@/pages/employees/viewer/toolbar/footer";
import { EmployeeHeaderToolbar } from "@/pages/employees/viewer/toolbar/header";
import { Flex } from "antd";

export function EmployeesViewer() {
    const { displayedEmployeeVersion } = useEmployeeEditor();

    const emptyContent = (
        <Flex
            justify="center"
            align="center"
            gap="large"
            style={{ width: "100%", height: "25%" }}
        >
            <CreateIconButton />
        </Flex>
    );

    const content = (
        <Flex
            justify="space-between"
            align="center"
            vertical
            style={{ width: "100%", height: "100%" }}
        >
            <EmployeeHeaderToolbar></EmployeeHeaderToolbar>
            {displayedEmployeeVersion && <Employee></Employee>}
            <EmployeeFooterToolbar></EmployeeFooterToolbar>
        </Flex>
    );

    return (
        <Flex
            align="center"
            justify="center"
            style={{ width: "100%", height: "100%" }}
        >
            {displayedEmployeeVersion ? content : emptyContent}
        </Flex>
    );
}
