import { Listed } from "@/view/primitives/listed/Listed";
import { IEmail } from "@/model";
import { tempIds } from "@/controller/employee/utils";
import { EmailField } from "@/view/employee/fields/contacts/EmailField";
import { useEmployeeEditor } from "@/controller/employee";

export function EmailsList() {
    const { getList, updateList, removeFromList } = useEmployeeEditor();

    const getEmails = () => getList<IEmail>("emails");

    const getNewEmail = () => {
        return {
            id: tempIds.generate(),
            value: null,
            comment: null,
        };
    };

    const updateEmail = (item: IEmail | null) => {
        if (item) {
            updateList<IEmail>("emails", item);
        }
    };

    const removeEmail = (item: IEmail) =>
        removeFromList<IEmail>("emails", item);

    return (
        <Listed<IEmail>
            items={getEmails()}
            FieldType={EmailField}
            newItemGetter={getNewEmail}
            onChange={updateEmail}
            onDelete={removeEmail}
            title="Электронная почта"
        ></Listed>
    );
}
