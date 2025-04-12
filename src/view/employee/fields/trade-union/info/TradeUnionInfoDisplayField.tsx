import { useEmployeeEditor } from "@/controller/employee";
import { FieldContainer, LabelField } from "@/view/primitives";
import { DateTimeField } from "@/view/primitives/fields";
import { Flex } from "antd";

export function TradeUnionInfoDisplayField() {
    const { getField } = useEmployeeEditor();

    const isArchived = getField<boolean>("isArchived");
    const isRetired = getField<boolean>("isRetired");

    return (
        <Flex vertical gap="small" align="center" style={{ width: "100%" }}>
            <Flex gap="small" align="center" style={{ width: "100%" }}>
                <FieldContainer title="Дата вступления">
                    <DateTimeField.Display value={getField("joinedAt")} />
                </FieldContainer>
                <FieldContainer title="Дата постановки на учёт">
                    <DateTimeField.Display value={getField("recordedAt")} />
                </FieldContainer>
            </Flex>
            <Flex gap="small" align="center" style={{ width: "100%" }}>
                <Flex gap="small" align="center" style={{ width: "50%" }}>
                    {isRetired && (
                        <FieldContainer title="Неработающий пенсионер, начиная с">
                            <Flex gap="small">
                                <DateTimeField.Display
                                    value={getField("retiredAt")}
                                />
                            </Flex>
                        </FieldContainer>
                    )}
                </Flex>
                <Flex gap="small" align="center" style={{ width: "50%" }}>
                    {isArchived && (
                        <FieldContainer title="Дата снятия с учёта">
                            <Flex gap="small">
                                <DateTimeField.Display
                                    value={getField("archivedAt")}
                                />
                            </Flex>
                        </FieldContainer>
                    )}
                </Flex>
            </Flex>
        </Flex>
    );
}
