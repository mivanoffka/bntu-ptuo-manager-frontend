import React from "react";
import { PageContainer } from "@/view/page-container";
import { TopBar } from "@/view/top-bar";
import { ApiProvider } from "@/controller/api";
import { AuthProvider } from "@/controller/auth";
import { Navigate, Route, Routes, BrowserRouter } from "react-router-dom";
import { SignIn } from "@/view/auth/SignIn";
import { Content } from "@/view/content";
import { EmployeesManager } from "@/view/manager";
import { EmployeesProvider } from "@/controller/employee/EmployeesContext";
import { EmployeesSelectionProvider } from "@/controller/employee/EmployeesSelectionContext";
import { EmployeeEditorProvider } from "@/controller/employee/EmployeeEditorContext";
import { EditModeProvider } from "@/controller/employee/EditModeContext";

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <ApiProvider>
                <AuthProvider>
                    <EditModeProvider>
                        <EmployeesSelectionProvider>
                            <EmployeesProvider>
                                <EmployeeEditorProvider>
                                    <PageContainer>
                                        <TopBar></TopBar>
                                        <Content>
                                            <Routes>
                                                <Route
                                                    path="/employees"
                                                    element={
                                                        <EmployeesManager />
                                                    }
                                                ></Route>
                                                <Route
                                                    path="/auth/sign-in"
                                                    element={<SignIn />}
                                                />
                                                <Route
                                                    path="*"
                                                    element={
                                                        <Navigate to="/employees" />
                                                    }
                                                />
                                            </Routes>
                                        </Content>
                                    </PageContainer>
                                </EmployeeEditorProvider>
                            </EmployeesProvider>
                        </EmployeesSelectionProvider>
                    </EditModeProvider>
                </AuthProvider>
            </ApiProvider>
        </BrowserRouter>
    );
};

export default App;
