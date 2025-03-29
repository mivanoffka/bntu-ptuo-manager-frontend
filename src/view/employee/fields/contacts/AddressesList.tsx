import { useEmployeeEditor } from "@/controller/employee/EmployeeEditorContext";
import { Listed } from "@/view/primitives/listed/Listed";
import { Address } from "@/model";
import { tempIds } from "@/controller/employee/utils";
import { AddressField } from "@/view/employee/fields/contacts/AddressField";

export function AddressesList() {
    const { getList, updateList, removeFromList } = useEmployeeEditor();

    const getAddresses = () => getList<Address>("addresses");

    const addAddress = () =>
        updateList<Address>("addresses", {
            id: tempIds.generate(),
            value: null,
            comment: null,
        });

    const updateAddress = (address: Address) =>
        updateList<Address>("addresses", address);

    const removeAddress = (address: Address) =>
        removeFromList<Address>("addresses", address);

    return (
        <Listed
            items={getAddresses()}
            FieldType={AddressField}
            get={getAddresses}
            add={addAddress}
            update={updateAddress}
            remove={removeAddress}
            title="Места жительства"
        ></Listed>
    );
}
