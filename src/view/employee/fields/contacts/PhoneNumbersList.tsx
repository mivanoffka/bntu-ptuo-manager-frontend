import { Listed } from "@/view/primitives/listed/Listed";
import { IPhoneNumber } from "@/model";
import { tempIds } from "@/controller/employee/utils";
import { PhoneNumberField } from "@/view/employee/fields/contacts/PhoneNumberField";
import { useEmployeeEditor } from "@/controller/employee";

export function PhoneNumbersList() {
    const { getList, updateList, removeFromList } = useEmployeeEditor();

    const getPhoneNumbers = () => getList<IPhoneNumber>("phoneNumbers");

    const addPhoneNumber = () =>
        updateList<IPhoneNumber>("phoneNumbers", {
            id: tempIds.generate(),
            value: null,
            comment: null,
            phoneNumberTypeId: null,
        });

    const updatePhoneNumber = (phoneNumber: IPhoneNumber) =>
        updateList<IPhoneNumber>("phoneNumbers", phoneNumber);

    const removePhoneNumber = (phoneNumber: IPhoneNumber) =>
        removeFromList<IPhoneNumber>("phoneNumbers", phoneNumber);

    return (
        <Listed
            items={getPhoneNumbers()}
            FieldType={PhoneNumberField}
            get={getPhoneNumbers}
            add={addPhoneNumber}
            update={updatePhoneNumber}
            remove={removePhoneNumber}
            title="Номера телефонов"
        ></Listed>
    );
}
