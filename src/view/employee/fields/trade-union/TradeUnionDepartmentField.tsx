import { useTrees } from "@/controller/trees";
import { FieldContainer } from "@/view/primitives";
import { SelectTreeField } from "@/view/primitives/fields/derivatives/SelectTreeField";
import { useEditMode, useEmployeeEditor } from "@/controller/employee";
import { TreeName } from "@/controller/trees/constants";

export function TradeUnionDepartmentField() {
    const { getTree } = useTrees();

    const tradeUnionDepartmentsTree = getTree(TreeName.TRADE_UNION_DEPARTMENTS);

    const { getField, updateField } = useEmployeeEditor();
    const selectedPath = getField<String>("tradeUnionDepartmentPath") as string;
    const onChange = (value: string | null) =>
        updateField("tradeUnionDepartmentPath", value);

    const { editModeEnabled } = useEditMode();

    return (
        <FieldContainer title="ЦПО">
            <SelectTreeField
                editModeEnabled={editModeEnabled}
                tree={tradeUnionDepartmentsTree}
                selectedPath={selectedPath}
                onChange={onChange}
            />
        </FieldContainer>
    );
}
