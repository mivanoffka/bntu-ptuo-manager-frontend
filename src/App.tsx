import React from "react";
import { PageContainer } from "@/view/page-container";
import { TopBar } from "@/view/top-bar";
import { ApiProvider } from "@/controller/api";
import { AuthProvider } from "@/controller/auth";
import { Navigate, Route, Routes, BrowserRouter } from "react-router-dom";
import { SignIn } from "@/view/auth/SignIn";
import { Content } from "@/view/content";
import { EmployeesManager } from "@/view/manager";
import {
    EditModeProvider,
    EmployeeEditorProvider,
    EmployeesProvider,
    EmployeeVersionsProvider,
    OneSelectedEmployeeProvider,
    OneSelectedEmployeeVersionProvider,
    SelectedEmployeesProvider,
} from "@/controller/employee";
import { EnumerationsProvider } from "@/controller/enumerations/EnumerationsContext";
import { ConfigProvider } from "antd";
import { TreesProvider } from "@/controller/trees";
import { Layout } from "@/view/layout/Layout";
import { THEME } from "@/view/constants";

const App: React.FC = () => (
    <ConfigProvider componentSize="small" theme={THEME}>
        <BrowserRouter>
            <ApiProvider>
                <AuthProvider>
                    <EditModeProvider>
                        <TreesProvider>
                            <EnumerationsProvider>
                                <SelectedEmployeesProvider>
                                    <EmployeesProvider>
                                        <OneSelectedEmployeeProvider>
                                            <EmployeeVersionsProvider>
                                                <OneSelectedEmployeeVersionProvider>
                                                    <EmployeeEditorProvider>
                                                        <PageContainer>
                                                            <Content>
                                                                <TopBar></TopBar>
                                                                <Routes>
                                                                    <Route
                                                                        path="/employees"
                                                                        element={
                                                                            <Layout />
                                                                        }
                                                                    ></Route>
                                                                    <Route
                                                                        path="/auth/sign-in"
                                                                        element={
                                                                            <SignIn />
                                                                        }
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
                                                </OneSelectedEmployeeVersionProvider>
                                            </EmployeeVersionsProvider>
                                        </OneSelectedEmployeeProvider>
                                    </EmployeesProvider>
                                </SelectedEmployeesProvider>
                            </EnumerationsProvider>
                        </TreesProvider>
                    </EditModeProvider>
                </AuthProvider>
            </ApiProvider>
        </BrowserRouter>
    </ConfigProvider>
);

export default App;
