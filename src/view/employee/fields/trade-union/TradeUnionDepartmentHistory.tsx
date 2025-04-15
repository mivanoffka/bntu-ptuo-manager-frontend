import { HistoryField } from "@/view/primitives/fields";
import { useEditMode, useEmployeeEditor } from "@/controller/employee";
import { tempIds } from "@/controller/employee/utils";
import { ITradeUnionDepartmentRecord } from "@/model";
import { TradeUnionDepartmentField } from "@/view/employee/fields/trade-union/TradeUnionDepartmentField";

export function TradeUnionDepartmentHistory() {
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
            FieldType={TradeUnionDepartmentField}
        />
    );
}
