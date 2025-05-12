import { Listed } from "@/components/listed";
import { useEditMode } from "@/contexts/employees/edit-mode";
import { useEmployeeEditor } from "@/contexts/employees/editor";
import { tempIds } from "@/contexts/employees/utils";
import { IAddress } from "@/model";
import { AddressField } from "@/pages/employees/viewer/employee/fields/contacts/addresses/list-item";

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
