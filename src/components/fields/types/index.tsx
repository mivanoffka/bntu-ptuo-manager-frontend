export interface IValueFieldProps<T> {
    value: T | null;
    onChange: (value: T | null) => void;
    editModeEnabled: boolean;
}

export interface IObjectFieldProps<T> {
    value: T;
    onChange: (value: T) => void;
    editModeEnabled: boolean;
}
