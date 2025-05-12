import { IEmail } from "@/model";
import { tempIds } from "@/contexts/employees/utils";
import { Listed } from "@/components/listed";
import { useEditMode } from "@/contexts/employees/edit-mode";
import { useEmployeeEditor } from "@/contexts/employees/editor";
import { EmailField } from "@/pages/employees/viewer/employee/fields/contacts/emails/list-item";

export function EmailsList() {
    const { getList, updateList, removeFromList } = useEmployeeEditor();
    const { editModeEnabled } = useEditMode();

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
            editModeEnabled={editModeEnabled}
            items={getEmails()}
            FieldType={EmailField}
            newItemGetter={getNewEmail}
            onChange={updateEmail}
            onDelete={removeEmail}
            title="Электронная почта"
        ></Listed>
    );
}
