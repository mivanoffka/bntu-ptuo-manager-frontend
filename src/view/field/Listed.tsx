import { useEditMode } from "@/controller/employee/EditModeContext";
import { DropDown } from "@/view/field/DropDown";
import { FieldTitle } from "@/view/field/FieldTitle";
import { ListedItem } from "@/view/field/ListedItem";
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

    const titleComponent = (
        <Flex justify="space-between" style={{ width: "100%" }}>
            <FieldTitle>{title}</FieldTitle>
            {editModeEnabled && (
                <Button size="small" onClick={add}>
                    Добавить
                </Button>
            )}
        </Flex>
    );

    return (
        <DropDown title={titleComponent}>
            {items.map((item, index) => {
                const field = (
                    <FieldType item={item} onChange={update}></FieldType>
                );
                return (
                    <ListedItem index={index} remove={() => remove(item)}>
                        {field}
                    </ListedItem>
                );
            })}
        </DropDown>
    );
}
