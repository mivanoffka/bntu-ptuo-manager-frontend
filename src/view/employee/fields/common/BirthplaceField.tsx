import { useEmployeeEditor } from "@/controller/employee/EmployeeEditorContext";
import { CombinedField } from "@/view/primitives/fields/field/CombinedField";
import { Field } from "@/view/primitives/fields/field/Field";
import { LabelField } from "@/view/primitives/fields/derivatives/LabelField";
import { InputField } from "@/view/primitives/fields/derivatives/InputField";
import { VBox } from "@/view/utils";
import { DatePicker, Flex, Input, Typography } from "antd";
import dayjs from "dayjs";

export function BirthplaceField() {
    const { getField, updateField } = useEmployeeEditor();

    const birthplace = getField<string>("birthplace");

    const updateBirthplace = (value: string) =>
        updateField("birthplace", value);

    const displayField = <LabelField>{birthplace}</LabelField>;

    const editField = (
        <InputField value={birthplace} onChange={updateBirthplace}></InputField>
    );

    return (
        <CombinedField
            title="Место рождения"
            displayField={displayField}
            editField={editField}
        ></CombinedField>
    );
}
