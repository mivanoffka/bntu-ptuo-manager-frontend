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
        { id: UserRole.VIEWER, label: "Просмотр" },
        { id: UserRole.EDITOR, label: "Редактор" },
        { id: UserRole.MANAGER, label: "Старший редактор" },
        { id: UserRole.ADMIN, label: "Администратор" },
    ];

    return (
        <Flex style={{ width: "100%" }}>
            <Flex style={{ width: "33%" }}> {user.username}</Flex>
            <Flex style={{ width: "33%" }}>{registeredAt}</Flex>
            <Flex style={{ width: "33%" }}>
                <Select
                    options={roleOptions}
                    value={user.role}
                    onChange={(value) => updateUserRole(user.id, value)}
                ></Select>
            </Flex>
        </Flex>
    );
}
