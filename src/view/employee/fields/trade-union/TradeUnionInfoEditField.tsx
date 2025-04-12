import { useEditMode, useEmployeeEditor } from "@/controller/employee";
import { FieldContainer } from "@/view/primitives";
import { DateTimeField } from "@/view/primitives/fields";
import { Checkbox, CheckboxChangeEvent, Flex } from "antd";

export function TradeUnionInfoEditField() {
    const { getField, updateField } = useEmployeeEditor();

    const isArchived = getField<boolean>("isArchived");
    const isRetired = getField<boolean>("isRetired");

    function onChangeIsArchived(e: CheckboxChangeEvent) {
        const value = e.target.checked;

        if (!value) {
            updateField("archivedAt", null);
        } else {
            updateField("archivedAt", new Date());
        }

        updateField("isArchived", value);
    }

    function onChangeIsRetired(e: CheckboxChangeEvent) {
        const value = e.target.checked;

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
                    <DateTimeField.Edit
                        value={getField("joinedAt")}
                        onChange={(joinedAt) =>
                            updateField("joinedAt", joinedAt)
                        }
                    />
                </FieldContainer>
                <FieldContainer title="Дата постановки на учёт">
                    <DateTimeField.Edit
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
                                <Checkbox
                                    checked={isRetired}
                                    onChange={onChangeIsRetired}
                                ></Checkbox>
                                <DateTimeField.Edit
                                    value={getField("retiredAt")}
                                    onChange={(retiredAt) =>
                                        updateField("retiredAt", retiredAt)
                                    }
                                />
                            </Flex>
                        </FieldContainer>
                    ) : (
                        <Checkbox
                            checked={isRetired}
                            onChange={onChangeIsRetired}
                        >
                            Неработающий пенсионер
                        </Checkbox>
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
                                <Checkbox
                                    checked={isArchived}
                                    onChange={onChangeIsArchived}
                                ></Checkbox>
                                <DateTimeField.Edit
                                    value={getField("archivedAt")}
                                    onChange={(archivedAt) =>
                                        updateField("archivedAt", archivedAt)
                                    }
                                />
                            </Flex>
                        </FieldContainer>
                    ) : (
                        <Checkbox
                            checked={isArchived}
                            onChange={onChangeIsArchived}
                        >
                            Снят(а) с учёта
                        </Checkbox>
                    )}
                </Flex>
            </Flex>
        </Flex>
    );
}
