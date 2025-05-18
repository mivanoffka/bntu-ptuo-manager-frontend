import { IObjectFieldProps } from "@/components/fields/types";
import { SecondaryLabel } from "@/components/labels";
import { ListedItem } from "@/components/listed/listed-item";
import { IPrimaryKeyed } from "@/model";
import { Flex, Divider, Button, Form } from "antd";
import { ReactNode } from "react";

export interface IListedItemProps {
    index: number;
}

export interface IListedProps {
    FieldType: React.FC<IListedItemProps>;
    title?: ReactNode;
    name: string;
}

export function Listed(props: IListedProps) {
    const { FieldType, title: titleBase, name } = props;

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
                                            editModeEnabled={true}
                                            index={index}
                                            remove={() => remove(item.name)}
                                        >
                                            <FieldType
                                                index={index}
                                            ></FieldType>
                                        </ListedItem>
                                    );
                                })}
                                <Divider orientation="right">
                                    <Button
                                        type="dashed"
                                        onClick={() => add()}
                                        block
                                    >
                                        + Add Item
                                    </Button>
                                </Divider>
                            </div>
                        )}
                    </Form.List>
                </Flex>
            </Flex>
        </Flex>
    );
}
