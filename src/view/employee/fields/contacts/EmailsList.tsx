import { Listed } from "@/view/primitives/listed/Listed";
import { IEmail } from "@/model";
import { tempIds } from "@/controller/employee/utils";
import { EmailField } from "@/view/employee/fields/contacts/EmailField";
import { useEmployeeEditor } from "@/controller/employee";

export function EmailsList() {
    const { getList, updateList, removeFromList } = useEmployeeEditor();

    const getEmails = () => getList<IEmail>("emails");

    const addEmail = () =>
        updateList<IEmail>("emails", {
            id: tempIds.generate(),
            value: null,
            comment: null,
        });

    const updateEmail = (email: IEmail) => updateList<IEmail>("emails", email);

    const removeEmail = (email: IEmail) =>
        removeFromList<IEmail>("emails", email);

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
