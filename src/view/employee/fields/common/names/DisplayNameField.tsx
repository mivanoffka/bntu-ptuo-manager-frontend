import { FieldContainer } from "@/view/primitives/fields/Field";
import { LabelField } from "@/view/primitives/fields/derivatives/LabelField";
import { IName, NameUtility } from "@/model";

export interface IDisplayNameFieldProps {
    value: IName;
}

export function DisplayNameField(props: IDisplayNameFieldProps) {
    const { value } = props;

    return (
        <FieldContainer>
            <LabelField value={NameUtility.getFullName(value)} />
        </FieldContainer>
    );
}
