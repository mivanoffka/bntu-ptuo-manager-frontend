import { useEmployeeEditor } from "@/controller/employee/EmployeeEditorContext";
import { Listed } from "@/view/primitives/listed/Listed";
import { Email } from "@/model";
import { tempIds } from "@/controller/employee/utils";
import { EmailField } from "@/view/employee/fields/contacts/EmailField";

export function EmailsList() {
    const { getList, updateList, removeFromList } = useEmployeeEditor();

    const getEmails = () => getList<Email>("emails");

    const addEmail = () =>
        updateList<Email>("emails", {
            id: tempIds.generate(),
            value: null,
            comment: null,
        });

    const updateEmail = (email: Email) => updateList<Email>("emails", email);

    const removeEmail = (email: Email) =>
        removeFromList<Email>("emails", email);

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
