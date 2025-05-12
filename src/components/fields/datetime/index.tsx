import { IValueFieldProps } from "@/components/fields/types";
import { DateTimeString } from "@/model";
import { DatePicker, Input } from "antd";
import dayjs from "dayjs";

export function DateTimeField(props: IValueFieldProps<DateTimeString>) {
    const { value: value, onChange, editModeEnabled } = props;

    const displayValue = value ? dayjs(value).format("D MMMM YYYY") : "—";

    const getDateValue = (value: DateTimeString | null): dayjs.Dayjs | null => {
        if (!value) return null;
        const parsedDate = dayjs(value);
        return parsedDate.isValid() ? parsedDate : null;
    };

    const onChangeDateValue = (date: dayjs.Dayjs | null) => {
        onChange((date?.toISOString() as DateTimeString) ?? null);
    };

    return editModeEnabled ? (
        <DatePicker
            format="DD MMMM YYYY"
            style={{ width: "100%" }}
            onChange={onChangeDateValue}
            value={getDateValue(value)}
        />
    ) : (
        <Input readOnly value={displayValue || ""}></Input>
    );
}
