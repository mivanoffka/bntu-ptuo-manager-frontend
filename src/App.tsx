import React from "react";
import { PageContainer } from "@/view/page-container";
import { TopBar } from "@/view/top-bar";
import { ApiProvider } from "@/controller/api";
import { AuthProvider } from "@/controller/auth";
import { Navigate, Route, Routes, BrowserRouter } from "react-router-dom";
import { SignIn } from "@/view/auth/SignIn";
import { Content } from "@/view/content";
import ruRU from "antd/lib/locale/ru_RU";

import { EnumerationsProvider } from "@/controller/enumerations/EnumerationsContext";
import { ConfigProvider } from "antd";
import { THEME } from "@/view/constants";
import { EditModeProvider } from "@/controller/employee";
import { TreesProvider } from "@/controller/trees";
import { Employees } from "@/view/manager/Employees";
import { References } from "@/view/references/References";
import { SignUp } from "@/view/auth/SignUp";
import { Auth } from "@/view/auth/Auth";

const App: React.FC = () => (
    <ConfigProvider locale={ruRU} componentSize="small" theme={THEME}>
        <BrowserRouter>
            <ApiProvider>
                <AuthProvider>
                    <Routes>
                        <Route
                            path="*"
                            element={
                                <PageContainer>
                                    <Content>
                                        <EditModeProvider>
                                            <TreesProvider>
                                                <EnumerationsProvider>
                                                    <TopBar />
                                                    <Routes>
                                                        {/* <Route
                                                            path="/auth/sign-in"
                                                            element={<SignIn />}
                                                        />
                                                        <Route
                                                            path="/auth/sign-up"
                                                            element={<SignUp />}
                                                        /> */}
                                                        <Route
                                                            path="/auth"
                                                            element={<Auth />}
                                                        ></Route>

                                                        <Route
                                                            path="/employees/:id?/:timestamp?"
                                                            element={
                                                                <Employees />
                                                            }
                                                        />
                                                        <Route
                                                            path="/references"
                                                            element={
                                                                <References />
                                                            }
                                                        />
                                                        <Route
                                                            path="*"
                                                            element={
                                                                <Navigate to="/employees" />
                                                            }
                                                        />
                                                    </Routes>
                                                </EnumerationsProvider>
                                            </TreesProvider>
                                        </EditModeProvider>
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
