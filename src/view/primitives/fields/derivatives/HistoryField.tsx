import { useEditMode, useEmployeeEditor } from "@/controller/employee";
import { IPrimaryKeyed, ITimeStamped } from "@/model";
import {
    CombinedField,
    Field,
    FieldTitle,
} from "@/view/primitives/fields/field";
import { HistoryUtility } from "@/model";
import { useEffect, useState } from "react";
import { Checkbox, Flex } from "antd";
import dayjs from "dayjs";
import { Commented } from "@/view/primitives/containers";
import { ToggleButton } from "@/view/primitives/buttons";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";

export interface IHistoryFieldProps<T extends ITimeStamped & IPrimaryKeyed> {
    title?: string;
    DisplayFieldType: React.ComponentType<{
        value: T;
    }>;
    EditFieldType: React.ComponentType<{
        value: T;
        onChange: (value: T) => void;
    }>;
    onChangeList: (value: T) => void;
    onChangeNew: (value: T | null) => void;
    items: T[];
    newItem: T | null;
    newItemGetter: () => T;
}

export function HistoryField<T extends IPrimaryKeyed & ITimeStamped>(
    props: IHistoryFieldProps<T>
) {
    const {
        title,
        DisplayFieldType,
        EditFieldType,
        newItemGetter,
        onChangeList,
        onChangeNew,
        items,
        newItem,
    } = props;

    const [asNewItem, setAsNewItem] = useState(false);
    const { editModeEnabled } = useEditMode();

    useEffect(() => {
        setAsNewItem(false);
        onChangeNew(null);
    }, [editModeEnabled]);

    const itemsHistory = HistoryUtility.fromCollection<T>(items);

    const value =
        (asNewItem ? newItem : itemsHistory.relevant) || newItemGetter();

    const onChange = asNewItem ? onChangeNew : onChangeList;

    const editField = <EditFieldType value={value} onChange={onChange} />;

    const historyItems = itemsHistory.history.map((item, index) => {
        return (
            <Flex justify="space-between" style={{ width: "100%" }}>
                <Flex>
                    <DisplayFieldType value={item.item} />
                </Flex>
                <Flex>
                    <FieldTitle>
                        (до {dayjs(item.updatedAt).format("DD.MM.YYYY")})
                    </FieldTitle>
                </Flex>
            </Flex>
        );
    });

    const singularDisplayField = <DisplayFieldType value={value} />;

    const multipleDisplayField = (
        <Commented comment={historyItems}>{singularDisplayField}</Commented>
    );

    const displayField =
        items.length > 1 ? multipleDisplayField : singularDisplayField;

    return (
        <Field title={title}>
            <Flex gap="small" align="end" style={{ width: "100%" }}>
                <CombinedField
                    displayField={displayField}
                    editField={editField}
                />
                <Flex style={{ width: "25px" }}>
                    {editModeEnabled && (
                        <ToggleButton
                            isChecked={asNewItem}
                            onChange={setAsNewItem}
                            label={<PlusOutlined></PlusOutlined>}
                            checkedLabel={<MinusOutlined></MinusOutlined>}
                            reversed
                        />
                    )}
                </Flex>
            </Flex>
        </Field>
    );
}
