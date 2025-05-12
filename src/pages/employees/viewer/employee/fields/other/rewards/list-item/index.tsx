import { FieldContainer } from "@/components/containers/field-container";
import { DateTimeField } from "@/components/fields/datetime";
import { TextField } from "@/components/fields/text";
import { IObjectFieldProps } from "@/components/fields/types";
import { useEditMode } from "@/contexts/employees/edit-mode";
import { IReward } from "@/model";
import { Flex } from "antd";

export function RewardField(props: IObjectFieldProps<IReward>) {
    const { editModeEnabled } = useEditMode();

    const { value: item, onChange } = props;
    const { label, comment, grantedAt } = item;

    return (
        <Flex vertical gap="small" style={{ width: "100%" }}>
            <Flex gap="small" style={{ width: "100%" }}>
                <FieldContainer title="Название">
                    <TextField
                        editModeEnabled={editModeEnabled}
                        value={label}
                        onChange={(label) => onChange({ ...item, label })}
                    />
                </FieldContainer>
                <FieldContainer title="Дата присуждения">
                    <DateTimeField
                        editModeEnabled={editModeEnabled}
                        value={grantedAt}
                        onChange={(grantedAt) =>
                            onChange({ ...item, grantedAt })
                        }
                    ></DateTimeField>
                </FieldContainer>
            </Flex>
            <Flex style={{ width: "100%" }}>
                <FieldContainer title="Комментарий">
                    <TextField
                        editModeEnabled={editModeEnabled}
                        value={comment}
                        onChange={(comment) => onChange({ ...item, comment })}
                    />
                </FieldContainer>
            </Flex>
        </Flex>
    );
}
