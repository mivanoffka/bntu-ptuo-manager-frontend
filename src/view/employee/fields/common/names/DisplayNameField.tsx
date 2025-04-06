import { Field } from "@/view/primitives/fields/field/Field";
import { LabelField } from "@/view/primitives/fields/derivatives/LabelField";
import { IName } from "@/model";

export interface IDisplayNameFieldProps {
    value: IName;
}

export function DisplayNameField(props: IDisplayNameFieldProps) {
    const { value } = props;

    const { firstName, lastName, middleName } = value ?? {
        firstName: "",
        lastName: "",
        middleName: "",
    };

    const fullName = (
        <LabelField> {`${lastName} ${firstName} ${middleName}`}</LabelField>
    );

    return <Field>{fullName}</Field>;
}
