import { useAuth } from "@/controller/auth";
import { useUsers } from "@/controller/users/UsersContext";
import { DateTimeString, IEmployee } from "@/model";
import { IUser, UserRole } from "@/model/user";
import { ISelectableListItemProps } from "@/view/list/SelectableList";
import { DateTimeField, SelectField } from "@/view/primitives/fields";
import { Flex } from "antd";
import dayjs from "dayjs";

export function UsersListItem(props: ISelectableListItemProps<IUser>) {
    const { item: user } = props;
    const { updateUserRole } = useUsers();
    const { username } = useAuth();

    const getDateValue = (value: DateTimeString | null): dayjs.Dayjs | null => {
        if (!value) return null;
        const parsedDate = dayjs(value);
        return parsedDate.isValid() ? parsedDate : null;
    };

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
                <SelectField
                    selectedIds={[
                        roleOptions.find((item) => item.id === user.role),
                    ]}
                    enumeration={roleOptions}
                    onChange={async (value) => {
                        updateUserRole(user.id, value[0]);
                    }}
                    disabled={username === user.username}
                    editModeEnabled={true}
                    allowEmpty={false}
                ></SelectField>
            </Flex>
        </Flex>
    );
}
