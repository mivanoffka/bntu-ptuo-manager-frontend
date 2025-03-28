import { useDisplayedEmployee } from "@/controller/employee/DisplayedEmployeeContext";
import { useEmployeeUpdater } from "@/controller/employee/EmployeeUpdaterContext";
import { EnumerationItem } from "@/model/enumeration";
import { CombinedField } from "@/view/field/CombinedField";
import { Field } from "@/view/field/Field";
import { Label } from "@/view/field/Label";
import { TextInput } from "@/view/field/TextInput";
import { VBox } from "@/view/utils";
import { DatePicker, Flex, Input, Select, Typography } from "antd";
import dayjs from "dayjs";

export interface ISelectField {
    title?: string;
    value: EnumerationItem;
    onChange: (value: EnumerationItem) => void;
    enumeration: EnumerationItem[];
}

export function SelectField(props: ISelectField) {
    const { displayedEmployee } = useDisplayedEmployee();
    const { title, enumeration, onChange, value } = props;

    const displayField = <Label>{value?.label ?? "Не выбрано"}</Label>;

    const editField = (
        <Select
            allowClear
            style={{ textAlign: "left" }}
            size="small"
            value={value ?? undefined} // или null
            onChange={onChange}
            options={enumeration}
            placeholder="Не выбрано" // опционально
        />
    );

    return (
        <CombinedField
            title={title}
            displayField={displayField}
            editField={editField}
        ></CombinedField>
    );
}
