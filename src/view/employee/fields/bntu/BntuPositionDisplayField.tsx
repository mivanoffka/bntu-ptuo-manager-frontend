import { IBntuPosition } from "@/model";
import { FieldContainer, LabelField, SelectField } from "@/view/primitives";
import { Commented } from "@/view/primitives/containers";
import { DateTimeField } from "@/view/primitives/fields";
import { IDisplayFieldProps } from "@/view/primitives/fields/types";
import { Flex } from "antd";

export function BntuPositionDisplayField(
    props: IDisplayFieldProps<IBntuPosition>
) {
    const { value: item } = props;

    const bntuPositionOptions = [
        { id: 1, label: "ФИТР" },
        { id: 2, label: "ФММП" },
        { id: 3, label: "МСФ" },
        { id: 4, label: "АТФ" },
    ];

    const comment = (
        <FieldContainer title="Причина увольнения">
            {item.dischargementComment
                ? item.dischargementComment
                : "По собственному желанию"}
        </FieldContainer>
    );

    return (
        <Commented comment={comment}>
            <Flex gap="small" justify="space-between" style={{ width: "100%" }}>
                <Flex gap="small" style={{ width: "100%" }}>
                    <LabelField value={item.label}></LabelField>
                    <SelectField.Display
                        enumeration={bntuPositionOptions}
                        selectedId={item.bntuDepartmentOptionId}
                    />
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
