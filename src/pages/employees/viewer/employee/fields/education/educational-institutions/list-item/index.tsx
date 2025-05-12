import { FieldContainer } from "@/components/containers/field-container";
import { DateTimeField } from "@/components/fields/datetime";
import { TextField } from "@/components/fields/text";
import { IObjectFieldProps } from "@/components/fields/types";
import { useEditMode } from "@/contexts/employees/edit-mode";
import { IEducationalInstitution } from "@/model";
import { Flex } from "antd";

export function EducationalInstitutionField(
    props: IObjectFieldProps<IEducationalInstitution>
) {
    const { value: item, onChange } = props;
    const { editModeEnabled } = useEditMode();

    return (
        <Flex vertical gap="small" style={{ width: "100%" }}>
            <Flex gap="small" style={{ width: "100%" }}>
                <FieldContainer title="Название">
                    <TextField
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
                <TextField
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
