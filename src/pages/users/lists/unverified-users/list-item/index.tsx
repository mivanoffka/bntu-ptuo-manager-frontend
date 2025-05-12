import { IconButton } from "@/components/buttons";
import { ISelectableListItemProps } from "@/components/selectable-list";
import { Palette } from "@/constants";
import { useUsers } from "@/contexts/users";
import { IUser } from "@/model";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
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
                <IconButton
                    title="Одобрить"
                    icon={<CheckOutlined />}
                    color={Palette.GREEN}
                    onClick={async () => {
                        await verifyUser(user.id);
                    }}
                />
                <IconButton
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
