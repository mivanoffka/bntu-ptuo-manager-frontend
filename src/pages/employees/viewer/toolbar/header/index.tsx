import { useAuth } from "@/contexts/auth";
import { useEmployees } from "@/contexts/employees";
import { useEditMode } from "@/contexts/employees/edit-mode";
import { USER_GROUPS, UserRole } from "@/model";
import {
    ApplyIconButton,
    CancelIconButton,
    EditIconButton,
    CloseIconButton,
    ToLatestVersionIconButton,
} from "@/pages/employees/viewer/toolbar/buttons";
import { EditModeLabel } from "@/pages/employees/viewer/toolbar/header/edit-mode-label";
import { EmployeeVersionRelevanceLabel } from "@/pages/employees/viewer/toolbar/header/version-relevance-label";
import { EmployeeVersionSelect } from "@/pages/employees/viewer/toolbar/header/version-select";
import { Flex, FormInstance } from "antd";

export interface IEmployeeHeaderToolbarProps {
    form: FormInstance;
}

export function EmployeeHeaderToolbar(props: IEmployeeHeaderToolbarProps) {
    const { isLatest } = useEmployees();
    const { editModeEnabled } = useEditMode();
    const { form } = props;
    const { user } = useAuth();
    const userRole = user ? user.role : UserRole.UNAUTHORIZED;

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
                <Flex
                    style={{ width: "100%" }}
                    justify="space-between"
                    gap="small"
                >
                    <Flex
                        align="center"
                        justify="left"
                        style={{ width: "33%" }}
                    >
                        <EmployeeVersionSelect />
                    </Flex>
                    <Flex
                        align="center"
                        justify="center"
                        style={{ width: "34%" }}
                    >
                        {editModeEnabled ? (
                            <EditModeLabel />
                        ) : (
                            <EmployeeVersionRelevanceLabel />
                        )}
                    </Flex>
                    <Flex
                        align="center"
                        justify="right"
                        style={{ width: "33%" }}
                    >
                        <Flex
                            align="center"
                            justify="right"
                            style={{ width: "100%" }}
                        >
                            {editModeEnabled ? (
                                <Flex>
                                    <ApplyIconButton form={form} />
                                    <CancelIconButton />
                                </Flex>
                            ) : isLatest ? (
                                <Flex>
                                    {USER_GROUPS[UserRole.EDITOR].includes(
                                        userRole
                                    ) && <EditIconButton />}
                                    <CloseIconButton />
                                </Flex>
                            ) : (
                                <Flex>
                                    <ToLatestVersionIconButton />
                                    <CloseIconButton />
                                </Flex>
                            )}
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    );

    return toolBar;
}
