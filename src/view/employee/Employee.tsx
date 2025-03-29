import { Flex, Image } from "antd";

import {
    NameField,
    PhoneNumbersList,
    EmailsList,
    AddressesList,
    BirthplaceField,
    BirthdateField,
    GenderField,
} from "@/view/employee/fields";

import { Expandable } from "@/view/primitives";

import "./style/employee.css";

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
                style={{ width: "100%" }}
            >
                <Flex align="center" justify="center" style={{ width: "50%" }}>
                    <Image style={{ width: "150px", height: "150px" }}></Image>
                </Flex>
                <Flex
                    gap="small"
                    vertical
                    align="center"
                    justify="center"
                    style={{ width: "50%" }}
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
                style={{ width: "90%" }}
            >
                <Expandable title="Контакты">
                    <Flex
                        vertical
                        align="center"
                        justify="center"
                        style={{ width: "90%" }}
                    >
                        <PhoneNumbersList></PhoneNumbersList>
                        <EmailsList></EmailsList>
                        <AddressesList></AddressesList>
                    </Flex>
                </Expandable>
                <Expandable title="БНТУ"></Expandable>
            </Flex>
        </Flex>
    );
}
