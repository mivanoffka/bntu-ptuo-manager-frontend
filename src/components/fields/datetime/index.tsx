import { IFieldProps, PLACEHOLDER } from "@/components/fields/shared";
import { DatePicker, DatePickerProps, Input } from "antd";
import dayjs from "dayjs";

const DEFAULT_FORMAT = "D MMMM YYYY г.";

export interface IDateTimeFieldProps extends DatePickerProps, IFieldProps {}

export function DateTimeField(props: IDateTimeFieldProps) {
    const { isEditable, value, onChange, format, allowClear, style } = props;

    const datePickerValue = value ? dayjs(value) : null;

    const datePickerOnChange = (date: dayjs.Dayjs, dateString: string) => {
        if (!onChange) return;
        // @ts-ignore
        onChange(date?.toISOString(), dateString);
    };

    const datePickerProps: DatePickerProps = {
        ...props,
        allowClear: allowClear || true,
        style: style || { width: "100%" },
        format: format || DEFAULT_FORMAT,
        value: datePickerValue,
        // @ts-ignore
        onChange: datePickerOnChange,
    };

    const inputFormat = format
        ? typeof format === "string"
            ? format
            : DEFAULT_FORMAT
        : DEFAULT_FORMAT;
    const inputValue = value ? dayjs(value).format(inputFormat) : "";

    return isEditable ? (
        <DatePicker {...datePickerProps} placeholder={PLACEHOLDER} />
    ) : (
        <Input value={inputValue} readOnly placeholder={PLACEHOLDER}></Input>
    );
}
