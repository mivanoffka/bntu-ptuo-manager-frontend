import { CombinedFieldContainer } from "@/view/primitives/fields/field/CombinedField";
import { InputField } from "@/view/primitives/fields/derivatives/InputField";
import { DatePicker, Flex, Typography } from "antd";
import { IReward } from "@/model";
import { FieldContainer, SecondaryLabel } from "@/view/primitives";
import {
    IDisplayFieldProps,
    IEditFieldProps,
} from "@/view/primitives/fields/types";
import { useEditMode } from "@/controller/employee";
import dayjs from "dayjs";
import { DateTimeField } from "@/view/primitives/fields";
import { Commented } from "@/view/primitives/containers";

export function RewardField(props: IEditFieldProps<IReward>) {
    const { value, onChange } = props;
    const { editModeEnabled } = useEditMode();

    function DisplayField(props: IDisplayFieldProps<IReward>) {
        const { value: item } = props;
        const { label, comment, grantedAt } = item;

        return (
            <Commented comment={comment}>
                <Flex
                    justify="space-between"
                    gap="small"
                    style={{ width: "100%" }}
                >
                    <Typography.Text>{label}</Typography.Text>
                    <Flex>
                        {grantedAt && (
                            <SecondaryLabel>
                                {dayjs(grantedAt).format("DD.MM.YYYY")}
                            </SecondaryLabel>
                        )}
                    </Flex>
                </Flex>
            </Commented>
        );
    }

    function EditField(props: IEditFieldProps<IReward>) {
        const { value: item, onChange } = props;
        const { label, comment, grantedAt } = item;

        return (
            <Flex vertical gap="small" style={{ width: "100%" }}>
                <Flex gap="small" style={{ width: "100%" }}>
                    <FieldContainer title="Название">
                        <InputField
                            value={label}
                            onChange={(label) => onChange({ ...item, label })}
                        />
                    </FieldContainer>
                    <FieldContainer title="Дата присуждения">
                        <DateTimeField.Edit
                            value={grantedAt}
                            onChange={(grantedAt) =>
                                onChange({ ...item, grantedAt })
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
