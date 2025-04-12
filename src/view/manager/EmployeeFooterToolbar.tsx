import {
    useEmployeeVersions,
    useOneSelectedEmployeeVersion,
} from "@/controller/employee";
import { useEditMode } from "@/controller/employee/EditModeContext";
import { Flex, Select, Typography } from "antd";
import dayjs from "dayjs";

export function EmployeeFooterToolbar() {
    return (
        <Flex
            align="center"
            justify="center"
            style={{ width: "100%", height: "40px" }}
        >
            <Flex style={{ width: "80%", height: "80%" }}></Flex>
        </Flex>
    );
}
