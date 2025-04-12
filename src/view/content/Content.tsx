import React from "react";

import { useApi } from "@/controller/api";
import { Loader } from "@/view/loader";
import "./style/content.css";

export interface IContent {
    children?: React.ReactNode;
}

export function Content({ children }: IContent) {
    const { loading } = useApi();

    const content = loading ? <Loader /> : children;

    return <div className="content-container">{content}</div>;
}
