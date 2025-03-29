import { useEditMode } from "@/controller/employee/EditModeContext";
import { DeleteOutlined } from "@ant-design/icons";
import { Button, Flex, Typography } from "antd";
import { ReactNode } from "react";

export interface IListedItemProps {
    index: number;
    children: ReactNode;
    remove: (item: any) => void;
}

export function ListedItem(props: IListedItemProps) {
    const { index, children, remove } = props;
    const { editModeEnabled } = useEditMode();

    return (
        <Flex gap="middle" align="end" style={{ width: "100%" }}>
            <Typography.Text
                type="secondary"
                style={{
                    whiteSpace: "nowrap",
                    marginBottom: editModeEnabled ? "2px" : "0",
                }}
            >
                {index + 1}.
            </Typography.Text>
            {children}
            {editModeEnabled && (
                <Button size="small" type="link" onClick={remove}>
                    <DeleteOutlined />
                </Button>
            )}
        </Flex>
    );
}
