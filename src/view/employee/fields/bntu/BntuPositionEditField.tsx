import { useEnumerations } from "@/controller/enumerations/EnumerationsContext";
import { useTrees } from "@/controller/trees";
import { TreeName } from "@/controller/trees/constants";
import { IBntuPosition } from "@/model";
import { FieldContainer, InputField, SelectField } from "@/view/primitives";
import { DateTimeField } from "@/view/primitives/fields";
import { SelectTreeEditField } from "@/view/primitives/fields/derivatives/select-tree/SelectTreeEditField";
import { IEditFieldProps } from "@/view/primitives/fields/types";
import { Checkbox, Flex, Tree } from "antd";

export function BntuPositionEditField(props: IEditFieldProps<IBntuPosition>) {
    const { value: item, onChange } = props;
    const { bntuDepartmentsTree } = useTrees();

    function onIsDischargedChange(e: any) {
        const isDischarged = e.target.checked;

        if (!isDischarged) {
            onChange({ ...item, dischargedAt: null, isDischarged });
        } else {
            onChange({ ...item, isDischarged, isDischargedVoluntarily: true });
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
                        <SelectTreeEditField
                            selectedPath={item.bntuDepartmentOptionPath}
                            onChange={(bntuDepartmentOptionPath) =>
                                onChange({
                                    ...item,
                                    bntuDepartmentOptionPath,
                                })
                            }
                            tree={bntuDepartmentsTree}
                        ></SelectTreeEditField>
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
