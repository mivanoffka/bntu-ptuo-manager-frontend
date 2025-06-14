import { Palette } from "@/constants";
import { DeleteOutlined } from "@ant-design/icons";
import { Button, Flex, Typography } from "antd";
import { ReactNode } from "react";

export interface IListedItemProps {
    index: number;
    children: ReactNode;
    remove: (item: any) => void;
    editModeEnabled?: boolean;
}

export function ListedItem(props: IListedItemProps) {
    const { index, children, remove, editModeEnabled = false } = props;

    return (
        <Flex gap="small" align="start" style={{ width: "100%" }}>
            <Typography.Text
                type="secondary"
                style={{
                    whiteSpace: "nowrap",
                    marginTop: "20px",
                }}
            >
                {index + 1}.
            </Typography.Text>
            {children}
            {editModeEnabled && (
                <Button
                    size="small"
                    type="link"
                    onClick={remove}
                    style={{ marginTop: "20px", width: "15px" }}
                >
                    <DeleteOutlined style={{ color: Palette.RED }} />
                </Button>
            )}
        </Flex>
    );
}
