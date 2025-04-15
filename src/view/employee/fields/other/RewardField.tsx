import { InputField } from "@/view/primitives/fields/derivatives/InputField";
import { Flex } from "antd";
import { IReward } from "@/model";
import { FieldContainer } from "@/view/primitives";

import { useEditMode } from "@/controller/employee";
import { DateTimeField, IObjectFieldProps } from "@/view/primitives/fields";

export function RewardField(props: IObjectFieldProps<IReward>) {
    const { editModeEnabled } = useEditMode();

    const { value: item, onChange } = props;
    const { label, comment, grantedAt } = item;

    return (
        <Flex vertical gap="small" style={{ width: "100%" }}>
            <Flex gap="small" style={{ width: "100%" }}>
                <FieldContainer title="Название">
                    <InputField
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
                    <InputField
                        editModeEnabled={editModeEnabled}
                        value={comment}
                        onChange={(comment) => onChange({ ...item, comment })}
                    />
                </FieldContainer>
            </Flex>
        </Flex>
    );
}
