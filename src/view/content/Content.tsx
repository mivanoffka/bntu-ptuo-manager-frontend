import React from "react";

import { useApi } from "@/controller/api";
import { Loader } from "@/view/loader";
import { Flex } from "antd";

export interface IContent {
    children?: React.ReactNode;
}

export function Content({ children }: IContent) {
    const { loading } = useApi();

    const content = loading ? <Loader /> : children;

    return (
        <Flex
            vertical
            align="center"
            justify="center"
            style={{ width: "100%", height: "100%" }}
        >
            {content}
        </Flex>
    );
}
