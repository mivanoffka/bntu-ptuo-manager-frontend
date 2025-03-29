import { useEditMode } from "@/controller/employee/EditModeContext";
import { Expandable } from "@/view/primitives/containers/Expandable";
import { FieldTitle } from "@/view/primitives/fields/field/FieldTitle";
import { ListedItem } from "@/view/primitives/listed/ListedItem";
import { Button, Flex } from "antd";
import { ReactNode } from "react";

export interface IListedProps<T> {
    items: T[];
    FieldType: React.ComponentType<{ item: T; onChange: (item: T) => void }>;
    get: () => T[];
    add: () => void;
    update: (item: T) => void;
    remove: (item: T) => void;
    title?: ReactNode;
}

export function Listed<T>(props: IListedProps<T>) {
    const { editModeEnabled } = useEditMode();
    const { items, FieldType, get, add, update, remove, title } = props;

    const handleAddClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        add();
    };

    const listTitle = (
        <Flex justify="space-between" style={{ width: "100%" }}>
            <FieldTitle>{title}</FieldTitle>
        </Flex>
    );

    return (
        <Expandable title={listTitle}>
            <Flex vertical align="left" gap="middle" style={{ width: "100%" }}>
                <Flex
                    vertical
                    align="left"
                    gap="small"
                    style={{ width: "100%" }}
                >
                    {items.map((item, index) => {
                        const field = (
                            <FieldType
                                item={item}
                                onChange={update}
                            ></FieldType>
                        );
                        return (
                            <ListedItem
                                index={index}
                                remove={() => remove(item)}
                            >
                                {field}
                            </ListedItem>
                        );
                    })}
                </Flex>

                {editModeEnabled && (
                    <Button size="small" onClick={handleAddClick}>
                        Добавить
                    </Button>
                )}
            </Flex>
        </Expandable>
    );
}
