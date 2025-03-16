import { createContext, useContext } from "react";
import { Dayjs } from "dayjs"; // Предполагается, что Dayjs импортируется
import { useEmployeeUpdater } from "@/controller/employee/updaters/EmployeeUpdaterContext";
import { TradeUnionPosition } from "@/model";
import { createHook } from "@/controller/utils";

enum Fields {
    TradeUnionPositions = "tradeUnionPositions",
    JoinedAt = "joinedAt",
    IsArchived = "isArchived",
    ArchivedAt = "archivedAt",
    IsRetired = "isRetired",
    RetiredAt = "retiredAt",
}

export interface IEmployeePtuoUpdater {
    tradeUnionPositions: TradeUnionPosition[] | null;
    joinedAt: Dayjs | null;
    isArchived: boolean | null;
    archivedAt: Dayjs | null;
    isRetired: boolean | null;
    retiredAt: Dayjs | null;

    updateTradeUnionPositions: (value: TradeUnionPosition[]) => void;
    updateJoinedAt: (value: Dayjs | null) => void;
    updateIsArchived: (value: boolean | null) => void;
    updateArchivedAt: (value: Dayjs | null) => void;
    updateIsRetired: (value: boolean | null) => void;
    updateRetiredAt: (value: Dayjs | null) => void;
}

export const EmployeePtuoUpdater = createContext<IEmployeePtuoUpdater>(
    {} as IEmployeePtuoUpdater
);

export function EmployeePtuoUpdaterProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const { ptuo, updatePTUO } = useEmployeeUpdater();

    const tradeUnionPositions = ptuo?.tradeUnionPositions || null;
    const joinedAt = ptuo?.joinedAt || null;
    const isArchived = ptuo?.isArchived || null;
    const archivedAt = ptuo?.archivedAt || null;
    const isRetired = ptuo?.isRetired || null;
    const retiredAt = ptuo?.retiredAt || null;

    function updateField<T>(fieldName: Fields, value: T) {
        if (!ptuo) {
            return;
        }
        updatePTUO({ ...ptuo, [fieldName]: value });
    }

    function updateTradeUnionPositions(value: TradeUnionPosition[]) {
        updateField<TradeUnionPosition[]>(Fields.TradeUnionPositions, value);
    }

    function updateJoinedAt(value: Dayjs | null) {
        updateField<Dayjs | null>(Fields.JoinedAt, value);
    }

    function updateIsArchived(value: boolean | null) {
        updateField<boolean | null>(Fields.IsArchived, value);
    }

    function updateArchivedAt(value: Dayjs | null) {
        updateField<Dayjs | null>(Fields.ArchivedAt, value);
    }

    function updateIsRetired(value: boolean | null) {
        updateField<boolean | null>(Fields.IsRetired, value);
    }

    function updateRetiredAt(value: Dayjs | null) {
        updateField<Dayjs | null>(Fields.RetiredAt, value);
    }

    const context: IEmployeePtuoUpdater = {
        tradeUnionPositions,
        joinedAt,
        isArchived,
        archivedAt,
        isRetired,
        retiredAt,
        updateTradeUnionPositions,
        updateJoinedAt,
        updateIsArchived,
        updateArchivedAt,
        updateIsRetired,
        updateRetiredAt,
    };

    return (
        <EmployeePtuoUpdater.Provider value={context}>
            {children}
        </EmployeePtuoUpdater.Provider>
    );
}

export const useEmployeePtuoUpdater = createHook(EmployeePtuoUpdater);
