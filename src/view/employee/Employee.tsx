import { Divider, Flex, Image, Tabs } from "antd";
import {
    NamesField,
    PhoneNumbersList,
    EmailsList,
    AddressesList,
    BirthplaceField,
    BirthdateField,
    GenderField,
    CommentsList,
    RelativesList,
    EducationalInstitutionsList,
    EducationLevelField,
    AcademicDegreeField,
} from "@/view/employee/fields";

import "./style/employee.css";
import { RewardsList } from "@/view/employee/fields/other";
import { BntuPositionsList } from "@/view/employee/fields/bntu/BntuPositionsList";
import { TradeUnionInfoField } from "@/view/employee/fields/trade-union/TradeUnionInfoField";

import { WorkingGroupHistory } from "@/view/employee/fields/trade-union/WorkingGroupHistoryField";
import { TradeUnionDepartmentHistory } from "@/view/employee/fields/trade-union/TradeUnionDepartmentHistory";

const { TabPane } = Tabs;

export function Employee() {
    return (
        <Flex
            vertical
            gap="middle"
            align="center"
            justify="start"
            style={{ width: "75%", height: "75%" }}
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
                    <Image style={{ width: "150px", height: "150px" }} />
                </Flex>
                <Flex
                    gap="small"
                    vertical
                    align="center"
                    justify="center"
                    style={{ width: "100%" }}
                >
                    <NamesField />
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
                    style={{ width: "100%", height: "100%" }}
                    defaultActiveKey="bntu"
                >
                    <TabPane tab="БНТУ" key="bntu">
                        <div style={{ maxHeight: "100%", overflow: "auto" }}>
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
                                <TradeUnionDepartmentHistory />
                                <WorkingGroupHistory />
                            </Flex>
                            <Divider></Divider>
                            <TradeUnionInfoField />
                        </Flex>
                    </TabPane>
                    <TabPane tab="Контакты" key="contacts">
                        <div style={{ maxHeight: "100%", overflow: "auto" }}>
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
                        <div style={{ maxHeight: "100%", overflow: "auto" }}>
                            <RelativesList />
                            <RewardsList />
                            <CommentsList />
                        </div>
                    </TabPane>
                </Tabs>
            </Flex>
        </Flex>
    );
}
