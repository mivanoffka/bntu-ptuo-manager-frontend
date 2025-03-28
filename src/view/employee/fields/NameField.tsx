import { useDisplayedEmployee } from "@/controller/employee/DisplayedEmployeeContext";
import { useEmployeeUpdater } from "@/controller/employee/EmployeeUpdaterContext";
import { CombinedField } from "@/view/field/CombinedField";
import { Field } from "@/view/field/Field";
import { FieldTitle } from "@/view/field/FieldTitle";
import { Label } from "@/view/field/Label";
import { TextInput } from "@/view/field/TextInput";
import { DownOutlined, SmileOutlined } from "@ant-design/icons";
import { Dropdown, Flex, MenuProps, Space } from "antd";
import dayjs from "dayjs";

export function NameField() {
    const { displayedEmployee } = useDisplayedEmployee();
    const { updateFirstName, updateLastName, updateMiddleName } =
        useEmployeeUpdater();

    const { firstName, lastName, middleName } =
        displayedEmployee?.names?.relevant ?? {};

    const fullName = <Label> {`${lastName} ${firstName} ${middleName}`}</Label>;

    const historyItems: MenuProps["items"] =
        displayedEmployee?.names?.history.map((item, index) => {
            const { firstName, lastName, middleName } = item.item;
            return {
                key: index,

                label: (
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            gap: 20,
                        }}
                    >
                        <Label>
                            {`${lastName} ${firstName} ${middleName}`}
                        </Label>
                        <FieldTitle>
                            (до {dayjs(item.updatedAt).format("DD.MM.YYYY")})
                        </FieldTitle>
                    </div>
                ),
            };
        });

    const singularDisplayField = <Field title="Полное имя">{fullName}</Field>;

    const multipleDisplayField = (
        <Field title="Полное имя">
            <Dropdown trigger={["click"]} menu={{ items: historyItems }}>
                <a onClick={(e) => e.preventDefault()}>
                    <Flex gap="small">
                        {fullName}
                        <DownOutlined />
                    </Flex>
                </a>
            </Dropdown>
        </Field>
    );

    const displayField =
        historyItems.length > 0 ? multipleDisplayField : singularDisplayField;

    const editField = (
        <Flex gap="small">
            <Field title="Фамилия">
                <TextInput
                    value={lastName}
                    onChange={updateLastName}
                    placeholder="Фамилия"
                ></TextInput>
            </Field>
            <Field title="Имя">
                <TextInput
                    value={firstName}
                    onChange={updateFirstName}
                    placeholder="Имя"
                ></TextInput>
            </Field>
            <Field title="Отчество">
                <TextInput
                    value={middleName}
                    onChange={updateMiddleName}
                    placeholder="Отчество"
                ></TextInput>
            </Field>
        </Flex>
    );

    return (
        <CombinedField
            displayField={displayField}
            editField={editField}
        ></CombinedField>
    );
}
