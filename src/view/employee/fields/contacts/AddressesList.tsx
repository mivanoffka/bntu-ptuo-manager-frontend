import { Listed } from "@/view/primitives/listed/Listed";
import { IAddress } from "@/model";
import { tempIds } from "@/controller/employee/utils";
import { AddressField } from "@/view/employee/fields/contacts/AddressField";
import { useEmployeeEditor } from "@/controller/employee";

export function AddressesList() {
    const { getList, updateList, removeFromList } = useEmployeeEditor();

    const getAddresses = () => getList<IAddress>("addresses");

    const addAddress = () =>
        updateList<IAddress>("addresses", {
            id: tempIds.generate(),
            value: null,
            comment: null,
        });

    const updateAddress = (address: IAddress) =>
        updateList<IAddress>("addresses", address);

    const removeAddress = (address: IAddress) =>
        removeFromList<IAddress>("addresses", address);

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
