import { SelectableList } from "@/view/list/SelectableList";
import { useState } from "react";
import { Flex } from "antd";
import { SecondaryLabel } from "@/view/primitives";
import { useUsers } from "@/controller/users/UsersContext";
import { UsersListItem } from "@/view/users/UsersListItem";

export function UsersList() {
    const { users } = useUsers();
    const [selectedId, setSelectedId] = useState<string | number | null>(null);

    return (
        <Flex vertical style={{ width: "100%", height: "100%" }}>
            <Flex>
                <SecondaryLabel>{"Пользователи"}</SecondaryLabel>
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
                        data={users}
                        RenderItem={UsersListItem}
                        getId={(item) => item.id}
                        selectedId={null}
                        onSelect={() => {}}
                    ></SelectableList>
                </div>
            </Flex>
        </Flex>
    );
}
