import { useEnumerations } from "@/controller/enumerations/EnumerationsContext";
import { IBntuPosition } from "@/model";
import { FieldContainer, InputField, SelectField } from "@/view/primitives";
import { DateTimeField } from "@/view/primitives/fields";
import { IEditFieldProps } from "@/view/primitives/fields/types";
import { Checkbox, Flex } from "antd";

export function BntuPositionEditField(props: IEditFieldProps<IBntuPosition>) {
    const { value: item, onChange } = props;
    const bntuPositionOptions = [
        { id: 1, label: "ФИТР" },
        { id: 2, label: "ФММП" },
        { id: 3, label: "МСФ" },
        { id: 4, label: "АТФ" },
    ];

    function onIsDischargedChange(e: any) {
        const isDischarged = e.target.checked;

        if (!isDischarged) {
            onChange({ ...item, dischargedAt: null, isDischarged });
        } else {
            onChange({ ...item, isDischarged });
        }
    }

    function onIsDischargedVoluntarilyChange(e: any) {
        const isDischargedVoluntarily = e.target.checked;

        if (!isDischargedVoluntarily) {
            onChange({
                ...item,
                isDischargedVoluntarily,
                dischargementComment: null,
            });
        } else {
            onChange({ ...item, isDischargedVoluntarily });
        }
    }

    const dischargedCheckBox = (
        <Flex align="end" justify="right">
            <Checkbox
                checked={item.isDischarged || false}
                onChange={onIsDischargedChange}
            >
                Уволен
            </Checkbox>
        </Flex>
    );

    const checkBoxes = (
        <Flex
            gap="small"
            align="center"
            style={{
                width: "100%",
                minHeight: !item.isDischargedVoluntarily ? "40px" : 0,
            }}
            justify="space-evenly"
        >
            {dischargedCheckBox}
            {item.isDischarged && (
                <Checkbox
                    defaultChecked={true}
                    checked={item.isDischargedVoluntarily || false}
                    onChange={onIsDischargedVoluntarilyChange}
                >
                    По собств. желанию
                </Checkbox>
            )}
        </Flex>
    );

    return (
        <Flex vertical gap="small" align="center" style={{ width: "100%" }}>
            <Flex gap="small" style={{ width: "100%" }}>
                <Flex style={{ width: "33%" }}>
                    <FieldContainer title="Должность">
                        <InputField
                            value={item.label}
                            onChange={(label) => onChange({ ...item, label })}
                        ></InputField>
                    </FieldContainer>
                </Flex>
                <Flex style={{ width: "33%" }}>
                    <FieldContainer title="Подразделение">
                        <SelectField.Edit
                            selectedId={item.bntuDepartmentOptionId}
                            enumeration={bntuPositionOptions}
                            onChange={(bntuDepartmentOptionId) =>
                                onChange({ ...item, bntuDepartmentOptionId })
                            }
                        ></SelectField.Edit>
                    </FieldContainer>
                </Flex>
                <Flex style={{ width: "33%" }}>
                    <FieldContainer title="Дата назначения">
                        <DateTimeField.Edit
                            value={item.hiredAt}
                            onChange={(hiredAt) =>
                                onChange({ ...item, hiredAt })
                            }
                        ></DateTimeField.Edit>
                    </FieldContainer>
                </Flex>
                {!item.isDischarged && dischargedCheckBox}
            </Flex>
            {item.isDischarged && (
                <Flex vertical style={{ width: "100%" }}>
                    <Flex gap="small" style={{ width: "100%" }}>
                        <Flex style={{ width: "67%" }}>
                            {item.isDischargedVoluntarily ? (
                                checkBoxes
                            ) : (
                                <FieldContainer title="Комментарий (причина увольнения)">
                                    <InputField
                                        value={item.dischargementComment}
                                        onChange={(dischargementComment) =>
                                            onChange({
                                                ...item,
                                                dischargementComment,
                                            })
                                        }
                                    ></InputField>
                                </FieldContainer>
                            )}
                        </Flex>

                        <Flex style={{ width: "33%" }}>
                            <FieldContainer title="Дата увольнения">
                                <DateTimeField.Edit
                                    value={item.dischargedAt}
                                    onChange={(dischargedAt) =>
                                        onChange({ ...item, dischargedAt })
                                    }
                                ></DateTimeField.Edit>
                            </FieldContainer>
                        </Flex>
                    </Flex>
                    {!item.isDischargedVoluntarily && checkBoxes}
                </Flex>
            )}
        </Flex>
    );
}
