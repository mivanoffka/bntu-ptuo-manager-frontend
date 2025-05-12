import {
    EmployeePhotoField,
    FullNameField,
    BirthplaceField,
    BirthdateField,
    GenderField,
    BntuPositionsList,
    TradeUnionDepartmentField,
    WorkingGroupField,
    TradeUnionInfoField,
    PhoneNumbersList,
    EmailsList,
    AddressesList,
    EducationalInstitutionsList,
    EducationLevelField,
    AcademicDegreeField,
    RelativesList,
    RewardsList,
    CommentsList,
} from "@/pages/employees/viewer/employee/fields";
import { Tabs, Flex, Divider } from "antd";

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
                                <BntuPositionsList />
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
                                <PhoneNumbersList />
                                <EmailsList />
                                <AddressesList />
                            </div>
                        </TabPane>
                        <TabPane tab="Образование" key="education">
                            <Flex
                                gap="small"
                                vertical
                                style={{ maxHeight: "100%", overflow: "auto" }}
                            >
                                <EducationalInstitutionsList />
                                <Flex gap="small" style={{ width: "100%" }}>
                                    <EducationLevelField />
                                    <AcademicDegreeField />
                                </Flex>
                            </Flex>
                        </TabPane>
                        <TabPane tab="Прочее" key="other">
                            <div
                                style={{ maxHeight: "100%", overflow: "auto" }}
                            >
                                <RelativesList />
                                <RewardsList />
                                <CommentsList />
                            </div>
                        </TabPane>
                    </Tabs>
                </Flex>
            </Flex>
        </Flex>
    );
}
