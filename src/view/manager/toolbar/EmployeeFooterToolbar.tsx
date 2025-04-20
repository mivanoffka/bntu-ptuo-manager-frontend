import { useEditMode, useEmployees } from "@/controller/employee";
import { getLatestTimestamp } from "@/controller/employee/utils";
import {
    DeleteToolBarButton,
    DeleteVersionToolBarButton,
    RestoreVersionToolBarButton,
} from "@/view/manager/toolbar/buttons";
import { Flex } from "antd";

export function EmployeeFooterToolbar() {
    const { isLatest } = useEmployees();
    const { editModeEnabled } = useEditMode();

    const toolBarLatest = (
        <Flex align="center" justify="center" gap="small">
            <Flex>
                <DeleteToolBarButton />
            </Flex>
        </Flex>
    );

    const toolBarNotLatest = (
        <Flex style={{ width: "100%" }} justify="space-between" gap="small">
            <Flex justify="left" align="center" style={{ width: "30%" }}>
                <RestoreVersionToolBarButton />
            </Flex>
            <Flex justify="right" align="center" style={{ width: "30%" }}>
                <DeleteVersionToolBarButton />
            </Flex>
        </Flex>
    );

    const toolBar = (
        <Flex
            align="center"
            justify="center"
            style={{ width: "100%", height: "60px" }}
        >
            <Flex
                align="center"
                justify="center"
                gap="small"
                style={{ width: "90%", height: "60%" }}
            >
                {isLatest ? toolBarLatest : toolBarNotLatest}
            </Flex>
        </Flex>
    );

    return toolBar;
}
