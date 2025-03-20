import { IHistoryItem } from "@/model/history.item";

export class History<T> {
    items: IHistoryItem<T>[];

    relevant: T | null;

    constructor(relevant: T, items?: IHistoryItem<T>[]) {
        this.items = items ? items : [];
        this.relevant = relevant;
    }
}
