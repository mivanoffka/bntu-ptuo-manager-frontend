export interface IHistoryItem<T> {
    id: number;
    item: T;

    createdAt: Date;
}
