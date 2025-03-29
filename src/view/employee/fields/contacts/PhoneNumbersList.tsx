import { useEmployeeEditor } from "@/controller/employee/EmployeeEditorContext";
import { Listed } from "@/view/primitives/listed/Listed";
import { PhoneNumber } from "@/model";
import { tempIds } from "@/controller/employee/utils";
import { PhoneNumberField } from "@/view/employee/fields/contacts/PhoneNumberField";

export function PhoneNumbersList() {
    const { getList, updateList, removeFromList } = useEmployeeEditor();

    const getPhoneNumbers = () => getList<PhoneNumber>("phoneNumbers");

    const addPhoneNumber = () =>
        updateList<PhoneNumber>("phoneNumbers", {
            id: tempIds.generate(),
            value: null,
            comment: null,
            phoneNumberType: null,
        });

    const updatePhoneNumber = (phoneNumber: PhoneNumber) =>
        updateList<PhoneNumber>("phoneNumbers", phoneNumber);

    const removePhoneNumber = (phoneNumber: PhoneNumber) =>
        removeFromList<PhoneNumber>("phoneNumbers", phoneNumber);

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
