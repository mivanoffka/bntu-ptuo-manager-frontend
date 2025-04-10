import { CombinedFieldContainer } from "@/view/primitives/fields/field/CombinedField";
import { IBntuPosition } from "@/model";
import { IEditFieldProps } from "@/view/primitives/fields/types";
import { useEditMode } from "@/controller/employee";
import { BntuPositionEditField } from "@/view/employee/fields/bntu/BntuPositionEditField";
import { BntuPositionDisplayField } from "@/view/employee/fields/bntu/BntuPositionDisplayField";

export function BntuPositionField(props: IEditFieldProps<IBntuPosition>) {
    const { value: item, onChange } = props;
    const { editModeEnabled } = useEditMode();

    return (
        <CombinedFieldContainer
            editModeEnabled={editModeEnabled}
            value={item}
            onChange={onChange}
            DisplayFieldType={BntuPositionDisplayField}
            EditFieldType={BntuPositionEditField}
        />
    );
}

BntuPositionField.Edit = BntuPositionEditField;
BntuPositionField.Display = BntuPositionDisplayField;
