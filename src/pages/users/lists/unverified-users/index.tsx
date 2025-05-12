import { SecondaryLabel } from "@/components/labels";
import { SelectableList } from "@/components/selectable-list";
import { useUsers } from "@/contexts/users";
import { UnverifiedUserListItem } from "@/pages/users/lists/unverified-users/list-item";
import { Flex } from "antd";

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
