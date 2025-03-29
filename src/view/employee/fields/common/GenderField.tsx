import { useEmployeeEditor } from "@/controller/employee/EmployeeEditorContext";
import { CombinedField } from "@/view/primitives/fields/field/CombinedField";
import { Field } from "@/view/primitives/fields/field/Field";
import { LabelField } from "@/view/primitives/fields/derivatives/LabelField";
import { SelectField } from "@/view/primitives/fields/derivatives/SelectField";
import { InputField } from "@/view/primitives/fields/derivatives/InputField";
import { VBox } from "@/view/utils";
import { DatePicker, Flex, Input, Typography } from "antd";
import dayjs from "dayjs";
import { Gender } from "@/model";
import { useEnumerations } from "@/controller/enumerations/EnumerationsContext";

export function GenderField() {
    const { getField, updateField } = useEmployeeEditor();
    const { genders } = useEnumerations();

    const gender = getField<Gender>("gender");

    const updateGender = (value: Gender) => updateField("gender", value);

    return (
        <SelectField
            title="Пол"
            value={gender}
            enumeration={genders}
            onChange={updateGender}
        ></SelectField>
    );
}
