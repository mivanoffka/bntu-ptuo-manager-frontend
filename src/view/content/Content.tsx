import React from "react";

import "@/view/page-container/style/page-container.css";
import { useApi } from "@/controller/api";
import { Loader } from "@/view/loader";

export interface IPageContainer {
    children?: React.ReactNode;
}

export function Content({ children }: IPageContainer) {
    const { loading } = useApi();

    const content = loading ? <Loader /> : children;

    return <div className="page-container">{content}</div>;
}
