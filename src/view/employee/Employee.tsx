import { useDisplayedEmployee } from "@/controller/employee/DisplayedEmployeeContext";
import "./style/employee.css";
import { CombinedField } from "@/view/field/CombinedField";
import { Flex, Image, Typography } from "antd";
import { NameField } from "@/view/employee/fields";
import { BirthdateField } from "@/view/employee/fields/BirthdateField";
import { BirthplaceField } from "@/view/employee/fields/BirthplaceField";
import { GenderField } from "@/view/employee/fields/GenderField";
import { NameHistory } from "@/view/employee/fields/NameHistory";

export function DisplayedEmployee() {
    const { displayedEmployee } = useDisplayedEmployee();

    return (
        <Flex
            vertical
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
        </Flex>
    );
}
