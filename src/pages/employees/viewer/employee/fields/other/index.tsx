import { FieldContainer } from "@/components/containers";
import { IListedItemProps } from "@/components/listed";
import { useEnumerations } from "@/contexts/enumerations";
import { EnumerationName } from "@/contexts/enumerations/constants";
import { DatePicker, Flex, Input, Select } from "antd";
import dayjs from "dayjs";

export function CommentField(props: IListedItemProps) {
    const { index } = props;

    return (
        <Flex gap="small" style={{ width: "100%" }}>
            <FieldContainer
                title="Комментарий"
                name={[index, "value"]}
                rules={[{ required: true, message: "" }]}
            >
                <Input></Input>
            </FieldContainer>
        </Flex>
    );
}

export function RewardField(props: IListedItemProps) {
    const { index } = props;

    return (
        <Flex vertical gap="small" style={{ width: "100%" }}>
            <Flex gap="small" style={{ width: "100%" }}>
                <FieldContainer
                    title="Название"
                    name={[index, "label"]}
                    rules={[{ required: true, message: "" }]}
                >
                    <Input allowClear></Input>
                </FieldContainer>
                <FieldContainer
                    title="Дата присуждения"
                    name={[index, "grantedAt"]}
                    rules={[{ required: true, message: "" }]}
                >
                    <DatePicker
                        allowClear
                        format="DD MMMM YYYY"
                        style={{ width: "100%" }}
                    />
                </FieldContainer>
            </Flex>
            <Flex style={{ width: "100%" }}>
                <FieldContainer title="Комментарий" name={[index, "comment"]}>
                    <Input allowClear></Input>
                </FieldContainer>
            </Flex>
        </Flex>
    );
}

export function RelativeField(props: IListedItemProps) {
    const { index } = props;
    const { getEnumeration } = useEnumerations();

    const relativeTypes = getEnumeration(EnumerationName.RELATIVE_TYPES);

    return (
        <Flex vertical gap="small" style={{ width: "100%" }}>
            <Flex justify="space-between" gap="small" style={{ width: "100%" }}>
                <FieldContainer
                    title="ФИО"
                    name={[index, "fullName"]}
                    rules={[{ required: true, message: "" }]}
                >
                    <Input allowClear></Input>
                </FieldContainer>
            </Flex>
            <Flex justify="space-between" gap="small" style={{ width: "100%" }}>
                <FieldContainer
                    title="Дата рождения"
                    name={[index, "birthdate"]}
                    rules={[{ required: true, message: "" }]}
                    normalize={(value?: dayjs.Dayjs) => value?.toISOString()}
                >
                    <DatePicker
                        allowClear
                        format="DD MMMM YYYY"
                        style={{ width: "100%" }}
                    />
                </FieldContainer>
                <FieldContainer
                    title="Родство"
                    name={[index, "relativeTypeId"]}
                    rules={[{ required: true, message: "" }]}
                >
                    <Select
                        style={{ textAlign: "left", width: "100%" }}
                        placeholder=""
                        options={relativeTypes.map((item) => ({
                            value: item.id,
                            label: item.label,
                        }))}
                        allowClear
                    />
                </FieldContainer>
            </Flex>
            <Flex style={{ width: "100%" }}>
                <FieldContainer title="Комментарий" name={[index, "comment"]}>
                    <Input allowClear></Input>
                </FieldContainer>
            </Flex>
        </Flex>
    );
}
