import { useState, useMemo, useCallback } from "react";
import { Select, SelectProps } from "antd";
import debounce from "lodash/debounce";
import { IFieldProps, PLACEHOLDER } from "@/components/fields/shared";

export interface IMultipleSearchFieldProps
    extends Omit<SelectProps, "options">,
        IFieldProps {
    onSearch: (search: string) => Promise<string[]>;
}

export function MultipleSearchField(props: IMultipleSearchFieldProps) {
    const { isEditable, onSearch, disabled, ...rest } = props;

    const [options, setOptions] = useState<{ value: string; label: string }[]>(
        []
    );

    const debouncedSearch = useMemo(() => {
        return debounce(async (value: string) => {
            try {
                const results = await onSearch(value);
                setOptions(
                    results.map((item) => ({ value: item, label: item }))
                );
            } catch (err) {
                console.error("Failed to fetch options:", err);
            }
        }, 300);
    }, [onSearch]);

    const handleSearch = useCallback(
        (value: string) => {
            debouncedSearch(value);
        },
        [debouncedSearch]
    );

    if (!isEditable) {
        return (
            <Select
                {...rest}
                disabled
                mode={"multiple"}
                options={options}
                placeholder={PLACEHOLDER}
                style={{ width: "100%", textAlign: "left" }}
            />
        );
    }

    return (
        <Select
            {...rest}
            showSearch
            mode={"multiple"}
            disabled={disabled}
            onSearch={handleSearch}
            options={options}
            placeholder={PLACEHOLDER}
            filterOption={false}
            allowClear
            style={{ width: "100%", textAlign: "left" }}
        />
    );
}
