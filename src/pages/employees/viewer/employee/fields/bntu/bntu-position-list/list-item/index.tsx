import { FieldContainer } from "@/components/containers/field-container";
import { BooleanField } from "@/components/fields/boolean";
import { DateTimeField } from "@/components/fields/datetime";
import { TextField } from "@/components/fields/text";
import { SelectTreeField } from "@/components/fields/tree-select";
import { IObjectFieldProps } from "@/components/fields/types";
import { useEditMode } from "@/contexts/employees/edit-mode";
import { useTrees } from "@/contexts/trees";
import { TreeName } from "@/contexts/trees/constants";
import { IBntuPosition } from "@/model";
import { Flex } from "antd";

export function BntuPositionField(props: IObjectFieldProps<IBntuPosition>) {
    const { value: item, onChange } = props;
    const { getTree } = useTrees();
    const bntuDepartmentsTree = getTree(TreeName.BNTU_DEPARTMENTS);

    const { editModeEnabled } = useEditMode();

    function onIsDischargedChange(value: boolean) {
        if (!value) {
            onChange({ ...item, dischargedAt: null, isDischarged: value });
        } else {
            onChange({
                ...item,
                isDischarged: value,
                isDischargedVoluntarily: true,
            });
        }
    }

    function onIsDischargedVoluntarilyChange(value: boolean) {
        if (!value) {
            onChange({
                ...item,
                isDischargedVoluntarily: value,
                dischargementComment: null,
            });
        } else {
            onChange({ ...item, isDischargedVoluntarily: value });
        }
    }

    const dischargedCheckBox = (
        <Flex align="end" justify="right">
            <BooleanField
                editModeEnabled={editModeEnabled}
                value={item.isDischarged || false}
                onChange={onIsDischargedChange}
            >
                Уволен
            </BooleanField>
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
                <BooleanField
                    editModeEnabled={editModeEnabled}
                    value={item.isDischargedVoluntarily || false}
                    onChange={onIsDischargedVoluntarilyChange}
                >
                    По собств. желанию
                </BooleanField>
            )}
        </Flex>
    );

    return (
        <Flex vertical gap="small" align="center" style={{ width: "100%" }}>
            <Flex gap="small" style={{ width: "100%" }}>
                <Flex style={{ width: "33%" }}>
                    <FieldContainer title="Должность">
                        <TextField
                            editModeEnabled={editModeEnabled}
                            value={item.label}
                            onChange={(label) => onChange({ ...item, label })}
                        ></TextField>
                    </FieldContainer>
                </Flex>
                <Flex style={{ width: "33%" }}>
                    <FieldContainer title="Подразделение">
                        <SelectTreeField
                            editModeEnabled={editModeEnabled}
                            selectedPath={item.bntuDepartmentPath}
                            onChange={(bntuDepartmentPath) =>
                                onChange({
                                    ...item,
                                    bntuDepartmentPath,
                                })
                            }
                            tree={bntuDepartmentsTree}
                        ></SelectTreeField>
                    </FieldContainer>
                </Flex>
                <Flex style={{ width: "33%" }}>
                    <FieldContainer title="Дата назначения">
                        <DateTimeField
                            editModeEnabled={editModeEnabled}
                            value={item.hiredAt}
                            onChange={(hiredAt) =>
                                onChange({ ...item, hiredAt })
                            }
                        ></DateTimeField>
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
                                    <TextField
                                        editModeEnabled={editModeEnabled}
                                        value={item.dischargementComment}
                                        onChange={(dischargementComment) =>
                                            onChange({
                                                ...item,
                                                dischargementComment,
                                            })
                                        }
                                    ></TextField>
                                </FieldContainer>
                            )}
                        </Flex>

                        <Flex style={{ width: "33%" }}>
                            <FieldContainer title="Дата увольнения">
                                <DateTimeField
                                    editModeEnabled={editModeEnabled}
                                    value={item.dischargedAt}
                                    onChange={(dischargedAt) =>
                                        onChange({ ...item, dischargedAt })
                                    }
                                ></DateTimeField>
                            </FieldContainer>
                        </Flex>
                    </Flex>
                    {!item.isDischargedVoluntarily && checkBoxes}
                </Flex>
            )}
        </Flex>
    );
}
