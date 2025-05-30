import { EmployeesProvider } from "@/contexts/employees";
import { useEditMode } from "@/contexts/employees/edit-mode";
import { EmployeeEditorProvider } from "@/contexts/employees/editor";
import { useEnumerations } from "@/contexts/enumerations";
import { useTrees } from "@/contexts/trees";
import { EmployeesSearch } from "@/pages/employees/search";
import { EmployeesViewer } from "@/pages/employees/viewer";
import { Layout, Flex } from "antd";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";

export function EmployeesPage() {
    const { editModeEnabled } = useEditMode();

    const { reloadTrees } = useTrees();
    const { reloadEnumerations } = useEnumerations();

    useEffect(() => {
        reloadTrees();
        reloadEnumerations();
    }, []);

    return (
        <EmployeesProvider>
            <EmployeeEditorProvider>
                <Flex
                    align="center"
                    justify="center"
                    style={{
                        width: "80%",
                        height: "100%",
                        backgroundColor: "white",
                        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                    }}
                >
                    <Helmet title="Учётные карточки – ИС ППО работников БНТУ" />
                    <Flex
                        vertical
                        align="center"
                        justify="center"
                        style={{
                            width: "30%",
                            height: "100%",
                            filter: editModeEnabled ? "grayscale(75%)" : "none",
                            pointerEvents: editModeEnabled ? "none" : "auto",
                            opacity: editModeEnabled ? 0.65 : 1,
                            position: "relative",
                            zIndex: 0,
                        }}
                    >
                        <EmployeesSearch />
                    </Flex>

                    <Flex
                        align="center"
                        justify="center"
                        vertical
                        style={{
                            width: "70%",
                            height: "100%",
                            boxShadow: "0px 10px 10px 0px rgba(0, 0, 0, 0.1)",
                        }}
                    >
                        <EmployeesViewer />
                    </Flex>
                </Flex>
            </EmployeeEditorProvider>
        </EmployeesProvider>
    );
}
