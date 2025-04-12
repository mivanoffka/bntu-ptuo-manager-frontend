import { Flex, Image } from "antd";

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

import { Expandable } from "@/view/primitives";

import "./style/employee.css";
import { RewardsList } from "@/view/employee/fields/other";
import { BntuPositionsList } from "@/view/employee/fields/bntu/BntuPositionsList";
import { TradeUnionInfoField } from "@/view/employee/fields/trade-union/TradeUnionInfoField";

export function Employee() {
    return (
        <Flex
            vertical
            gap="middle"
            align="center"
            justify="start"
            style={{ width: "100%", height: "100%" }}
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
                    <Image style={{ width: "150px", height: "150px" }}></Image>
                </Flex>
                <Flex
                    gap="small"
                    vertical
                    align="center"
                    justify="center"
                    style={{ width: "100%" }}
                >
                    <NamesField></NamesField>
                    <BirthplaceField></BirthplaceField>

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
                            <BirthdateField></BirthdateField>
                        </Flex>
                        <Flex
                            align="center"
                            justify="center"
                            style={{ width: "50%" }}
                        >
                            <GenderField></GenderField>
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
            <Flex
                vertical
                align="center"
                justify="center"
                style={{ width: "100%" }}
            >
                <Expandable title="БНТУ">
                    <BntuPositionsList></BntuPositionsList>
                </Expandable>
                <Expandable title="Профсоюз">
                    <TradeUnionInfoField></TradeUnionInfoField>
                </Expandable>
                <Expandable title="Контакты">
                    <PhoneNumbersList></PhoneNumbersList>
                    <EmailsList></EmailsList>
                    <AddressesList></AddressesList>
                </Expandable>
                <Expandable title="Образование">
                    <Flex gap="small" style={{ width: "100%" }}>
                        <EducationLevelField></EducationLevelField>
                        <AcademicDegreeField></AcademicDegreeField>
                    </Flex>
                    <EducationalInstitutionsList></EducationalInstitutionsList>
                </Expandable>
                <Expandable title="Прочее">
                    <RelativesList></RelativesList>
                    <RewardsList></RewardsList>
                    <CommentsList></CommentsList>
                </Expandable>
            </Flex>
        </Flex>
    );
}
