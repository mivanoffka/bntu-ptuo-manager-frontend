import { SelectableList } from "@/view/list/SelectableList";
import { useState } from "react";
import { Flex } from "antd";
import { SecondaryLabel } from "@/view/primitives";
import { useUsers } from "@/controller/users/UsersContext";
import { UsersListItem } from "@/view/users/UsersListItem";
import { UnverifiedUserListItem } from "@/view/users/UnverifiedUserListItem";

export function UnverifiedUsersList() {
    const { unverifiedUsers } = useUsers();

    return (
        <Flex vertical style={{ width: "100%", height: "100%" }}>
            <Flex>
                <SecondaryLabel>{"Заявки на регистрацию"}</SecondaryLabel>
            </Flex>
            <Flex
                gap="small"
                style={{ width: "100%", height: "100%" }}
                vertical
            >
                <div
                    style={{
                        maxHeight: "500px",
                        width: "100%",
                        height: "100%",
                        border: "1px solid #d9d9d9",
                        borderRadius: "4px",
                        overflow: "auto",
                    }}
                >
                    <SelectableList
                        height="30px"
                        data={unverifiedUsers}
                        RenderItem={UnverifiedUserListItem}
                        getId={(item) => item.id}
                        selectedId={null}
                        onSelect={() => {}}
                    ></SelectableList>
                </div>
            </Flex>
        </Flex>
    );
}
