import React, { useState } from "react";
import {
    List,
    Input,
    Select,
    Button,
    Space,
    message,
    Flex,
    Typography,
    Divider,
} from "antd";
import {
    MinusCircleOutlined,
    DeleteOutlined,
    PlusOutlined,
} from "@ant-design/icons";

const { Option } = Select;

interface EditableListProps<T> {
    items: T[];
    setItems: (items: T[]) => void;
    newItem: T;
    RenderBy: React.ComponentType<{
        index: number;
        item: T;
        handleChange: (index: number, key: keyof T, value: any) => void;
        style?: React.CSSProperties;
    }>;
    editMode: boolean;
}

export const EditableList = <T extends Record<string, any>>({
    items,
    setItems,
    newItem,
    RenderBy,
    editMode,
}: EditableListProps<T>) => {
    const addItem = () => {
        setItems([...items, { ...newItem }]);
    };

    const removeItems = (index: number) => {
        setItems(items.filter((_, i) => i !== index));
    };

    const handleChange = (index: number, key: keyof T, value: any) => {
        const newItems = [...items];
        newItems[index][key] = value;
        setItems(newItems);
    };

    return (
        <div>
            {items?.length > 0 && (
                <Flex vertical>
                    <List
                        dataSource={items}
                        split={false}
                        renderItem={(item, index) => (
                            <List.Item
                                style={{
                                    paddingTop: "0px",
                                    paddingBottom: "0px",
                                }}
                            >
                                <Flex
                                    vertical
                                    style={{
                                        width: "100%",
                                    }}
                                >
                                    <Flex
                                        gap="small"
                                        align="top"
                                        justify="top"
                                        style={{
                                            width: "100%",
                                        }}
                                    >
                                        <Typography.Text
                                            style={{
                                                width: "24px",
                                                marginTop: "5px",
                                            }}
                                        >
                                            {index + 1}.
                                        </Typography.Text>
                                        <RenderBy
                                            style={{
                                                width: "100%",
                                            }}
                                            index={index}
                                            item={item}
                                            handleChange={handleChange}
                                        />
                                        {editMode && (
                                            <Button
                                                onClick={() =>
                                                    removeItems(index)
                                                }
                                            >
                                                <DeleteOutlined />
                                            </Button>
                                        )}
                                    </Flex>
                                    <Divider
                                        style={{
                                            marginTop: "8px",
                                            marginBottom: "8px",
                                        }}
                                    />
                                </Flex>
                            </List.Item>
                        )}
                    />
                </Flex>
            )}
            {editMode && (
                <Button
                    icon={<PlusOutlined />}
                    onClick={addItem}
                    style={{ width: "100%" }}
                >
                    Добавить
                </Button>
            )}
        </div>
    );
};
