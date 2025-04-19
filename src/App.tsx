import React from "react";
import { PageContainer } from "@/view/page-container";
import { TopBar } from "@/view/top-bar";
import { ApiProvider } from "@/controller/api";
import { AuthProvider } from "@/controller/auth";
import { Navigate, Route, Routes, BrowserRouter } from "react-router-dom";
import { SignIn } from "@/view/auth/SignIn";
import { Content } from "@/view/content";
import {
    EditModeProvider,
    EmployeeEditorProvider,
    EmployeesProvider,
} from "@/controller/employee";
import { EnumerationsProvider } from "@/controller/enumerations/EnumerationsContext";
import { ConfigProvider } from "antd";
import { TreesProvider } from "@/controller/trees";
import { Layout } from "@/view/layout/Layout";
import { THEME } from "@/view/constants";

export const AppProviders: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => (
    <EditModeProvider>
        <TreesProvider>
            <EnumerationsProvider>
                <EmployeesProvider>
                    <EmployeeEditorProvider>{children}</EmployeeEditorProvider>
                </EmployeesProvider>
            </EnumerationsProvider>
        </TreesProvider>
    </EditModeProvider>
);

const App: React.FC = () => (
    <ConfigProvider componentSize="small" theme={THEME}>
        <BrowserRouter>
            <ApiProvider>
                <AuthProvider>
                    <Routes>
                        <Route path="/auth/sign-in" element={<SignIn />} />
                        <Route
                            path="*"
                            element={
                                <PageContainer>
                                    <Content>
                                        <TopBar />
                                        <Routes>
                                            <Route
                                                path="/employees/:id?/:timestamp?"
                                                element={<Layout />}
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
                            }
                        />
                    </Routes>
                </AuthProvider>
            </ApiProvider>
        </BrowserRouter>
    </ConfigProvider>
);

export default App;
