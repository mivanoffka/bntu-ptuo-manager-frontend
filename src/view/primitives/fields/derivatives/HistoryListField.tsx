import { useEmployeeEditor } from "@/controller/employee";
import { IPrimaryKeyed, ITimeStamped } from "@/model";
import {
    CombinedField,
    Field,
    FieldTitle,
} from "@/view/primitives/fields/field";
import { HistoryUtility } from "@/model";
import dayjs from "dayjs";
import { Commented } from "@/view/primitives/containers";
import { Listed } from "@/view/primitives/listed";

export interface IHistoryListFieldProps<
    T extends ITimeStamped & IPrimaryKeyed
> {
    title?: string;
    DisplayFieldType: React.ComponentType<{
        value: T;
    }>;
    EditFieldType: React.ComponentType<{
        value: T;
        onChange: (value: T) => void;
    }>;
    onChange: (value: T) => void;
    onDelete: (value: T) => void;
    values: T[];
    newItemGetter: () => T;
}

export function HistoryListField<T extends IPrimaryKeyed & ITimeStamped>(
    props: IHistoryListFieldProps<T>
) {
    const {
        title,
        DisplayFieldType,
        EditFieldType,
        values,
        newItemGetter,
        onChange,
        onDelete,
    } = props;
    props;

    const itemsHistory = HistoryUtility.fromCollection<T>(values);

    const value = itemsHistory.relevant || newItemGetter();

    const items = values.filter((item) => item.id !== value.id);

    const editField = (
        <Listed
            items={items}
            FieldType={EditFieldType}
            newItemGetter={newItemGetter}
            onChange={onChange}
            onDelete={onDelete}
        ></Listed>
    );

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
        values.length > 1 ? multipleDisplayField : singularDisplayField;

    return (
        <Field title={title}>
            <CombinedField displayField={displayField} editField={editField} />
        </Field>
    );
}
