import { ENUMS_REFERENCES } from "@/pages/references/constants";
import { EnumerationList } from "@/pages/references/list";
import { Layout, Flex } from "antd";

export function ReferencesPage() {
    return (
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
    );
}
