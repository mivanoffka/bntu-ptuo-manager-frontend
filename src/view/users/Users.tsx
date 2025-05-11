import { Flex, Segmented } from "antd";
import { Layout } from "@/view/layout/Layout";
import { EnumerationName } from "@/controller/enumerations/constants";
import { TreeName } from "@/controller/trees/constants";
import { EnumerationList } from "@/view/references/fields/EnumerationList";
import { UsersProvider, useUsers } from "@/controller/users/UsersContext";
import { UsersList } from "@/view/users/UsersList";
import { UnverifiedUserListItem } from "@/view/users/UnverifiedUserListItem";
import { UnverifiedUsersList } from "@/view/users/UnverifiedUsersList";

export function Users() {
    return (
        <UsersProvider>
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
                            <Flex
                                vertical
                                style={{
                                    width: "100%",
                                    height: "70%",
                                }}
                            >
                                <UsersList />
                            </Flex>
                            <Flex
                                vertical
                                style={{
                                    width: "100%",
                                    height: "30%",
                                }}
                            >
                                <UnverifiedUsersList />
                            </Flex>
                        </Flex>
                    </Flex>
                </Flex>
            </Layout>
        </UsersProvider>
    );
}
