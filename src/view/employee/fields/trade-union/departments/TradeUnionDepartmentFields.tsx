import { HistoryField } from "@/view/primitives/fields";
import { useEditMode, useEmployeeEditor } from "@/controller/employee";
import { tempIds } from "@/controller/employee/utils";
import { ITradeUnionDepartmentRecord } from "@/model";
import { TradeUnionDepartmentDisplayField } from "@/view/employee/fields/trade-union/departments/TradeUnionDepartmentDisplayField";
import { TradeUnionDepartmentEditField } from "@/view/employee/fields/trade-union/departments/TradeUnionDepartmentEditField";

export function TradeUnionDepartmentFields() {
    const { editModeEnabled } = useEditMode();

    const { getList, updateList, getField, updateField } = useEmployeeEditor();

    function getNewTradeUnionDepartmentRecord(): ITradeUnionDepartmentRecord {
        return {
            id: tempIds.generate(),
            createdAt: null,
            tradeUnionDepartmentOptionPath: null,
            authenticLabel: null,
        };
    }

    const tradeUnionDepartmentRecords = getList<ITradeUnionDepartmentRecord>(
        "tradeUnionDepartmentRecords"
    );
    const newTradeUnionDepartmentRecord = getField<ITradeUnionDepartmentRecord>(
        "newTradeUnionDepartmentRecord"
    );

    const updateTradeUnionDepartmentRecord = (
        value: ITradeUnionDepartmentRecord | null
    ) => {
        if (value) {
            updateList<ITradeUnionDepartmentRecord>(
                "tradeUnionDepartmentRecords",
                value
            );
        }
    };

    const updateNewTradeUnionDepartmentRecord = (
        value: ITradeUnionDepartmentRecord | null
    ) => {
        updateField<ITradeUnionDepartmentRecord>(
            "newTradeUnionDepartmentRecord",
            value
        );
    };

    const title = "ЦПО";

    return (
        <HistoryField
            editModeEnabled={editModeEnabled}
            title={title}
            newItemGetter={getNewTradeUnionDepartmentRecord}
            items={tradeUnionDepartmentRecords}
            newItem={newTradeUnionDepartmentRecord}
            onChangeListItem={updateTradeUnionDepartmentRecord}
            onChangeNew={updateNewTradeUnionDepartmentRecord}
            DisplayFieldType={TradeUnionDepartmentDisplayField}
            EditFieldType={TradeUnionDepartmentEditField}
        />
    );
}
