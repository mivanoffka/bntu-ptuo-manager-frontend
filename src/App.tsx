import React from "react";
import { ApiProvider } from "@/contexts/api";
import { AuthProvider } from "@/contexts/auth";
import { Navigate, Route, Routes, BrowserRouter } from "react-router-dom";
import { EnumerationsProvider } from "@/contexts/enumerations";
import { ConfigProvider } from "antd";
import { TreesProvider } from "@/contexts/trees";
import dayjs from "dayjs";
import "dayjs/locale/ru";
import localizedFormat from "dayjs/plugin/localizedFormat";
import updateLocale from "dayjs/plugin/updateLocale";
import { PageContainer } from "@/components/page";
import { EditModeProvider } from "@/contexts/employees/edit-mode";
import { AuthPage, EmployeesPage } from "@/pages";
import { SignIn } from "@/pages/auth/sign-in";
import { SignUp } from "@/pages/auth/sign-up";
import { ReferencesPage } from "@/pages/references";
import { UsersPage } from "@/pages/users";
import { ANTD_CONFIG } from "@/constants";
import { Helmet, HelmetProvider } from "react-helmet-async";
import "./App.css";

dayjs.locale("ru");
dayjs.extend(localizedFormat);
dayjs.extend(updateLocale);
const App: React.FC = () => (
    <HelmetProvider>
        <Helmet title="ИС ППО работников БНТУ "></Helmet>
        <ConfigProvider {...ANTD_CONFIG}>
            <BrowserRouter>
                <ApiProvider>
                    <AuthProvider>
                        <EditModeProvider>
                            <Routes>
                                <Route
                                    path="*"
                                    element={
                                        <PageContainer>
                                            <TreesProvider>
                                                <EnumerationsProvider>
                                                    <Routes>
                                                        <Route
                                                            path="/auth/*"
                                                            element={
                                                                <AuthPage />
                                                            }
                                                        >
                                                            <Route
                                                                path="sign-in"
                                                                element={
                                                                    <SignIn />
                                                                }
                                                            />
                                                            <Route
                                                                path="sign-up"
                                                                element={
                                                                    <SignUp />
                                                                }
                                                            />
                                                        </Route>

                                                        <Route
                                                            path="/employees/:id?/:timestamp?"
                                                            element={
                                                                <EmployeesPage />
                                                            }
                                                        />
                                                        <Route
                                                            path="/references"
                                                            element={
                                                                <ReferencesPage />
                                                            }
                                                        />
                                                        <Route
                                                            path="/users"
                                                            element={
                                                                <UsersPage />
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
                                        </PageContainer>
                                    }
                                />
                            </Routes>
                        </EditModeProvider>
                    </AuthProvider>
                </ApiProvider>
            </BrowserRouter>
        </ConfigProvider>
    </HelmetProvider>
);

export default App;
