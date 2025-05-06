import { Listed } from "@/view/primitives/listed/Listed";
import { IAddress } from "@/model";
import { tempIds } from "@/controller/employee/utils";
import { AddressField } from "@/view/employee/fields/contacts/AddressField";
import { useEditMode, useEmployeeEditor } from "@/controller/employee";

export function AddressesList() {
    const { getList, updateList, removeFromList } = useEmployeeEditor();
    const { editModeEnabled } = useEditMode();

    const getAddresses = () => getList<IAddress>("addresses");

    const getNewAddress = () => {
        return {
            id: tempIds.generate(),
            value: null,
            comment: null,
        };
    };

    const updateAddress = (item: IAddress | null) => {
        if (item) {
            updateList<IAddress>("addresses", item);
        }
    };

    const removeAddress = (item: IAddress) =>
        removeFromList<IAddress>("addresses", item);

    return (
        <Listed<IAddress>
            editModeEnabled={editModeEnabled}
            items={getAddresses()}
            FieldType={AddressField}
            newItemGetter={getNewAddress}
            onChange={updateAddress}
            onDelete={removeAddress}
            title="Места жительства"
        ></Listed>
    );
}
