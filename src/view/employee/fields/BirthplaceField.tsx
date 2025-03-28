import { useDisplayedEmployee } from "@/controller/employee/DisplayedEmployeeContext";
import { useEmployeeUpdater } from "@/controller/employee/EmployeeUpdaterContext";
import { CombinedField } from "@/view/field/CombinedField";
import { Field } from "@/view/field/Field";
import { Label } from "@/view/field/Label";
import { TextInput } from "@/view/field/TextInput";
import { VBox } from "@/view/utils";
import { DatePicker, Flex, Input, Typography } from "antd";
import dayjs from "dayjs";

export function BirthplaceField() {
    const { displayedEmployee } = useDisplayedEmployee();
    const { updateBirthplace } = useEmployeeUpdater();

    const { birthplace } = displayedEmployee;

    const displayField = <Label>{birthplace}</Label>;

    const editField = (
        <TextInput value={birthplace} onChange={updateBirthplace}></TextInput>
    );

    return (
        <CombinedField
            title="Место рождения"
            displayField={displayField}
            editField={editField}
        ></CombinedField>
    );
}
