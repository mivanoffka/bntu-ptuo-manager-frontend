import { FieldContainer } from "@/components/containers";
import {
    EmployeePhotoField,
    FullNameField,
    BirthplaceField,
    BirthdateField,
    GenderField,
    TradeUnionDepartmentField,
    WorkingGroupField,
    PhoneNumberField,
    EmailField,
    AddressField,
    EducationalInstitutionField,
    EducationLevelField,
    AcademicDegreeField,
    RelativeField,
    RewardField,
    CommentField,
    BntuPositionField,
    TradeUnionInfoField,
    TradeUnionMembershipNumberField,
    ExemptionsField,
} from "@/pages/employees/viewer/employee/fields";
import { Tabs, Flex, Divider, Form, Input } from "antd";
import { FormInstance } from "antd/lib";
import "./style.css";
import { Listed } from "@/components/listed";
import { useEditMode } from "@/contexts/employees/edit-mode";

const { TabPane } = Tabs;

export function Employee() {
    const { editModeEnabled: isEditable } = useEditMode();

    return (
        <Flex
            vertical
            align="center"
            justify="center"
            style={{ width: "100%", height: "100%", overflow: "auto" }}
        >
            <Flex
                vertical
                gap="middle"
                align="center"
                justify="start"
                style={{ width: "75%", height: "95%" }}
            >
                <Flex
                    align="center"
                    justify="space-evenly"
                    style={{ width: "90%" }}
                    gap="large"
                >
                    <Flex
                        align="center"
                        justify="center"
                        style={{ width: "200px" }}
                    >
                        <EmployeePhotoField isEditable={isEditable} />
                    </Flex>
                    <Flex
                        gap="small"
                        vertical
                        align="center"
                        justify="center"
                        style={{ width: "100%" }}
                    >
                        <FullNameField isEditable={isEditable} />
                        <BirthplaceField isEditable={isEditable} />
                        <Flex
                            align="center"
                            justify="center"
                            style={{ width: "100%" }}
                            gap="small"
                        >
                            <Flex
                                align="center"
                                justify="center"
                                style={{ width: "50%" }}
                            >
                                <BirthdateField isEditable={isEditable} />
                            </Flex>
                            <Flex
                                align="center"
                                justify="center"
                                style={{ width: "50%" }}
                            >
                                <GenderField isEditable={isEditable} />
                            </Flex>
                        </Flex>
                    </Flex>
                </Flex>

                <Flex
                    vertical
                    align="start"
                    justify="center"
                    style={{
                        width: "100%",
                        height: "100%",
                    }}
                >
                    <Tabs
                        centered
                        style={{ width: "100%", height: "100%" }}
                        defaultActiveKey="bntu"
                    >
                        <TabPane tab="БНТУ" key="bntu" forceRender>
                            <div
                                style={{ maxHeight: "100%", overflow: "auto" }}
                            >
                                <Listed
                                    isEditable={isEditable}
                                    name="bntuPositions"
                                    title="Места работы"
                                    FieldType={BntuPositionField}
                                ></Listed>
                            </div>
                        </TabPane>
                        <TabPane tab="Профсоюз" key="union" forceRender>
                            <Flex
                                // gap="middle"
                                vertical
                                style={{ maxHeight: "100%", overflow: "auto" }}
                            >
                                <Flex gap="small" style={{ width: "100%" }}>
                                    <TradeUnionMembershipNumberField
                                        isEditable={isEditable}
                                    />
                                    <TradeUnionDepartmentField
                                        isEditable={isEditable}
                                    />
                                    <WorkingGroupField
                                        isEditable={isEditable}
                                    />
                                </Flex>

                                <Divider></Divider>
                                <TradeUnionInfoField isEditable={isEditable} />
                            </Flex>
                        </TabPane>
                        <TabPane tab="Контакты" key="contacts" forceRender>
                            <div
                                style={{ maxHeight: "100%", overflow: "auto" }}
                            >
                                <Listed
                                    isEditable={isEditable}
                                    name="phoneNumbers"
                                    title="Номера телефонов"
                                    FieldType={PhoneNumberField}
                                />
                                <Listed
                                    isEditable={isEditable}
                                    name="emails"
                                    title="Электронная почта"
                                    FieldType={EmailField}
                                />
                                <Listed
                                    isEditable={isEditable}
                                    name="addresses"
                                    title="Адреса проживания"
                                    FieldType={AddressField}
                                />
                            </div>
                        </TabPane>
                        <TabPane tab="Образование" key="education" forceRender>
                            <Flex
                                gap="small"
                                vertical
                                style={{ maxHeight: "100%", overflow: "auto" }}
                            >
                                <Flex gap="small" style={{ width: "100%" }}>
                                    <EducationLevelField
                                        isEditable={isEditable}
                                    />
                                    <AcademicDegreeField
                                        isEditable={isEditable}
                                    />
                                </Flex>
                                <Listed
                                    isEditable={isEditable}
                                    name="educationalInstitutions"
                                    title="Учреждения образования"
                                    FieldType={EducationalInstitutionField}
                                />
                            </Flex>
                        </TabPane>
                        <TabPane tab="Прочее" key="other" forceRender>
                            <div
                                style={{ maxHeight: "100%", overflow: "auto" }}
                            >
                                <ExemptionsField
                                    index={0}
                                    isEditable={isEditable}
                                ></ExemptionsField>
                                <Listed
                                    isEditable={isEditable}
                                    name="relatives"
                                    title="Родственники"
                                    FieldType={RelativeField}
                                />
                                <Listed
                                    isEditable={isEditable}
                                    name="rewards"
                                    title="Награды"
                                    FieldType={RewardField}
                                />
                                <Listed
                                    isEditable={isEditable}
                                    name="comments"
                                    title="Комментарии"
                                    FieldType={CommentField}
                                />
                            </div>
                        </TabPane>
                    </Tabs>
                </Flex>
            </Flex>
        </Flex>
    );
}
