import { CombinedFieldContainer } from "@/view/primitives/fields/field/CombinedField";
import { InputField } from "@/view/primitives/fields/derivatives/InputField";
import { DatePicker, Flex, Typography } from "antd";
import { IRelative } from "@/model";
import {
    FieldContainer,
    SecondaryLabel,
    LabelField,
    SelectField,
} from "@/view/primitives";
import {
    IDisplayFieldProps,
    IEditFieldProps,
} from "@/view/primitives/fields/types";
import { useEditMode } from "@/controller/employee";
import {
    EnumerationName,
    useEnumerations,
} from "@/controller/enumerations/EnumerationsContext";
import dayjs from "dayjs";
import { DateTimeField } from "@/view/primitives/fields";
import { Commented } from "@/view/primitives/containers";

export function RelativeField(props: IEditFieldProps<IRelative>) {
    const { value, onChange } = props;
    const { editModeEnabled } = useEditMode();
    const { getEnumeration } = useEnumerations();

    const relativeTypes = getEnumeration(EnumerationName.RELATIVE_TYPES);

    function DisplayField(props: IDisplayFieldProps<IRelative>) {
        const { value: item } = props;
        const { fullName, birthdate, relativeTypeId, comment } = item;

        return (
            <Commented comment={comment}>
                <Flex vertical gap="middle" style={{ width: "100%" }}>
                    <Flex
                        justify="space-between"
                        gap="small"
                        style={{ width: "100%" }}
                    >
                        <LabelField value={fullName} />
                        <Flex gap="large">
                            {birthdate && (
                                <SecondaryLabel>
                                    род. {dayjs(birthdate).format("DD.MM.YYYY")}
                                </SecondaryLabel>
                            )}
                            <SecondaryLabel>
                                <SelectField.Display
                                    enumeration={relativeTypes}
                                    selectedId={relativeTypeId}
                                />
                            </SecondaryLabel>
                        </Flex>
                    </Flex>
                </Flex>
            </Commented>
        );
    }

    function EditField(props: IEditFieldProps<IRelative>) {
        const { value: item, onChange } = props;
        const { fullName, birthdate, relativeTypeId, comment } = item;

        return (
            <Flex vertical gap="middle" style={{ width: "100%" }}>
                <Flex
                    justify="space-between"
                    gap="small"
                    style={{ width: "100%" }}
                >
                    <FieldContainer title="ФИО">
                        <InputField
                            value={fullName}
                            onChange={(fullName) =>
                                onChange({
                                    ...item,
                                    fullName: fullName ? fullName : "",
                                })
                            }
                        />
                    </FieldContainer>
                </Flex>
                <Flex
                    justify="space-between"
                    gap="small"
                    style={{ width: "100%" }}
                >
                    <FieldContainer title="Дата рождения">
                        <DateTimeField.Edit
                            value={birthdate}
                            onChange={(birthdate) =>
                                onChange({ ...item, birthdate })
                            }
                        ></DateTimeField.Edit>
                    </FieldContainer>
                    <FieldContainer title="Родство">
                        <SelectField.Edit
                            onChange={(relativeTypeId) =>
                                onChange({ ...item, relativeTypeId })
                            }
                            selectedId={relativeTypeId}
                            enumeration={relativeTypes}
                        />
                    </FieldContainer>
                </Flex>
                <Flex
                    justify="space-between"
                    gap="small"
                    style={{ width: "100%" }}
                >
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
