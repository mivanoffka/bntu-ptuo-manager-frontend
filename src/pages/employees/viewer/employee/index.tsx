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
} from "@/pages/employees/viewer/employee/fields";
import { Tabs, Flex, Divider, Form, Input } from "antd";
import { FormInstance } from "antd/lib";
import "./style.css";
import { Listed } from "@/components/listed";

const { TabPane } = Tabs;

export function Employee() {
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
                        <EmployeePhotoField />
                    </Flex>
                    <Flex
                        gap="small"
                        vertical
                        align="center"
                        justify="center"
                        style={{ width: "100%" }}
                    >
                        <FullNameField />
                        <BirthplaceField />
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
                                <BirthdateField />
                            </Flex>
                            <Flex
                                align="center"
                                justify="center"
                                style={{ width: "50%" }}
                            >
                                <GenderField />
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
                        <TabPane tab="БНТУ" key="bntu">
                            <div
                                style={{ maxHeight: "100%", overflow: "auto" }}
                            >
                                <Listed
                                    name="bntuPositions"
                                    title="Места работы"
                                    FieldType={BntuPositionField}
                                ></Listed>
                            </div>
                        </TabPane>
                        <TabPane tab="Профсоюз" key="union">
                            <Flex
                                // gap="middle"
                                vertical
                                style={{ maxHeight: "100%", overflow: "auto" }}
                            >
                                <Flex gap="small" style={{ width: "100%" }}>
                                    <TradeUnionDepartmentField />
                                    <WorkingGroupField />
                                </Flex>
                                <Divider></Divider>
                                <TradeUnionInfoField />
                            </Flex>
                        </TabPane>
                        <TabPane tab="Контакты" key="contacts">
                            <div
                                style={{ maxHeight: "100%", overflow: "auto" }}
                            >
                                <Listed
                                    name="phoneNumbers"
                                    title="Номера телефонов"
                                    FieldType={PhoneNumberField}
                                />
                                <Listed
                                    name="emails"
                                    title="Электронная почта"
                                    FieldType={EmailField}
                                />
                                <Listed
                                    name="addresses"
                                    title="Адреса проживания"
                                    FieldType={AddressField}
                                />
                            </div>
                        </TabPane>
                        <TabPane tab="Образование" key="education">
                            <Flex
                                gap="small"
                                vertical
                                style={{ maxHeight: "100%", overflow: "auto" }}
                            >
                                <Flex gap="small" style={{ width: "100%" }}>
                                    <EducationLevelField />
                                    <AcademicDegreeField />
                                </Flex>
                                <Listed
                                    name="educationalInstitutions"
                                    title="Учрежднения образования"
                                    FieldType={EducationalInstitutionField}
                                />
                            </Flex>
                        </TabPane>
                        <TabPane tab="Прочее" key="other">
                            <div
                                style={{ maxHeight: "100%", overflow: "auto" }}
                            >
                                <Listed
                                    name="relatives"
                                    title="Родственники"
                                    FieldType={RelativeField}
                                />
                                <Listed
                                    name="rewards"
                                    title="Премии"
                                    FieldType={RewardField}
                                />
                                <Listed
                                    name="comments"
                                    title="Комментарии"
                                    FieldType={CommentField}
                                />
                                {/* <RelativesList />
                                <RewardsList />
                                <CommentsList /> */}
                            </div>
                        </TabPane>
                    </Tabs>
                </Flex>
            </Flex>
        </Flex>
    );
}
