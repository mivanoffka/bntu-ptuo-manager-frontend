import { FC, useEffect, useState } from "react";
import { Flex, Switch } from "antd";
import dayjs from "dayjs";
import { Commented } from "@/view/primitives/containers";
import { IPrimaryKeyed, ITimeStamped } from "@/model";
import { HistoryUtility } from "@/model";
import { FieldContainer, SecondaryLabel } from "@/view/primitives";
import { IObjectFieldProps } from "@/view/primitives/fields/types";

export interface IHistoryFieldProps<T extends ITimeStamped & IPrimaryKeyed> {
    editModeEnabled: boolean;
    title?: string;
    FieldType: FC<IObjectFieldProps<T>>;
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
        FieldType,
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
                    <FieldType
                        value={item.item}
                        onChange={onChangeListItem}
                        editModeEnabled={editModeEnabled}
                    />
                </Flex>
                <Flex>
                    <SecondaryLabel>
                        (до {dayjs(item.updatedAt).format("DD.MM.YYYY")})
                    </SecondaryLabel>
                </Flex>
            </Flex>
        );
    });

    const MultipleFieldType: FC<IObjectFieldProps<T>> = (props) => {
        return (
            <Commented comment={historyItems}>
                <FieldType {...props} />
            </Commented>
        );
    };

    const ActualFieldType: FC<IObjectFieldProps<T>> =
        items.length > 1 ? MultipleFieldType : FieldType;

    return (
        <FieldContainer title={title}>
            <Flex gap="small" align="end" style={{ width: "100%" }}>
                <ActualFieldType
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
