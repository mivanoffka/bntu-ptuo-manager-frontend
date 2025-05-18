import { FieldContainer } from "@/components/containers";
import { useEnumerations } from "@/contexts/enumerations";
import { EnumerationName } from "@/contexts/enumerations/constants";
import { DatePicker, Flex, Input, Select } from "antd";

export function BirthdateField() {
    return (
        <FieldContainer
            title="Дата рождения"
            name="birthdate"
            rules={[{ required: true, message: "" }]}
        >
            <DatePicker
                allowClear
                format="DD MMMM YYYY"
                style={{ width: "100%" }}
            />
        </FieldContainer>
    );
}

export function BirthplaceField() {
    return (
        <FieldContainer
            title="Место рождения"
            name="birthplace"
            rules={[
                {
                    required: true,
                    message: "",
                },
            ]}
        >
            <Input></Input>
        </FieldContainer>
    );
}

export function FullNameField() {
    return (
        <Flex gap="small" style={{ width: "100%" }}>
            <FieldContainer
                title="Фамилия"
                name="lastName"
                rules={[{ required: true, message: "" }]}
            >
                <Input allowClear></Input>
            </FieldContainer>
            <FieldContainer
                title="Имя"
                name="firstName"
                rules={[{ required: true, message: "" }]}
            >
                <Input allowClear></Input>
            </FieldContainer>
            <FieldContainer title="Отчество" name="middleName">
                <Input allowClear></Input>
            </FieldContainer>
        </Flex>
    );
}

export function GenderField() {
    const { getEnumeration } = useEnumerations();
    const genders = getEnumeration(EnumerationName.GENDERS);

    return (
        <FieldContainer
            title="Пол"
            name="genderId"
            rules={[{ required: true, message: "" }]}
        >
            <Select
                style={{ textAlign: "left", width: "100%" }}
                placeholder="Выберите пол"
                options={genders.map((item) => ({
                    value: item.id,
                    label: item.label,
                }))}
                allowClear
            />
        </FieldContainer>
    );
}
