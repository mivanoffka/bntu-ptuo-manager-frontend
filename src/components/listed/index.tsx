import { IObjectFieldProps } from "@/components/fields/types";
import { SecondaryLabel } from "@/components/labels";
import { ListedItem } from "@/components/listed/listed-item";
import { IPrimaryKeyed } from "@/model";
import { Flex, Divider, Button } from "antd";
import { ReactNode } from "react";

export interface IListedProps<T extends IPrimaryKeyed> {
    editModeEnabled?: boolean;
    items: T[];
    FieldType: React.FC<IObjectFieldProps<T>>;
    newItemGetter: () => T;
    onChange: (item: T | null) => void;
    onDelete: (item: T) => void;
    title?: ReactNode;
}

export function Listed<T extends IPrimaryKeyed>(props: IListedProps<T>) {
    const {
        items,
        FieldType,
        newItemGetter,
        onChange,
        onDelete,
        title: titleBase,
        editModeEnabled = false,
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
                                editModeEnabled={editModeEnabled}
                                value={item}
                                onChange={onChange}
                            ></FieldType>
                        );
                        return (
                            <ListedItem
                                editModeEnabled={editModeEnabled}
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
