import { ISelectableListItemProps } from "@/components/selectable-list";
import { useAuth } from "@/contexts/auth";
import { useUsers } from "@/contexts/users";
import { IUser, UserRole } from "@/model";
import { Flex, Select } from "antd";
import dayjs from "dayjs";

export function UsersListItem(props: ISelectableListItemProps<IUser>) {
    const { item: user } = props;
    const { updateUserRole } = useUsers();
    const { user: authUser } = useAuth();

    const registeredAt = user.dateJoined
        ? dayjs(user.dateJoined).format("D MMMM YYYY")
        : "—";

    const roleOptions = [
        { value: UserRole.VIEWER, label: "Просмотр" },
        { value: UserRole.EDITOR, label: "Редактор" },
        { value: UserRole.MANAGER, label: "Старший редактор" },
        { value: UserRole.ADMIN, label: "Администратор" },
    ];

    return (
        <Flex style={{ width: "100%" }}>
            <Flex style={{ width: "33%" }}> {user.username}</Flex>
            <Flex style={{ width: "33%" }}>{registeredAt}</Flex>
            <Flex style={{ width: "33%" }}>
                <Select
                    disabled={user.id === authUser?.id}
                    style={{ width: "100%", textAlign: "left" }}
                    options={roleOptions}
                    value={user.role}
                    onChange={(value) => updateUserRole(user.id, value)}
                ></Select>
            </Flex>
        </Flex>
    );
}
