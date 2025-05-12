import { UsersProvider } from "@/contexts/users";
import { UnverifiedUsersList } from "@/pages/users/lists/unverified-users";
import { UsersList } from "@/pages/users/lists/verified-users";
import { Layout, Flex } from "antd";

export function UsersPage() {
    return (
        <UsersProvider>
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
        </UsersProvider>
    );
}
