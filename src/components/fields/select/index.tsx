import { IFieldProps, PLACEHOLDER } from "@/components/fields/shared";
import { Input, Select, SelectProps } from "antd";

export interface ISelectFieldProps extends SelectProps, IFieldProps {
    isMultiple?: boolean;
}

export function SelectField(props: ISelectFieldProps) {
    const {
        isEditable,
        value,
        onChange,
        options,
        mode,
        isMultiple = false,
    } = props;

    const inputValue = isMultiple
        ? (value as string[] | undefined)
              ?.map((val) => options?.find((item) => item.value === val)?.label)
              .filter(Boolean)
              .join(", ")
        : options?.find((item) => item.value === value)?.label;

    return isEditable ? (
        <Select
            style={{ textAlign: "left", width: "100%" }}
            {...props}
            allowClear
            value={value}
            placeholder={PLACEHOLDER}
            mode={isMultiple ? "multiple" : undefined}
        />
    ) : (
        <Input value={inputValue} readOnly placeholder={PLACEHOLDER} />
    );
}
