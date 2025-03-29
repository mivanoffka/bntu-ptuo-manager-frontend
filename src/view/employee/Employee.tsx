import { Flex, Image } from "antd";

import {
    NameField,
    PhoneNumbersList,
    EmailsList,
    AddressesList,
    BirthplaceField,
    BirthdateField,
    GenderField,
    CommentsList,
    RelativesList,
} from "@/view/employee/fields";

import { Expandable } from "@/view/primitives";

import "./style/employee.css";
import { RewardsList } from "@/view/employee/fields/other";

export function Employee() {
    return (
        <Flex
            vertical
            gap="middle"
            align="center"
            justify="center"
            style={{ width: "100%" }}
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
                    <NameField></NameField>
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
                <Expandable title="Контакты">
                    <PhoneNumbersList></PhoneNumbersList>
                    <EmailsList></EmailsList>
                    <AddressesList></AddressesList>
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
