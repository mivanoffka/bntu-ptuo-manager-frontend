import { useDisplayedEmployee } from "@/controller/employee/DisplayedEmployeeContext";
import { useEmployeeUpdater } from "@/controller/employee/EmployeeUpdaterContext";
import { CombinedField } from "@/view/field/CombinedField";
import { Field } from "@/view/field/Field";
import { Label } from "@/view/field/Label";
import { SelectField } from "@/view/field/SelectField";
import { TextInput } from "@/view/field/TextInput";
import { VBox } from "@/view/utils";
import { DatePicker, Flex, Input, Typography } from "antd";
import dayjs from "dayjs";

export function GenderField() {
    const { displayedEmployee } = useDisplayedEmployee();
    const { updateGender } = useEmployeeUpdater();

    const { gender } = displayedEmployee;

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
