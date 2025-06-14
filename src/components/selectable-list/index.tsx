import { Flex, List, Typography } from "antd";
import "./style.css";
import React, { ReactNode } from "react";

export interface ISelectableListItemProps<T> {
    item: T;
}

export interface ISelectableListProps<T> {
    data: T[];
    selectedId: string | number | null;
    onSelect: (id: number | null) => void;
    footer?: ReactNode;
    RenderItem: React.FC<ISelectableListItemProps<T>>;
    getId: (item: any) => string | number;
    height?: string;
    isSelectable?: boolean;
}

export function SelectableList<T>(props: ISelectableListProps<T>) {
    const {
        data,
        selectedId,
        onSelect,
        RenderItem,
        getId,
        footer,
        height = "25px",
    } = props;

    return (
        <Flex
            vertical
            align="center"
            justify="space-between"
            style={{ width: "100%", height: "100%" }}
        >
            <List
                style={{ width: "100%" }}
                dataSource={data}
                renderItem={(item, index) => {
                    const id = getId(item);
                    const isSelected = selectedId === id;
                    const rowClass = `employee-row ${
                        index % 2 === 0 ? "even" : "odd"
                    } ${isSelected ? "selected" : ""}`;

                    return (
                        <List.Item
                            style={{ height, width: "100%" }}
                            className={rowClass}
                            onClick={() => onSelect(id)}
                        >
                            <Typography.Text
                                style={{ fontSize: "13px", width: "100%" }}
                            >
                                <Flex>
                                    <RenderItem item={item} />
                                </Flex>
                            </Typography.Text>
                        </List.Item>
                    );
                }}
            />
            <Flex
                align="center"
                style={{
                    width: "100%",
                    borderTop: "1px solid #d9d9d9",
                }}
            >
                {footer}
            </Flex>
        </Flex>
    );
}
