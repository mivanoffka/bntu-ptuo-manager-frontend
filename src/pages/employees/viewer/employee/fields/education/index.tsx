import { FieldContainer } from "@/components/containers";
import { IListedItemProps } from "@/components/listed";
import { DateTimeField } from "@/components/fields/datetime";
import { SelectField } from "@/components/fields/select";
import { TextField } from "@/components/fields/text";
import { useEnumerations } from "@/contexts/enumerations";
import { EnumerationName } from "@/contexts/enumerations/constants";
import { Flex, Form } from "antd";
import { IFieldProps } from "@/components/fields/shared";
import { SearchSource } from "@/contexts/employees/constants";
import { SearchField } from "@/components/fields/search";
import { useEmployees } from "@/contexts/employees";

export function AcademicDegreeField(props: IFieldProps) {
    const { isEditable } = props;
    const { getEnumeration } = useEnumerations();
    const academicDegrees = getEnumeration(EnumerationName.ACADEMIC_DEGREES);

    return (
        <FieldContainer title="Ученая степень">
            <Form.Item name="academicDegreeId">
                <SelectField
                    isEditable={isEditable}
                    options={academicDegrees.map((item) => ({
                        value: item.id,
                        label: item.label,
                    }))}
                ></SelectField>
            </Form.Item>
        </FieldContainer>
    );
}

export function EducationLevelField(props: IFieldProps) {
    const { isEditable } = props;
    const { getEnumeration } = useEnumerations();
    const educationLevels = getEnumeration(EnumerationName.EDUCATION_LEVELS);

    return (
        <FieldContainer title="Уровень образования">
            <Form.Item name="educationLevelId">
                <SelectField
                    isEditable={isEditable}
                    options={educationLevels.map((item) => ({
                        value: item.id,
                        label: item.label,
                    }))}
                ></SelectField>
            </Form.Item>
        </FieldContainer>
    );
}

export function EducationalInstitutionField(props: IListedItemProps) {
    const { index, isEditable } = props;
    const { searchFor } = useEmployees();

    return (
        <Flex vertical gap="small" style={{ width: "100%" }}>
            <Flex gap="small" style={{ width: "100%" }}>
                <Flex style={{ width: "75%" }}>
                    <FieldContainer title="Название">
                        <Form.Item
                            name={[index, "label"]}
                            rules={[{ required: true, message: "" }]}
                        >
                            <SearchField
                                isEditable={isEditable}
                                onSearch={(search: string | null) =>
                                    searchFor(
                                        SearchSource.EDUCATIONAL_INSTITUTIONS,
                                        search
                                    )
                                }
                            />
                        </Form.Item>
                    </FieldContainer>
                </Flex>
                <Flex style={{ width: "25%" }}>
                    <FieldContainer title="Год окончания">
                        <Form.Item
                            name={[index, "graduatedAt"]}
                            rules={[{ required: true, message: "" }]}
                        >
                            <DateTimeField
                                isEditable={isEditable}
                                format="YYYY г."
                            ></DateTimeField>
                        </Form.Item>
                    </FieldContainer>
                </Flex>
            </Flex>
            <Flex style={{ width: "100%" }}>
                <FieldContainer title="Комментарий">
                    <Form.Item name={[index, "comment"]}>
                        <TextField isEditable={isEditable}></TextField>
                    </Form.Item>
                </FieldContainer>
            </Flex>
        </Flex>
    );
}
