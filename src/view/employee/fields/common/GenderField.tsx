import { useEmployeeEditor } from "@/controller/employee/EmployeeEditorContext";
import { useEmployeeUpdater } from "@/controller/employee/EmployeeUpdaterContext";
import { CombinedField } from "@/view/primitives/fields/field/CombinedField";
import { Field } from "@/view/primitives/fields/field/Field";
import { LabelField } from "@/view/primitives/fields/derivatives/LabelField";
import { SelectField } from "@/view/primitives/fields/derivatives/SelectField";
import { InputField } from "@/view/primitives/fields/derivatives/InputField";
import { VBox } from "@/view/utils";
import { DatePicker, Flex, Input, Typography } from "antd";
import dayjs from "dayjs";
import { Gender } from "@/model";

export function GenderField() {
    const { getField, updateField } = useEmployeeEditor();

    const gender = getField<Gender>("gender");

    const updateGender = (value: Gender) => updateField("gender", value);

    return (
        <SelectField
            title="Пол"
            value={gender}
            enumeration={[
                { value: 0, label: "Женский" },
                { value: 1, label: "Мужской" },
            ]}
            onChange={updateGender}
        ></SelectField>
    );
}
