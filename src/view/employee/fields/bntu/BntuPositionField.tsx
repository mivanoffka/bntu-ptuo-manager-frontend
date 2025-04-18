import { useEditMode } from "@/controller/employee";
import { useTrees } from "@/controller/trees";
import { IBntuPosition } from "@/model";
import { FieldContainer, InputField, SelectField } from "@/view/primitives";
import { DateTimeField, IObjectFieldProps } from "@/view/primitives/fields";
import { BooleanField } from "@/view/primitives/fields/derivatives/BooleanField";
import { SelectTreeField } from "@/view/primitives/fields/derivatives/SelectTreeField";
import { Flex, Tree } from "antd";

export function BntuPositionField(props: IObjectFieldProps<IBntuPosition>) {
    const { value: item, onChange } = props;
    const { bntuDepartmentsTree } = useTrees();
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
                        <InputField
                            editModeEnabled={editModeEnabled}
                            value={item.label}
                            onChange={(label) => onChange({ ...item, label })}
                        ></InputField>
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
                {/* {!item.isDischarged && dischargedCheckBox} */}
                {dischargedCheckBox}
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
                                        editModeEnabled={editModeEnabled}
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
