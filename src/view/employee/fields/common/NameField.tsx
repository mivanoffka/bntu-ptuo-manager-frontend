import { CombinedField } from "@/view/primitives/fields/field/CombinedField";
import { Field } from "@/view/primitives/fields/field/Field";
import { FieldTitle } from "@/view/primitives/fields/field/FieldTitle";
import { LabelField } from "@/view/primitives/fields/derivatives/LabelField";
import { InputField } from "@/view/primitives/fields/derivatives/InputField";
import { DownOutlined, SmileOutlined } from "@ant-design/icons";
import { Dropdown, Flex, MenuProps, Space } from "antd";
import dayjs from "dayjs";
import { Commented } from "@/view/primitives/containers";
import { useEmployeeEditor } from "@/controller/employee";
import { IName, History } from "@/model";

export function NameField() {
    const { updateField, getList } = useEmployeeEditor();

    const names = getList<IName>("names");
    const namesHistory = History.fromCollection<IName>(names);

    const { firstName, lastName, middleName } = namesHistory.relevant ?? {
        firstName: "",
        lastName: "",
        middleName: "",
    };

    const fullName = (
        <LabelField> {`${lastName} ${firstName} ${middleName}`}</LabelField>
    );

    function updateNamePart(fieldName: string, value: string) {
        const { relevant } = namesHistory;

        const name = { ...relevant, [fieldName]: value };

        const updatedHistory = History.updatedByReplace<IName>(
            namesHistory,
            name as IName
        );

        const updatedNames = History.toCollection<IName>(updatedHistory);

        updateField("names", updatedNames);
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

    const historyItems = (
        <ul>
            {namesHistory.history.map((item, index) => {
                const { firstName, lastName, middleName } = item.item;
                return (
                    <li
                        key={index}
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
                    </li>
                );
            })}
        </ul>
    );

    const singularDisplayField = <Field title="Полное имя">{fullName}</Field>;

    const multipleDisplayField = (
        <Field title="Полное имя">
            <Commented comment={historyItems}>{fullName}</Commented>
        </Field>
    );

    const displayField =
        names.length > 1 ? multipleDisplayField : singularDisplayField;

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
