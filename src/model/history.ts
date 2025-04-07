import { IHistoryItem } from "@/model/history.item";
import { ITimeStamped } from "@/model/timestamped";

export interface IHistory<T extends ITimeStamped> {
    history: IHistoryItem<T>[];
    relevant: T | null;
}

export class HistoryUtility {
    static fromCollection<T extends ITimeStamped>(items: T[]): IHistory<T> {
        const sortedItems = [...items].sort((a, b) => {
            const aDate = a.createdAt ? new Date(a.createdAt).getTime() : 0;
            const bDate = b.createdAt ? new Date(b.createdAt).getTime() : 0;
            return aDate - bDate;
        });

        const history: IHistoryItem<T>[] = [];
        let relevant: T | null = null;

        for (let i = 0; i < sortedItems.length - 1; i++) {
            const currentItem = sortedItems[i];
            const nextItem = sortedItems[i + 1];

            const historyItem: IHistoryItem<T> = {
                item: currentItem,
                updatedAt: nextItem.createdAt,
            };

            history.push(historyItem);
        }

        if (sortedItems.length > 0) {
            relevant = sortedItems[sortedItems.length - 1];
        }

        return {
            history,
            relevant,
        };
    }

    static toCollection<T extends ITimeStamped>(item: IHistory<T>): T[] {
        const result: T[] = [];

        for (const historyItem of item.history) {
            if (!historyItem.item.createdAt) {
                throw new Error("History item is missing createdAt");
            }
            result.push(historyItem.item);
        }

        if (item.relevant) {
            if (!item.relevant.createdAt) {
                throw new Error("Relevant item is missing createdAt");
            }
            result.push(item.relevant);
        }

        return result.sort((a, b) => {
            const aDate = a.createdAt ? new Date(a.createdAt).getTime() : 0;
            const bDate = b.createdAt ? new Date(b.createdAt).getTime() : 0;
            return aDate - bDate;
        });
    }

    static updatedByReplace<T extends ITimeStamped>(
        item: IHistory<T>,
        relevant: T
    ): IHistory<T> {
        const { history } = item;

        return {
            relevant,
            history,
        };
    }

    static updatedByExtend<T extends ITimeStamped>(
        item: IHistory<T>,
        relevant: T
    ): IHistory<T> {
        const { history, relevant: oldRelevant } = item;

        if (!oldRelevant) {
            return {
                relevant,
                history,
            };
        }

        const oldRelevantAsHistoryItem: IHistoryItem<T> = {
            item: oldRelevant,
            updatedAt: relevant.createdAt,
        };

        history.push(oldRelevantAsHistoryItem);

        item.history.sort((a, b) => {
            const aDate = a.item.createdAt
                ? new Date(a.item.createdAt).getTime()
                : 0;
            const bDate = b.item.createdAt
                ? new Date(b.item.createdAt).getTime()
                : 0;
            return aDate - bDate;
        });

        return {
            relevant,
            history,
        };
    }
}
