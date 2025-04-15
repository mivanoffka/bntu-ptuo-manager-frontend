import { ITradeUnionDepartmentRecord } from "@/model";
import { useTrees } from "@/controller/trees";
import { FieldContainer } from "@/view/primitives";
import { IObjectFieldProps } from "@/view/primitives/fields";
import { SelectTreeField } from "@/view/primitives/fields/derivatives/SelectTreeField";

export function TradeUnionDepartmentField(
    props: IObjectFieldProps<ITradeUnionDepartmentRecord>
) {
    const { value, onChange, editModeEnabled } = props;
    const { tradeUnionDepartmentsTree } = useTrees();

    return (
        <FieldContainer>
            <SelectTreeField
                editModeEnabled={editModeEnabled}
                tree={tradeUnionDepartmentsTree}
                selectedPath={value.tradeUnionDepartmentOptionPath}
                onChange={(tradeUnionDepartmentOptionPath) =>
                    onChange({ ...value, tradeUnionDepartmentOptionPath })
                }
            />
        </FieldContainer>
    );
}
