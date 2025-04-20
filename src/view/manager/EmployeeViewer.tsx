import { Flex, Typography } from "antd";
import { Employee } from "@/view/employee/Employee";
import { EmployeeFooterToolbar } from "@/view/manager/toolbar/EmployeeFooterToolbar";
import { EmployeeHeaderToolbar } from "@/view/manager/toolbar/EmployeeHeaderToolbar";
import { CreateToolBarButton } from "@/view/manager/toolbar/buttons";
import { Palette, FontSize } from "@/view/constants";
import { useEditMode, useEmployeeEditor } from "@/controller/employee";
import { useEmployees } from "@/controller/employee/EmployeesContext";
import { useEffect, useState } from "react";

export function EmployeesViewer() {
    const { displayedEmployeeVersion } = useEmployeeEditor();

    const emptyContent = (
        <Flex
            justify="center"
            align="center"
            gap="large"
            style={{ width: "100%", height: "25%" }}
        >
            <CreateToolBarButton />
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
