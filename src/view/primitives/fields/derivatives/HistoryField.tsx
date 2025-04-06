import { useEditMode, useEmployeeEditor } from "@/controller/employee";
import { IPrimaryKeyed, ITimeStamped } from "@/model";
import {
    CombinedField,
    Field,
    FieldTitle,
} from "@/view/primitives/fields/field";
import { History } from "@/model";
import { useEffect, useState } from "react";
import { Checkbox, Flex } from "antd";
import dayjs from "dayjs";
import { Commented } from "@/view/primitives/containers";

export interface IHistoryFieldProps<T extends ITimeStamped & IPrimaryKeyed> {
    title?: string;
    DisplayFieldType: React.ComponentType<{
        value: T;
    }>;
    EditFieldType: React.ComponentType<{
        value: T;
        onChange: (value: T) => void;
    }>;
    itemsFieldName: string;
    newItemFieldName: string;
    newItemGetter: () => T;
}

export function HistoryField<T extends IPrimaryKeyed & ITimeStamped>(
    props: IHistoryFieldProps<T>
) {
    const {
        title,
        DisplayFieldType,
        EditFieldType,
        itemsFieldName,
        newItemGetter,
        newItemFieldName,
    } = props;

    const [asNewItem, setAsNewItem] = useState(false);
    const { updateField, getList, getField } = useEmployeeEditor();
    const { editModeEnabled } = useEditMode();

    useEffect(() => {
        setAsNewItem(false);
        updateField(newItemFieldName, undefined);
    }, [editModeEnabled]);

    const items = getList<T>(itemsFieldName);
    const itemsHistory = History.fromCollection<T>(items);

    const newItem = getField<T>(newItemFieldName);

    const value =
        (asNewItem ? newItem : itemsHistory.relevant) || newItemGetter();

    const onChange = asNewItem
        ? (value: T) => updateField(newItemFieldName, value)
        : (value: T) =>
              updateField(
                  itemsFieldName,
                  History.updatedByReplace<T>(itemsHistory, value)
              );

    const editField = <EditFieldType value={value} onChange={onChange} />;

    const historyItems = (
        <ul>
            {itemsHistory.history.map((item, index) => {
                return (
                    <li
                        key={index}
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            gap: 20,
                        }}
                    >
                        <DisplayFieldType value={value} />
                        <FieldTitle>
                            (до {dayjs(item.updatedAt).format("DD.MM.YYYY")})
                        </FieldTitle>
                    </li>
                );
            })}
        </ul>
    );

    const singularDisplayField = <DisplayFieldType value={value} />;

    const multipleDisplayField = (
        <Commented comment={historyItems}>{singularDisplayField}</Commented>
    );

    const displayField =
        items.length > 1 ? multipleDisplayField : singularDisplayField;

    return (
        <Field title={title}>
            <Flex vertical gap="small" style={{ width: "100%" }}>
                {editModeEnabled && (
                    <Checkbox
                        checked={asNewItem}
                        onChange={(e) => setAsNewItem(e.target.checked)}
                    >
                        <FieldTitle>Сохранить как новое</FieldTitle>
                    </Checkbox>
                )}

                <CombinedField
                    displayField={displayField}
                    editField={editField}
                />
            </Flex>
        </Field>
    );
}
