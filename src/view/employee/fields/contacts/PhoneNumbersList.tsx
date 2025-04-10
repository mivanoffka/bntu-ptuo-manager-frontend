import { Listed } from "@/view/primitives/listed/Listed";
import { IPhoneNumber } from "@/model";
import { tempIds } from "@/controller/employee/utils";
import { PhoneNumberField } from "@/view/employee/fields/contacts/PhoneNumberField";
import { useEmployeeEditor } from "@/controller/employee";

export function PhoneNumbersList() {
    const { getList, updateList, removeFromList } = useEmployeeEditor();

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
            items={getPhoneNumbers()}
            FieldType={PhoneNumberField}
            newItemGetter={getNewPhoneNumber}
            onChange={updatePhoneNumber}
            onDelete={removePhoneNumber}
            title="Номера телефонов"
        ></Listed>
    );
}
