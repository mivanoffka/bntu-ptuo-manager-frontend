import { useEmployees } from "@/controller/employee";
import { useEditMode } from "@/controller/employee/EditModeContext";
import { getLatestTimestamp } from "@/controller/employee/utils";
import {
    ApplyToolBarButton,
    CancelToolBarButton,
    CloseToolBarButton,
    EditToolBarButton,
    ToLatestVersionToolBarButton,
} from "@/view/manager/toolbar/buttons";
import { EmployeeVersionRelevanceLabel } from "@/view/manager/toolbar/EmployeeVersionRelevanceLabel";
import { EmployeeVersionSelect } from "@/view/manager/toolbar/EmployeeVersionSelect";
import { Flex } from "antd";
import { useParams } from "react-router-dom";

export function EmployeeHeaderToolbar() {
    const { editModeEnabled } = useEditMode();
    const { timestamp: selectedTimestamp } = useParams();

    const { selectedEmployee } = useEmployees();

    const isLatest =
        !selectedTimestamp ||
        (selectedEmployee &&
            selectedTimestamp ===
                getLatestTimestamp(selectedEmployee.employeeVersionTimestamps));

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
                        style={{ width: "30%" }}
                    >
                        <EmployeeVersionSelect />
                    </Flex>
                    <Flex
                        align="center"
                        justify="center"
                        style={{ width: "40%" }}
                    >
                        <EmployeeVersionRelevanceLabel />
                    </Flex>
                    <Flex
                        align="center"
                        justify="right"
                        style={{ width: "30%" }}
                    >
                        <Flex
                            align="center"
                            justify="right"
                            style={{ width: "100%" }}
                        >
                            {editModeEnabled ? (
                                <Flex>
                                    <ApplyToolBarButton />
                                    <CancelToolBarButton />
                                </Flex>
                            ) : isLatest ? (
                                <Flex>
                                    <EditToolBarButton />
                                    <CloseToolBarButton />
                                </Flex>
                            ) : (
                                <Flex>
                                    <ToLatestVersionToolBarButton />
                                    <CloseToolBarButton />
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
