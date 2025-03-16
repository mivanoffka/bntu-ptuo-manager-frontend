import React from "react";
import { Splitter } from "antd";

import "@/view/manager/style/employees-manager.css";

export function EmployeesManager() {
    const [sizes, setSizes] = React.useState<(number | string)[]>([
        "60%",
        "40%",
    ]);

    return (
        <div className="employees-manager-splitter">
            <Splitter onResize={setSizes}>
                <Splitter.Panel size={sizes[0]} resizable>
                    1
                </Splitter.Panel>
                <Splitter.Panel size={sizes[1]}>2</Splitter.Panel>
            </Splitter>
        </div>
    );
}
