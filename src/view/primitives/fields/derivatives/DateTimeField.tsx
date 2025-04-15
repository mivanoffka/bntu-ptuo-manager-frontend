import { DateTimeString } from "@/model";
import {
    IObjectFieldProps,
    IValueFieldProps,
} from "@/view/primitives/fields/types";
import { DatePicker, Input } from "antd";
import dayjs from "dayjs";

export function DateTimeField(props: IValueFieldProps<DateTimeString>) {
    const { value: value, onChange, editModeEnabled } = props;

    const displayValue = value ? dayjs(value).format("DD.MM.YYYY") : "—";

    const getDateValue = (value: DateTimeString | null): dayjs.Dayjs | null => {
        if (!value) return null;
        const parsedDate = dayjs(value);
        return parsedDate.isValid() ? parsedDate : null;
    };

    const onChangeDateValue = (date: dayjs.Dayjs | null) => {
        onChange((date?.toISOString() as DateTimeString) ?? null);
    };

    return editModeEnabled ? (
        <DatePicker onChange={onChangeDateValue} value={getDateValue(value)} />
    ) : (
        <Input readOnly value={displayValue || ""}></Input>
    );
}
