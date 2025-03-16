import React from "react";
import { PageContainer } from "@/view/page-container";
import { TopBar } from "@/view/top-bar";
import { ApiProvider } from "@/controller/api";
import { AuthProvider } from "@/controller/auth";
import { Navigate, Route, Routes, BrowserRouter } from "react-router-dom";
import { SignIn } from "@/view/auth/SignIn";
import { Content } from "@/view/content";
import { EmployeesManager } from "@/view/manager";

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <ApiProvider>
                <AuthProvider>
                    <PageContainer>
                        <TopBar></TopBar>
                        <Content>
                            <Routes>
                                <Route
                                    path="/employees"
                                    element={<EmployeesManager />}
                                ></Route>
                                <Route
                                    path="/auth/sign-in"
                                    element={<SignIn />}
                                />
                                <Route
                                    path="*"
                                    element={<Navigate to="/employees" />}
                                />
                            </Routes>
                        </Content>
                    </PageContainer>
                </AuthProvider>
            </ApiProvider>
        </BrowserRouter>
    );
};

export default App;
