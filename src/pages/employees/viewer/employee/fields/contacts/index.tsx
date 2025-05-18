import { FieldContainer } from "@/components/containers/field-container";
import { IListedItemProps } from "@/components/listed";
import { useEnumerations } from "@/contexts/enumerations";
import { EnumerationName } from "@/contexts/enumerations/constants";
import { Flex, Input, Select } from "antd";

export function AddressField(props: IListedItemProps) {
    const { index } = props;

    return (
        <Flex gap="small" style={{ width: "100%" }}>
            <FieldContainer title="Адрес" name={[index, "value"]}>
                <Input></Input>
            </FieldContainer>
            <FieldContainer title="Комментарий" name={[index, "comment"]}>
                <Input></Input>
            </FieldContainer>
        </Flex>
    );
}

export function EmailField(props: IListedItemProps) {
    const { index } = props;

    return (
        <Flex gap="small" style={{ width: "100%" }}>
            <FieldContainer title="Адрес" name={[index, "value"]}>
                <Input></Input>
            </FieldContainer>
            <FieldContainer title="Комментарий" name={[index, "comment"]}>
                <Input></Input>
            </FieldContainer>
        </Flex>
    );
}

export function PhoneNumberField(props: IListedItemProps) {
    const { index } = props;
    const { getEnumeration } = useEnumerations();

    const phoneNumberTypes = getEnumeration(EnumerationName.PHONE_NUMBER_TYPES);

    return (
        <Flex gap="small" style={{ width: "100%" }}>
            <FieldContainer title="Номер" name={[index, "value"]}>
                <Input allowClear></Input>
            </FieldContainer>
            <FieldContainer title="Тип" name={[index, "phoneNumberType"]}>
                <Select
                    style={{ textAlign: "left", width: "100%" }}
                    placeholder="Выберите пол"
                    options={phoneNumberTypes.map((item) => ({
                        value: item.id,
                        label: item.label,
                    }))}
                    allowClear
                />
            </FieldContainer>
            <FieldContainer title="Комментарий" name={[index, "comment"]}>
                <Input allowClear></Input>
            </FieldContainer>
        </Flex>
    );
}
