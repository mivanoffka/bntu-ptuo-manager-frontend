import { IconButton } from "@/components/buttons";
import { IFieldProps } from "@/components/fields/shared";
import { SecondaryLabel } from "@/components/labels";
import { ListedItem } from "@/components/listed/listed-item";
import { PlusOutlined } from "@ant-design/icons";
import { Flex, Divider, Button, Form } from "antd";
import { ReactNode } from "react";

export interface IListedItemProps extends IFieldProps {
    index: number;
}

export interface IListedProps extends IFieldProps {
    FieldType: React.FC<IListedItemProps>;
    title?: ReactNode;
    name: string;
}

export function Listed(props: IListedProps) {
    const { FieldType, title: titleBase, name, isEditable } = props;

    const title = (
        <Flex justify="space-between" style={{ width: "100%" }}>
            <SecondaryLabel>{titleBase}</SecondaryLabel>
        </Flex>
    );

    return (
        <Flex
            vertical
            align="center"
            justify="center"
            style={{
                width: "100%",
                height: "100%",
            }}
        >
            <Divider orientation="left">{title}</Divider>
            <Flex vertical align="left" gap="middle" style={{ width: "100%" }}>
                <Flex
                    vertical
                    align="left"
                    gap="small"
                    style={{ width: "100%" }}
                >
                    <Form.List name={name}>
                        {(items, { add, remove }) => (
                            <div
                                style={{
                                    display: "flex",
                                    rowGap: 16,
                                    flexDirection: "column",
                                }}
                            >
                                {items.map((item, index) => {
                                    return (
                                        <ListedItem
                                            editModeEnabled={isEditable}
                                            index={index}
                                            remove={() => remove(item.name)}
                                        >
                                            <FieldType
                                                isEditable={isEditable}
                                                index={index}
                                            ></FieldType>
                                        </ListedItem>
                                    );
                                })}
                                <Divider orientation="right">
                                    {isEditable && (
                                        <IconButton
                                            isPrimary
                                            onClick={() => add()}
                                            title={"Добавить"}
                                            icon={<PlusOutlined />}
                                        ></IconButton>
                                    )}
                                </Divider>
                            </div>
                        )}
                    </Form.List>
                </Flex>
            </Flex>
        </Flex>
    );
}
