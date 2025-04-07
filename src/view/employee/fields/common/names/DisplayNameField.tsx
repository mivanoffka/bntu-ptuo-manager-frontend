import { Field } from "@/view/primitives/fields/field/Field";
import { LabelField } from "@/view/primitives/fields/derivatives/LabelField";
import { IName, NameUtility } from "@/model";

export interface IDisplayNameFieldProps {
    value: IName;
}

export function DisplayNameField(props: IDisplayNameFieldProps) {
    const { value } = props;

    return (
        <Field>
            <LabelField>
                {NameUtility.getFullName(value, "Без имени")}
            </LabelField>
        </Field>
    );
}
