import React from "react";
import "./style.css";
import { TopBar } from "@/components/page/top-bar";

export interface IPageContainer {
    children?: React.ReactNode;
}

export function PageContainer({ children }: IPageContainer) {
    return (
        <div className="root-container">
            <div className="page-container">
                <div className="content-container">
                    <TopBar />
                    <div className="layout">{children}</div>
                </div>
            </div>
        </div>
    );
}
