import { useDisplayedEmployee } from "@/controller/employee/DisplayedEmployeeContext";
import { useEmployeeUpdater } from "@/controller/employee/EmployeeUpdaterContext";
import { CombinedField } from "@/view/field/CombinedField";
import { Label } from "@/view/field/Label";
import { DatePicker } from "antd";
import dayjs from "dayjs";

export function BirthdateField() {
    const { displayedEmployee } = useDisplayedEmployee();
    const { updateBirthdate } = useEmployeeUpdater();

    const getBirthdateValue = () => {
        const rawDate = displayedEmployee?.birthdate;
        if (!rawDate) return null;
        const parsedDate = dayjs(rawDate);
        return parsedDate.isValid() ? parsedDate : null;
    };

    const birthdate = getBirthdateValue();

    const displayField = (
        <Label>
            {birthdate ? birthdate.format("DD.MM.YYYY") : "Не указано"}
        </Label>
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
