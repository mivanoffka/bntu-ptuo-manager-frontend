import { FC, useEffect, useState } from "react";
import { Checkbox, Flex, Switch } from "antd";
import dayjs from "dayjs";
import { Commented } from "@/view/primitives/containers";
import { ToggleButton } from "@/view/primitives/buttons";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import {
    CombinedFieldContainer,
    FieldContainer,
    SecondaryLabel,
} from "@/view/primitives/fields/field";
import {
    IDisplayFieldProps,
    IEditFieldProps,
} from "@/view/primitives/fields/types";
import { IPrimaryKeyed, ITimeStamped } from "@/model";
import { HistoryUtility } from "@/model";

export interface IHistoryFieldProps<T extends ITimeStamped & IPrimaryKeyed> {
    editModeEnabled: boolean;
    title?: string;
    DisplayFieldType: FC<IDisplayFieldProps<T>>;
    EditFieldType: FC<IEditFieldProps<T>>;
    onChangeListItem: (value: T | null) => void;
    onChangeNew: (value: T | null) => void;
    items: T[];
    newItem: T | null;
    newItemGetter: () => T;
}

export function HistoryField<T extends ITimeStamped & IPrimaryKeyed>(
    props: IHistoryFieldProps<T>
) {
    const {
        editModeEnabled,
        title,
        DisplayFieldType,
        EditFieldType,
        newItemGetter,
        onChangeListItem,
        onChangeNew,
        items,
        newItem,
    } = props;

    const [asNewItem, setAsNewItem] = useState(false);

    useEffect(() => {
        setAsNewItem(false);
        onChangeNew(null);
    }, [editModeEnabled]);

    const itemsHistory = HistoryUtility.fromCollection<T>(items);
    const value =
        (asNewItem ? newItem : itemsHistory.relevant) ?? newItemGetter();
    const onChange = asNewItem ? onChangeNew : onChangeListItem;

    const historyItems = itemsHistory.history.map((item, index) => {
        return (
            <Flex
                key={item.item.id}
                justify="space-between"
                style={{ width: "100%" }}
            >
                <Flex>
                    <DisplayFieldType value={item.item} />
                </Flex>
                <Flex>
                    <SecondaryLabel>
                        (до {dayjs(item.updatedAt).format("DD.MM.YYYY")})
                    </SecondaryLabel>
                </Flex>
            </Flex>
        );
    });

    const MultipleDisplayFieldType: FC<IDisplayFieldProps<T>> = (props) => {
        return (
            <Commented comment={historyItems}>
                <DisplayFieldType {...props} />
            </Commented>
        );
    };

    const ActualDisplayFieldType: FC<IDisplayFieldProps<T>> =
        items.length > 1 ? MultipleDisplayFieldType : DisplayFieldType;

    return (
        <FieldContainer title={title}>
            <Flex gap="small" align="end" style={{ width: "100%" }}>
                <CombinedFieldContainer
                    DisplayFieldType={ActualDisplayFieldType}
                    EditFieldType={EditFieldType}
                    onChange={onChange}
                    value={value}
                    editModeEnabled={editModeEnabled}
                />
                <Flex style={{ width: "100px" }}>
                    {editModeEnabled && (
                        <Switch
                            size="default"
                            checkedChildren="Замена"
                            unCheckedChildren="Правка"
                            checked={asNewItem}
                            onChange={setAsNewItem}
                        />
                    )}
                </Flex>
            </Flex>
        </FieldContainer>
    );
}
