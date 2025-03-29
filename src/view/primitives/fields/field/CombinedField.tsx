import { ReactNode } from "react";
import { useEditMode } from "@/controller/employee/EditModeContext";
import { Field } from "@/view/primitives/fields/field/Field";
import "./style/field.css";

export interface ICombinedFieldProps {
    title?: string;
    displayField: ReactNode;
    editField: ReactNode;
}

export function CombinedField(props: ICombinedFieldProps) {
    const { title, editField, displayField } = props;

    const { editModeEnabled } = useEditMode();

    return (
        <Field title={title}>
            {editModeEnabled ? editField : displayField}
        </Field>
    );
}
