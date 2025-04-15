import { useEditMode } from "@/controller/employee/EditModeContext";
import { IPrimaryKeyed } from "@/model";
import { Expandable } from "@/view/primitives/containers/Expandable";
import { SecondaryLabel } from "@/view/primitives/fields/SecondaryLabel";
import { IEditFieldProps } from "@/view/primitives/fields/types";
import { ListedItem } from "@/view/primitives/listed/ListedItem";
import { Button, Divider, Flex } from "antd";
import { ReactNode } from "react";

export interface IListedProps<T extends IPrimaryKeyed> {
    items: T[];
    FieldType: React.FC<IEditFieldProps<T>>;
    newItemGetter: () => T;
    onChange: (item: T | null) => void;
    onDelete: (item: T) => void;
    title?: ReactNode;
}

export function Listed<T extends IPrimaryKeyed>(props: IListedProps<T>) {
    const { editModeEnabled } = useEditMode();
    const {
        items,
        FieldType,
        newItemGetter,
        onChange,
        onDelete,
        title: titleBase,
    } = props;

    const handleAddClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        onChange(newItemGetter());
    };

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
            </Flex>
            <Divider orientation="right">
                {editModeEnabled && (
                    <Button size="small" onClick={handleAddClick}>
                        Добавить
                    </Button>
                )}
            </Divider>
        </Flex>
    );
}
