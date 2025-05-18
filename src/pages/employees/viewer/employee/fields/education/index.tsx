import { FieldContainer } from "@/components/containers/field-container";
import { IListedItemProps } from "@/components/listed";
import { useEnumerations } from "@/contexts/enumerations";
import { EnumerationName } from "@/contexts/enumerations/constants";
import { DatePicker, Flex, Input, Select } from "antd";
import dayjs from "dayjs";

export function AcademicDegreeField() {
    const { getEnumeration } = useEnumerations();

    const academicDegrees = getEnumeration(EnumerationName.ACADEMIC_DEGREES);

    return (
        <FieldContainer
            title="Ученая степень"
            name="academicDegreeId"
            rules={[{ required: true, message: "" }]}
        >
            <Select
                style={{ textAlign: "left", width: "100%" }}
                placeholder=""
                options={academicDegrees.map((item) => ({
                    value: item.id,
                    label: item.label,
                }))}
                allowClear
            />
        </FieldContainer>
    );
}

export function EducationLevelField() {
    const { getEnumeration } = useEnumerations();

    const educationLevels = getEnumeration(EnumerationName.EDUCATION_LEVELS);

    return (
        <FieldContainer
            title="Уровень образования"
            name="educationLevelId"
            rules={[{ required: true, message: "" }]}
        >
            <Select
                style={{ textAlign: "left", width: "100%" }}
                placeholder=""
                options={educationLevels.map((item) => ({
                    value: item.id,
                    label: item.label,
                }))}
                allowClear
            />
        </FieldContainer>
    );
}

export function EducationalInstitutionField(props: IListedItemProps) {
    const { index } = props;

    return (
        <Flex vertical gap="small" style={{ width: "100%" }}>
            <Flex gap="small" style={{ width: "100%" }}>
                <Flex style={{ width: "75%" }}>
                    <FieldContainer
                        title="Название"
                        name={[index, "label"]}
                        rules={[{ required: true, message: "" }]}
                    >
                        <Input allowClear></Input>
                    </FieldContainer>
                </Flex>
                <Flex style={{ width: "25%" }}>
                    <FieldContainer
                        title="Год окончания"
                        name={[index, "graduatedAt"]}
                        rules={[{ required: true, message: "" }]}
                    >
                        <DatePicker
                            allowClear
                            format="YYYY"
                            style={{ width: "100%" }}
                        />
                    </FieldContainer>
                </Flex>
            </Flex>
            <Flex style={{ width: "100%" }}>
                <FieldContainer title="Комментарий" name={[index, "comment"]}>
                    <Input allowClear></Input>
                </FieldContainer>
            </Flex>
        </Flex>
    );
}
