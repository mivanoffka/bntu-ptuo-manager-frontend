import { Flex, Segmented } from "antd";
import { Layout } from "@/view/layout/Layout";
import { EnumerationName } from "@/controller/enumerations/constants";
import { TreeName } from "@/controller/trees/constants";
import { EnumerationList } from "@/view/references/fields/EnumerationList";

export interface IReferenceInfo {
    value: string;
    label: string;
    isTree: boolean;
}

export const ENUMS_REFERENCES = [
    {
        value: EnumerationName.ACADEMIC_DEGREES,
        label: "Ученая степень",
        isTree: false,
    },
    {
        value: EnumerationName.EDUCATION_LEVELS,
        label: "Образование",
        isTree: false,
    },
    {
        value: EnumerationName.WORKING_GROUPS,
        label: "Профгруппа",
        isTree: true,
    },
    {
        value: EnumerationName.GENDERS,
        label: "Пол",
        isTree: false,
    },
    {
        value: EnumerationName.PHONE_NUMBER_TYPES,
        label: "Подразделение",
        isTree: false,
    },
    {
        value: EnumerationName.RELATIVE_TYPES,
        label: "Подразделение",
        isTree: false,
    },
];

export const TREE_REFERENCES = [
    {
        value: TreeName.BNTU_DEPARTMENTS,
        label: "Структура БНТУ",
        isTree: true,
    },
    {
        value: TreeName.TRADE_UNION_DEPARTMENTS,
        label: "Структура ЦПО",
        isTree: true,
    },
];

export const REFERENCES = [...ENUMS_REFERENCES, ...TREE_REFERENCES];

export function References() {
    return (
        <Layout>
            <Flex
                align="center"
                justify="center"
                style={{
                    width: "45%",
                    height: "100%",
                    backgroundColor: "white",
                }}
            >
                <Flex
                    align="center"
                    justify="center"
                    gap="middle"
                    vertical
                    style={{
                        width: "100%",
                        height: "calc(100% - 40px)",
                        backgroundColor: "white",
                        overflowY: "auto",
                    }}
                >
                    <Flex
                        gap="middle"
                        vertical
                        style={{
                            width: "90%",
                            height: "100%",
                            backgroundColor: "white",
                        }}
                    >
                        {ENUMS_REFERENCES.map((item) => (
                            <EnumerationList
                                title={item.label}
                                enumerationName={item.value}
                            ></EnumerationList>
                        ))}
                    </Flex>
                </Flex>
            </Flex>
        </Layout>
    );
}
