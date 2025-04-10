import { ReactNode } from "react";

export interface IDisplayFieldProps<T> {
    value: T;
}

export interface IEditFieldProps<T> extends IDisplayFieldProps<T> {
    onChange: (value: T | null) => void;
}

export interface IFieldContainerProps<T> {
    title?: ReactNode;
    children?: React.FC<IDisplayFieldProps<T>> | React.FC<IEditFieldProps<T>>;
}
