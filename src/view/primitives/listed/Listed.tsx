import { useEditMode } from "@/controller/employee/EditModeContext";
import { IPrimaryKeyed } from "@/model";
import { Expandable } from "@/view/primitives/containers/Expandable";
import { FieldTitle } from "@/view/primitives/fields/field/FieldTitle";
import { ListedItem } from "@/view/primitives/listed/ListedItem";
import { Button, Flex } from "antd";
import { ReactNode } from "react";

export interface IListedProps<T extends IPrimaryKeyed> {
    items: T[];
    FieldType: React.ComponentType<{ value: T; onChange: (value: T) => void }>;
    newItemGetter: () => T;
    onChange: (item: T) => void;
    onDelete: (item: T) => void;
    title?: ReactNode;
}

export function Listed<T extends IPrimaryKeyed>(props: IListedProps<T>) {
    const { editModeEnabled } = useEditMode();
    const { items, FieldType, newItemGetter, onChange, onDelete, title } =
        props;

    const handleAddClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        onChange(newItemGetter());
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
                                value={item}
                                onChange={onChange}
                            ></FieldType>
                        );
                        return (
                            <ListedItem
                                index={index}
                                remove={() => onDelete(item)}
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
