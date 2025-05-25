import { useState, useMemo, useCallback } from "react";
import { AutoComplete, AutoCompleteProps, Input } from "antd";
import debounce from "lodash/debounce";
import { IFieldProps, PLACEHOLDER } from "@/components/fields/shared";

export interface ISearchFieldProps
    extends Omit<AutoCompleteProps, "options">,
        IFieldProps {
    onSearch: (search: string) => Promise<string[]>;
}

export function SearchField(props: ISearchFieldProps) {
    const { isEditable, onSearch, disabled, ...rest } = props;
    const [options, setOptions] = useState<{ value: string }[]>([]);

    const debouncedSearch = useMemo(() => {
        return debounce(async (value: string) => {
            try {
                const results = await onSearch(value);
                setOptions(results.map((item) => ({ value: item })));
            } catch (err) {
                console.error("Failed to fetch options:", err);
            }
        }, 300);
    }, [onSearch, 300]);

    const handleSearch = useCallback(
        (value: string) => {
            debouncedSearch(value);
        },
        [debouncedSearch]
    );

    if (!isEditable) {
        // @ts-ignore
        return <Input {...rest} readOnly allowClear></Input>;
    }

    return (
        <AutoComplete
            {...rest}
            disabled={disabled || !isEditable}
            onSearch={handleSearch}
            options={options}
            allowClear
            placeholder={PLACEHOLDER}
            style={{ textAlign: "left" }}
        />
    );
}
