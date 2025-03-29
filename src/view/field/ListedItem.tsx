import { useDisplayedEmployee } from "@/controller/employee/DisplayedEmployeeContext";
import { useEditMode } from "@/controller/employee/EditModeContext";
import { useEmployeeUpdater } from "@/controller/employee/EmployeeUpdaterContext";
import { Email } from "@/model";
import { EmailField } from "@/view/employee/fields/EmailField";
import { CombinedField } from "@/view/field/CombinedField";
import { DropDown } from "@/view/field/DropDown";
import { Field } from "@/view/field/Field";
import { FieldTitle } from "@/view/field/FieldTitle";
import { Label } from "@/view/field/Label";
import { TextInput } from "@/view/field/TextInput";
import { VBox } from "@/view/utils";
import { DeleteOutlined } from "@ant-design/icons";
import { Button, DatePicker, Flex, Input, Typography } from "antd";
import dayjs from "dayjs";
import { ReactNode } from "react";

export interface IListedItemProps {
    index: number;
    children: ReactNode;
    remove: (item: any) => void;
}

export function ListedItem(props: IListedItemProps) {
    const { index, children, remove } = props;
    const { editModeEnabled } = useEditMode();

    return (
        <Flex gap="middle" style={{ width: "100%" }}>
            <Typography.Text type="secondary" style={{ whiteSpace: "nowrap" }}>
                {index + 1}.
            </Typography.Text>
            {children}
            {editModeEnabled && (
                <Button onClick={remove} type="link">
                    <DeleteOutlined />
                </Button>
            )}
        </Flex>
    );
}
