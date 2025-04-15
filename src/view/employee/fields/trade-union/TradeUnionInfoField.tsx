import { useEditMode, useEmployeeEditor } from "@/controller/employee";
import { FieldContainer } from "@/view/primitives";
import { DateTimeField } from "@/view/primitives/fields";
import { BooleanField } from "@/view/primitives/fields/derivatives/BooleanField";
import { Checkbox, CheckboxChangeEvent, Flex } from "antd";

export function TradeUnionInfoField() {
    const { getField, updateField } = useEmployeeEditor();

    const isArchived = getField<boolean>("isArchived");
    const isRetired = getField<boolean>("isRetired");

    const { editModeEnabled } = useEditMode();

    function onChangeIsArchived(value: boolean) {
        if (!value) {
            updateField("archivedAt", null);
        } else {
            updateField("archivedAt", new Date());
        }

        updateField("isArchived", value);
    }

    function onChangeIsRetired(value: boolean) {
        if (!value) {
            updateField("retiredAt", null);
        } else {
            updateField("retiredAt", new Date());
        }

        updateField("isRetired", value);
    }

    return (
        <Flex vertical gap="small" align="center" style={{ width: "100%" }}>
            <Flex gap="small" align="center" style={{ width: "100%" }}>
                <FieldContainer title="Дата вступления">
                    <DateTimeField
                        editModeEnabled={editModeEnabled}
                        value={getField("joinedAt")}
                        onChange={(joinedAt) =>
                            updateField("joinedAt", joinedAt)
                        }
                    />
                </FieldContainer>
                <FieldContainer title="Дата постановки на учёт">
                    <DateTimeField
                        editModeEnabled={editModeEnabled}
                        value={getField("recordedAt")}
                        onChange={(recordedAt) =>
                            updateField("recordedAt", recordedAt)
                        }
                    />
                </FieldContainer>
            </Flex>

            <Flex gap="small" align="end" style={{ width: "100%" }}>
                <Flex style={{ width: "50%" }}>
                    {isRetired ? (
                        <FieldContainer title="Неработающий пенсионер, начиная с">
                            <Flex
                                align="center"
                                gap="small"
                                justify="center"
                                style={{ width: "100%" }}
                            >
                                <BooleanField
                                    editModeEnabled={editModeEnabled}
                                    value={isRetired}
                                    onChange={onChangeIsRetired}
                                >
                                    <DateTimeField
                                        editModeEnabled={editModeEnabled}
                                        value={getField("retiredAt")}
                                        onChange={(retiredAt) =>
                                            updateField("retiredAt", retiredAt)
                                        }
                                    />
                                </BooleanField>
                            </Flex>
                        </FieldContainer>
                    ) : (
                        <BooleanField
                            editModeEnabled={editModeEnabled}
                            value={isRetired || false}
                            onChange={onChangeIsRetired}
                        >
                            Неработающий пенсионер
                        </BooleanField>
                    )}
                </Flex>

                <Flex style={{ width: "50%" }}>
                    {isArchived ? (
                        <FieldContainer title="Дата снятия с учёта">
                            <Flex
                                align="center"
                                gap="small"
                                justify="center"
                                style={{ width: "100%" }}
                            >
                                <BooleanField
                                    editModeEnabled={editModeEnabled}
                                    value={isArchived}
                                    onChange={onChangeIsArchived}
                                ></BooleanField>
                                <DateTimeField
                                    editModeEnabled={editModeEnabled}
                                    value={getField("archivedAt")}
                                    onChange={(archivedAt) =>
                                        updateField("archivedAt", archivedAt)
                                    }
                                />
                            </Flex>
                        </FieldContainer>
                    ) : (
                        <BooleanField
                            editModeEnabled={editModeEnabled}
                            value={isArchived ?? false}
                            onChange={onChangeIsArchived}
                        >
                            Снят(а) с учёта
                        </BooleanField>
                    )}
                </Flex>
            </Flex>
        </Flex>
    );
}
