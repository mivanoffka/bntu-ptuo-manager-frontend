import { FieldContainer } from "@/view/primitives/fields/field/Field";
import {
    IDisplayFieldProps,
    IEditFieldProps,
} from "@/view/primitives/fields/types";
import "./style/field.css";

export interface ICombinedFieldContainerProps<T> extends IEditFieldProps<T> {
    editModeEnabled: boolean;
    title?: string;
    DisplayFieldType: React.FC<IDisplayFieldProps<T>>;
    EditFieldType: React.FC<IEditFieldProps<T>>;
}

export function CombinedFieldContainer<T>(
    props: ICombinedFieldContainerProps<T>
) {
    const {
        editModeEnabled,
        title,
        EditFieldType,
        DisplayFieldType,
        value,
        onChange,
    } = props;

    const displayField = <DisplayFieldType value={value} />;
    const editField = <EditFieldType value={value} onChange={onChange} />;

    return (
        <FieldContainer title={title}>
            {editModeEnabled ? editField : displayField}
        </FieldContainer>
    );
}
