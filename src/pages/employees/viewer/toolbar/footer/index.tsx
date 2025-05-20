import { useAuth } from "@/contexts/auth";
import { useEmployees } from "@/contexts/employees";
import { useEditMode } from "@/contexts/employees/edit-mode";
import { USER_GROUPS, UserRole } from "@/model";
import {
    DeleteIconButton,
    RestoreVersionIconButton,
    DeleteVersionIconButton,
} from "@/pages/employees/viewer/toolbar/buttons";
import { Flex } from "antd";

export function EmployeeFooterToolbar() {
    const { isLatest } = useEmployees();
    const { editModeEnabled } = useEditMode();
    const { user } = useAuth();
    const userRole = user ? user.role : UserRole.UNAUTHORIZED;

    const toolBarLatest = editModeEnabled && (
        <Flex align="center" justify="center" gap="small">
            <Flex>
                <DeleteIconButton />
            </Flex>
        </Flex>
    );

    const toolBarNotLatest = USER_GROUPS[UserRole.MANAGER].includes(
        userRole
    ) ? (
        <Flex style={{ width: "100%" }} justify="space-between" gap="small">
            <Flex justify="left" align="center" style={{ width: "30%" }}>
                <RestoreVersionIconButton />
            </Flex>
            <Flex justify="right" align="center" style={{ width: "30%" }}>
                <DeleteVersionIconButton />
            </Flex>
        </Flex>
    ) : null;

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
