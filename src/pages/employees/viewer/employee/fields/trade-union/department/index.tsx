import { FieldContainer } from "@/components/containers/field-container";
import { SelectTreeField } from "@/components/fields/tree-select";
import { useEditMode } from "@/contexts/employees/edit-mode";
import { useEmployeeEditor } from "@/contexts/employees/editor";
import { useTrees } from "@/contexts/trees";
import { TreeName } from "@/contexts/trees/constants";

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
