import { useEmployeeEditor } from "@/controller/employee/EmployeeEditorContext";
import { DateTimeString } from "@/model/date.time.string";
import { CombinedField, LabelField } from "@/view/primitives";
import { DatePicker } from "antd";
import dayjs from "dayjs";

export function BirthdateField() {
    const { displayedEmployee, updateField } = useEmployeeEditor();

    const getBirthdateValue = () => {
        const rawDate = displayedEmployee?.birthdate;
        if (!rawDate) return null;
        const parsedDate = dayjs(rawDate);
        return parsedDate.isValid() ? parsedDate : null;
    };

    const birthdate = getBirthdateValue();

    const updateBirthdate = (date: dayjs.Dayjs | null) => {
        updateField<DateTimeString | null>(
            "birthdate",
            date?.toISOString() as DateTimeString
        );
    };

    const displayField = (
        <LabelField>
            {birthdate ? birthdate.format("DD.MM.YYYY") : "Не указано"}
        </LabelField>
    );

    const editField = (
        <DatePicker size="small" value={birthdate} onChange={updateBirthdate} />
    );

    return (
        <CombinedField
            title="Дата рождения"
            displayField={displayField}
            editField={editField}
        />
    );
}
