import { Flex, Typography } from "antd";
import "./style/field.css";
import { ReactNode } from "react";
import { useEditMode } from "@/controller/employee/EditModeContext";
import { Field } from "@/view/field/Field";

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
