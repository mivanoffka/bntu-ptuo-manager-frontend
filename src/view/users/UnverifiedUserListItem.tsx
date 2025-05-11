import { useAuth } from "@/controller/auth";
import { useUsers } from "@/controller/users/UsersContext";
import { DateTimeString, IEmployee } from "@/model";
import { IUser, UserRole } from "@/model/user";
import { Palette } from "@/view/constants";
import { ISelectableListItemProps } from "@/view/list/SelectableList";
import { ToolBarButton } from "@/view/manager/toolbar/buttons/ToolBarButton";
import { DateTimeField, SelectField } from "@/view/primitives/fields";
import { CheckOutlined, CloseOutlined, StopOutlined } from "@ant-design/icons";
import { Flex } from "antd";
import dayjs from "dayjs";

export function UnverifiedUserListItem(props: ISelectableListItemProps<IUser>) {
    const { item: user } = props;
    const { declineUser, verifyUser } = useUsers();

    const registeredAt = user.dateJoined
        ? dayjs(user.dateJoined).format("D MMMM YYYY")
        : "—";

    return (
        <Flex style={{ width: "100%" }}>
            <Flex style={{ width: "33%" }}> {user.username}</Flex>
            <Flex style={{ width: "33%" }}>{registeredAt}</Flex>
            <Flex style={{ width: "33%" }}>
                <ToolBarButton
                    title="Одобрить"
                    icon={<CheckOutlined />}
                    color={Palette.GREEN}
                    onClick={async () => {
                        await verifyUser(user.id);
                    }}
                />
                <ToolBarButton
                    title="Отклонить"
                    icon={<CloseOutlined />}
                    color={Palette.RED}
                    onClick={async () => {
                        await declineUser(user.id);
                    }}
                />
            </Flex>
        </Flex>
    );
}
