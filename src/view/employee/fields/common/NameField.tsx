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

export function NameField() {
    // const { employeeVersion, updateField, getField } =
    //     useEmployeeEditor();

    // const { firstName, lastName, middleName } =
    //     employeeVersion?.names? ?? {};

    // const fullName = (
    //     <LabelField> {`${lastName} ${firstName} ${middleName}`}</LabelField>
    // );

    // function updateNamePart(fieldName: string, value: string) {}

    // function updateFirstName(value: string) {
    //     updateNamePart("firstName", value);
    // }

    // function updateLastName(value: string) {
    //     updateNamePart("lastName", value);
    // }

    // function updateMiddleName(value: string) {
    //     updateNamePart("middleName", value);
    // }

    // const historyItems = (
    //     <ul>
    //         {employeeVersion?.names?.map((item, index) => {
    //             const { firstName, lastName, middleName } = item;
    //             return (
    //                 <li
    //                     key={index}
    //                     style={{
    //                         display: "flex",
    //                         justifyContent: "space-between",
    //                         gap: 20,
    //                     }}
    //                 >
    //                     <LabelField>
    //                         {`${lastName} ${firstName} ${middleName}`}
    //                     </LabelField>
    //                     <FieldTitle>
    //                         ({dayjs(item.createdAt).format("DD.MM.YYYY")})
    //                     </FieldTitle>
    //                 </li>
    //             );
    //         })}
    //     </ul>
    // );

    // const singularDisplayField = <Field title="Полное имя">{fullName}</Field>;

    // const multipleDisplayField = (
    //     <Field title="Полное имя">
    //         <Commented comment={historyItems}>{fullName}</Commented>
    //     </Field>
    // );

    // const displayField =
    //     employeeVersion?.names?.history?.length > 0
    //         ? multipleDisplayField
    //         : singularDisplayField;

    // const editField = (
    //     <Flex gap="small">
    //         <Field title="Фамилия">
    //             <InputField
    //                 value={lastName}
    //                 onChange={updateLastName}
    //                 placeholder="Фамилия"
    //             ></InputField>
    //         </Field>
    //         <Field title="Имя">
    //             <InputField
    //                 value={firstName}
    //                 onChange={updateFirstName}
    //                 placeholder="Имя"
    //             ></InputField>
    //         </Field>
    //         <Field title="Отчество">
    //             <InputField
    //                 value={middleName}
    //                 onChange={updateMiddleName}
    //                 placeholder="Отчество"
    //             ></InputField>
    //         </Field>
    //     </Flex>
    // );

    return (
        // <CombinedField
        //     displayField={displayField}
        //     editField={editField}
        // ></CombinedField>
        <>?</>
    );
}
