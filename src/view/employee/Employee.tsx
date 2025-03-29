import { useDisplayedEmployee } from "@/controller/employee/DisplayedEmployeeContext";
import "./style/employee.css";
import { CombinedField } from "@/view/field/CombinedField";
import { Flex, Image, Typography } from "antd";
import { NameField } from "@/view/employee/fields";
import { BirthdateField } from "@/view/employee/fields/BirthdateField";
import { GenderField } from "@/view/employee/fields/GenderField";
import { NameHistory } from "@/view/employee/fields/NameHistory";
import { DropDown } from "@/view/field/DropDown";
import { BirthplaceField } from "@/view/employee/fields/BirthplaceField";
import { EmailsList } from "@/view/employee/fields/EmailsList";

export function DisplayedEmployee() {
    const { displayedEmployee } = useDisplayedEmployee();

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
                <DropDown title="Контакты">
                    <Flex
                        vertical
                        align="center"
                        justify="center"
                        style={{ width: "90%" }}
                    >
                        <EmailsList></EmailsList>
                        <DropDown title="Номера телефонов"></DropDown>
                        <DropDown title="Адреса"></DropDown>
                    </Flex>
                </DropDown>
                <DropDown title="БНТУ"></DropDown>
            </Flex>
        </Flex>
    );
}
