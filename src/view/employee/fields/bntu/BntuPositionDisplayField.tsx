import { useTrees } from "@/controller/trees";
import { IBntuPosition } from "@/model";
import { FieldContainer, LabelField, SelectField } from "@/view/primitives";
import { Commented } from "@/view/primitives/containers";
import { DateTimeField } from "@/view/primitives/fields";
import { SelectTreeField } from "@/view/primitives/fields/derivatives/select-tree/SelectTreeField";
import { IDisplayFieldProps } from "@/view/primitives/fields/types";
import { Flex } from "antd";

export function BntuPositionDisplayField(
    props: IDisplayFieldProps<IBntuPosition>
) {
    const { value: item } = props;

    const { bntuDepartmentsTree } = useTrees();

    const comment = item.isDischarged ? (
        <FieldContainer title="Причина увольнения">
            {item.isDischargedVoluntarily
                ? "По собственному желанию"
                : item.dischargementComment || "Не указана"}
        </FieldContainer>
    ) : null;

    return (
        <Commented comment={comment}>
            <Flex gap="small" justify="space-between" style={{ width: "100%" }}>
                <Flex gap="small" style={{ width: "100%" }}>
                    <LabelField value={item.label}></LabelField>
                    <SelectTreeField.Display
                        tree={bntuDepartmentsTree}
                        selectedPath={item.bntuDepartmentOptionPath}
                    ></SelectTreeField.Display>
                </Flex>
            </Flex>
            <Flex gap="small" style={{ width: "100%" }}>
                {"c "}
                <DateTimeField.Display
                    value={item.hiredAt}
                ></DateTimeField.Display>
                {item.dischargedAt && (
                    <>
                        {"по "}
                        <DateTimeField.Display
                            value={item.dischargedAt}
                        ></DateTimeField.Display>
                    </>
                )}
            </Flex>
        </Commented>
    );
}
