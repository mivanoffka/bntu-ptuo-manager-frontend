import { useEnumerations } from "@/contexts/enumerations";
import { useTrees } from "@/contexts/trees";
import {
    ENUMS_REFERENCES,
    TREE_REFERENCES,
} from "@/pages/references/constants";
import { EnumerationList } from "@/pages/references/list";
import { TreeList } from "@/pages/references/trees";
import { Layout, Flex } from "antd";
import { useEffect } from "react";

export function ReferencesPage() {
    const { reloadTrees } = useTrees();
    const { reloadEnumerations } = useEnumerations();

    useEffect(() => {
        reloadTrees();
        reloadEnumerations();
    }, []);

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
                    {TREE_REFERENCES.map((item) => (
                        <TreeList
                            title={item.label}
                            treeName={item.value}
                        ></TreeList>
                    ))}
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
