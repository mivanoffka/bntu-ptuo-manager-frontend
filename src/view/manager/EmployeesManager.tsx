import React from "react";
import { Button, Flex, Splitter } from "antd";

import "@/view/manager/style/employees-manager.css";
import { EmployeesList } from "@/view/manager/EmployeesList";
import { EmployeesViewer } from "@/view/manager/EmployeeViewer";
import { TopBar } from "@/view/top-bar";

export function EmployeesManager() {
    const [sizes, setSizes] = React.useState<(number | string)[]>([
        "30%",
        "70%",
    ]);

    return (
        <div className="employees-manager-splitter">
            <EmployeesList></EmployeesList>
            <EmployeesViewer></EmployeesViewer>
            {/* <Splitter onResize={setSizes}>
                <Splitter.Panel size={sizes[0]} resizable>
                    <div className="splitter-content-wrapper">
                        <div className="splitter-content">
                            <EmployeesList></EmployeesList>
                        </div>
                    </div>
                </Splitter.Panel>
                <Splitter.Panel size={sizes[1]}>
                    <div className="splitter-content-wrapper">
                        <div className="splitter-content">
                            <EmployeesViewer></EmployeesViewer>
                        </div>
                    </div>
                </Splitter.Panel>
            </Splitter> */}
        </div>
    );
}
