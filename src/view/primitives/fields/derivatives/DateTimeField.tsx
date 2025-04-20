import { DateTimeString } from "@/model";
import {
    IObjectFieldProps,
    IValueFieldProps,
} from "@/view/primitives/fields/types";
import { DatePicker, Input } from "antd";
import ruRU from "antd/lib/locale/ru_RU";

import dayjs from "dayjs";
import "dayjs/locale/ru";
import localizedFormat from "dayjs/plugin/localizedFormat";
import updateLocale from "dayjs/plugin/updateLocale";

dayjs.locale("ru");
dayjs.extend(localizedFormat);
dayjs.extend(updateLocale);

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
