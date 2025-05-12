import { IPhoneNumber } from "@/model";
import { tempIds } from "@/contexts/employees/utils";
import { Listed } from "@/components/listed";
import { useEditMode } from "@/contexts/employees/edit-mode";
import { useEmployeeEditor } from "@/contexts/employees/editor";
import { PhoneNumberField } from "@/pages/employees/viewer/employee/fields/contacts/phone-numbers/list-item";

export function PhoneNumbersList() {
    const { getList, updateList, removeFromList } = useEmployeeEditor();
    const { editModeEnabled } = useEditMode();

    const getPhoneNumbers = () => getList<IPhoneNumber>("phoneNumbers");

    const getNewPhoneNumber = () => {
        return {
            id: tempIds.generate(),
            value: null,
            comment: null,
            phoneNumberTypeId: null,
        };
    };

    const updatePhoneNumber = (item: IPhoneNumber | null) => {
        if (item) {
            updateList<IPhoneNumber>("phoneNumbers", item);
        }
    };

    const removePhoneNumber = (item: IPhoneNumber) =>
        removeFromList<IPhoneNumber>("phoneNumbers", item);

    return (
        <Listed<IPhoneNumber>
            editModeEnabled={editModeEnabled}
            items={getPhoneNumbers()}
            FieldType={PhoneNumberField}
            newItemGetter={getNewPhoneNumber}
            onChange={updatePhoneNumber}
            onDelete={removePhoneNumber}
            title="Номера телефонов"
        ></Listed>
    );
}
