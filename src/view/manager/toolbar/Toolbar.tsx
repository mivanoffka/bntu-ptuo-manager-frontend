import { Flex } from "antd";

export interface IToolbarProps {
    children?: React.ReactNode;
}

export function Toolbar(props: IToolbarProps) {
    const { children } = props;

    const toolBar = (
        <Flex
            align="center"
            justify="center"
            style={{ width: "100%", height: "60px" }}
        >
            <Flex
                align="center"
                justify="center"
                gap="small"
                style={{ width: "90%", height: "60%" }}
            >
                {children}
            </Flex>
        </Flex>
    );

    return toolBar;
}
