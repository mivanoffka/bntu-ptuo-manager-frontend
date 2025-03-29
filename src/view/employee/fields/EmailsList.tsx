import { useEmployeeUpdater } from "@/controller/employee/EmployeeUpdaterContext";
import { EmailField } from "@/view/employee/fields/EmailField";
import { Listed } from "@/view/field/Listed";

export function EmailsList() {
    const { getEmails, addEmail, removeEmail, updateEmail } =
        useEmployeeUpdater();

    return (
        <Listed
            items={getEmails()}
            FieldType={EmailField}
            get={getEmails}
            add={addEmail}
            update={updateEmail}
            remove={removeEmail}
            title="Электронная почта"
        ></Listed>
    );
}
