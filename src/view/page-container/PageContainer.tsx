import React from "react";

import "@/view/page-container/style/page-container.css";

export interface IPageContainer {
    children?: React.ReactNode;
}

export function PageContainer({ children }: IPageContainer) {
    return <div className="page-container">{children}</div>;
}
