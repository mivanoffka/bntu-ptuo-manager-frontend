// DateField.tsx
import { DateTimeString } from "@/model";
import { CombinedFieldContainer, LabelField } from "@/view/primitives";
import {
    IDisplayFieldProps,
    IEditFieldProps,
} from "@/view/primitives/fields/types";
import { DatePicker, Flex } from "antd";
import dayjs from "dayjs";

export const DEFAULT_DATE_FORMAT = "DD.MM.YYYY";

const DateTimeDisplayField: React.FC<
    IDisplayFieldProps<DateTimeString | null>
> = ({ value }) => {
    const displayValue = value ? dayjs(value).format(DEFAULT_DATE_FORMAT) : "—";

    return <LabelField value={displayValue} />;
};

const DateTimeEditField: React.FC<IEditFieldProps<DateTimeString | null>> = (
    props
) => {
    const { value, onChange } = props;

    const getDateValue = (value: DateTimeString | null): dayjs.Dayjs | null => {
        if (!value) return null;
        const parsedDate = dayjs(value);
        return parsedDate.isValid() ? parsedDate : null;
    };

    const onChangeDateValue = (
        date: dayjs.Dayjs | null,
        then: (date: DateTimeString | null) => void
    ) => {
        then((date?.toISOString() as DateTimeString) ?? null);
    };

    return (
        <DatePicker
            value={getDateValue(value)}
            onChange={(value) => onChangeDateValue(value, onChange)}
        ></DatePicker>
    );
};

interface DateTimeFieldProps {
    value: DateTimeString | null;
    onChange: (value: DateTimeString | null) => void;
    editModeEnabled: boolean;
}

export function DateTimeField(props: DateTimeFieldProps) {
    const { value: value, onChange, editModeEnabled } = props;

    return (
        <CombinedFieldContainer<DateTimeString | null>
            editModeEnabled={editModeEnabled}
            value={value}
            onChange={onChange}
            DisplayFieldType={DateTimeDisplayField}
            EditFieldType={DateTimeEditField}
        />
    );
}

DateTimeField.Display = DateTimeDisplayField;
DateTimeField.Edit = DateTimeEditField;
