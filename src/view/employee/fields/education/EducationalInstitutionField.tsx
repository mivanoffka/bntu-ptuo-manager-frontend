import { InputField } from "@/view/primitives/fields/derivatives/InputField";
import { Flex, Typography } from "antd";
import { IEducationalInstitution } from "@/model";
import { FieldContainer, SecondaryLabel } from "@/view/primitives";
import { useEditMode } from "@/controller/employee";
import { DateTimeField, IObjectFieldProps } from "@/view/primitives/fields";

export function EducationalInstitutionField(
    props: IObjectFieldProps<IEducationalInstitution>
) {
    const { value: item, onChange } = props;
    const { editModeEnabled } = useEditMode();

    return (
        <Flex vertical gap="small" style={{ width: "100%" }}>
            <Flex gap="small" style={{ width: "100%" }}>
                <FieldContainer title="Название">
                    <InputField
                        editModeEnabled={editModeEnabled}
                        value={item.label}
                        onChange={(label) => onChange({ ...item, label })}
                    />
                </FieldContainer>
                <FieldContainer title="Год окончания">
                    <DateTimeField
                        editModeEnabled={editModeEnabled}
                        value={item.graduatedAt}
                        onChange={(graduatedAt) =>
                            onChange({ ...item, graduatedAt })
                        }
                    ></DateTimeField>
                </FieldContainer>
            </Flex>
            <Flex style={{ width: "100%" }}>
                {/* <FieldContainer title="Комментарий"> */}
                <InputField
                    placeholder="Без комментариев"
                    editModeEnabled={editModeEnabled}
                    value={item.comment}
                    onChange={(comment) => onChange({ ...item, comment })}
                />
                {/* </FieldContainer> */}
            </Flex>
        </Flex>
    );
}
