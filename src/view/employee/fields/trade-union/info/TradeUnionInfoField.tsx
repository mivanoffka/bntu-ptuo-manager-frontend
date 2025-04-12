import { useEditMode } from "@/controller/employee";
import { TradeUnionInfoDisplayField } from "@/view/employee/fields/trade-union/info/TradeUnionInfoDisplayField";
import { TradeUnionInfoEditField } from "@/view/employee/fields/trade-union/info/TradeUnionInfoEditField";

export function TradeUnionInfoField() {
    const { editModeEnabled } = useEditMode();

    return editModeEnabled ? (
        <TradeUnionInfoEditField />
    ) : (
        <TradeUnionInfoDisplayField />
    );
}
