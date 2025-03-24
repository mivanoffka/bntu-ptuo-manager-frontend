import { IHistoryItem } from "@/model/history.item";

export interface History<T> {
    history: IHistoryItem<T>[];
    relevant: T | null;
}
