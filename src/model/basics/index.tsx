export type DateTimeString =
    `${number}-${number}-${number}T${number}:${number}:${number}Z`;

export interface IPagination {
    current: number;
    total: number;
    size: number;
}

export interface ITreeNode {
    path: string;
    label: string;
    children: ITreeNode[];
}

export interface ITimeStamped {
    createdAt: DateTimeString | null;
}

export interface IPrimaryKeyed {
    id: number;
}

export interface IEnumerated extends IPrimaryKeyed {
    label: string;
}
