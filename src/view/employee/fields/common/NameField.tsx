import { useEmployeeEditor } from "@/controller/employee/EmployeeEditorContext";
import { useEmployeeUpdater } from "@/controller/employee/EmployeeUpdaterContext";
import { CombinedField } from "@/view/primitives/fields/field/CombinedField";
import { Field } from "@/view/primitives/fields/field/Field";
import { FieldTitle } from "@/view/primitives/fields/field/FieldTitle";
import { LabelField } from "@/view/primitives/fields/derivatives/LabelField";
import { InputField } from "@/view/primitives/fields/derivatives/InputField";
import { DownOutlined, SmileOutlined } from "@ant-design/icons";
import { Dropdown, Flex, MenuProps, Space } from "antd";
import dayjs from "dayjs";

export function NameField() {
    const { displayedEmployee, update, updateField, getField } =
        useEmployeeEditor();

    const { firstName, lastName, middleName } =
        displayedEmployee?.names?.relevant ?? {};

    const fullName = (
        <LabelField> {`${lastName} ${firstName} ${middleName}`}</LabelField>
    );

    function updateNamePart(fieldName: string, value: string) {
        if (!displayedEmployee) {
            return;
        }

        const { names } = displayedEmployee;
        const { relevant, history } = names;

        let newRelevant = relevant;

        if (!newRelevant) {
            newRelevant = {
                firstName: null,
                lastName: null,
                middleName: null,
            };
        }

        update({
            ...displayedEmployee,
            names: {
                relevant: { ...newRelevant, [fieldName]: value },
                history,
            },
        });
    }

    function updateFirstName(value: string) {
        updateNamePart("firstName", value);
    }

    function updateLastName(value: string) {
        updateNamePart("lastName", value);
    }

    function updateMiddleName(value: string) {
        updateNamePart("middleName", value);
    }

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
                        <LabelField>
                            {`${lastName} ${firstName} ${middleName}`}
                        </LabelField>
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
                <InputField
                    value={lastName}
                    onChange={updateLastName}
                    placeholder="Фамилия"
                ></InputField>
            </Field>
            <Field title="Имя">
                <InputField
                    value={firstName}
                    onChange={updateFirstName}
                    placeholder="Имя"
                ></InputField>
            </Field>
            <Field title="Отчество">
                <InputField
                    value={middleName}
                    onChange={updateMiddleName}
                    placeholder="Отчество"
                ></InputField>
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
