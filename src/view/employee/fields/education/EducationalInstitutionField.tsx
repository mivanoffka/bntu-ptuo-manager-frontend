import { CombinedFieldContainer } from "@/view/primitives/fields/field/CombinedField";
import { InputField } from "@/view/primitives/fields/derivatives/InputField";
import { Flex, Typography } from "antd";
import { IEducationalInstitution } from "@/model";
import { FieldContainer, SecondaryLabel } from "@/view/primitives";
import {
    IDisplayFieldProps,
    IEditFieldProps,
} from "@/view/primitives/fields/types";
import { useEditMode } from "@/controller/employee";
import dayjs from "dayjs";
import { DateTimeField } from "@/view/primitives/fields";
import { Commented } from "@/view/primitives/containers";

export function EducationalInstitutionField(
    props: IEditFieldProps<IEducationalInstitution>
) {
    const { value, onChange } = props;
    const { editModeEnabled } = useEditMode();

    function DisplayField(props: IDisplayFieldProps<IEducationalInstitution>) {
        const { value: item } = props;
        const { label, comment, graduatedAt } = item;

        return (
            <Commented comment={comment}>
                <Flex
                    align="center"
                    justify="space-between"
                    gap="small"
                    style={{ width: "100%" }}
                >
                    <Typography.Text>{label}</Typography.Text>
                    <div>
                        {graduatedAt && (
                            <SecondaryLabel>
                                окончено в {dayjs(graduatedAt).format("YYYY")}
                            </SecondaryLabel>
                        )}
                    </div>
                </Flex>
            </Commented>
        );
    }

    function EditField(props: IEditFieldProps<IEducationalInstitution>) {
        const { value: item, onChange } = props;
        const { label, comment, graduatedAt } = item;

        return (
            <Flex vertical gap="small" style={{ width: "100%" }}>
                <Flex gap="small" style={{ width: "100%" }}>
                    <FieldContainer title="Название">
                        <InputField
                            value={label}
                            onChange={(label) => onChange({ ...item, label })}
                        />
                    </FieldContainer>
                    <FieldContainer title="Год окончания">
                        <DateTimeField.Edit
                            value={graduatedAt}
                            onChange={(graduatedAt) =>
                                onChange({ ...item, graduatedAt })
                            }
                        ></DateTimeField.Edit>
                    </FieldContainer>
                </Flex>
                <Flex style={{ width: "100%" }}>
                    <FieldContainer title="Комментарий">
                        <InputField
                            value={comment}
                            onChange={(comment) =>
                                onChange({ ...item, comment })
                            }
                        />
                    </FieldContainer>
                </Flex>
            </Flex>
        );
    }

    return (
        <CombinedFieldContainer
            editModeEnabled={editModeEnabled}
            value={value}
            onChange={onChange}
            DisplayFieldType={DisplayField}
            EditFieldType={EditField}
        />
    );
}
