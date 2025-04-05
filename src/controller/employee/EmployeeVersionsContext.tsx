import { useApi } from "@/controller/api";
import { useOneSelectedEmployee } from "@/controller/employee/OneSelectedEmployeeContext";
import { createHook } from "@/controller/utils";
import { IEmployeeVersion } from "@/model";
import { DateTimeString } from "@/model/date.time.string";
import dayjs from "dayjs";
import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";
import { useFetcher } from "react-router-dom";

export interface IEmployeeVersionsContext {
    employeeVersionTimestamps: DateTimeString[];
    selectedVersionTimestamp: DateTimeString | null;
    getLatestTimestamp: () => DateTimeString | null;
    selectVersion: (timestamp: DateTimeString) => void;
}

export const EmployeeVersionsContext = createContext<IEmployeeVersionsContext>({
    selectedVersionTimestamp: null,
    employeeVersionTimestamps: [],
    getLatestTimestamp: () => null,
    selectVersion: () => {},
});

export function EmployeeVersionsProvider({
    children,
}: {
    children: ReactNode;
}) {
    const { axiosInstance } = useApi();
    const { oneSelectedEmployee } = useOneSelectedEmployee();
    const employeeVersionTimestamps =
        oneSelectedEmployee?.employeeVersionTimestamps ?? [];

    const [selectedVersionTimestamp, setSelectedVersionTimestamp] =
        useState<DateTimeString | null>(null);

    function getLatestTimestamp(): DateTimeString | null {
        if (!oneSelectedEmployee) {
            return null;
        }

        return employeeVersionTimestamps.reduce(
            (latest: DateTimeString, current: DateTimeString) => {
                const currentDate = dayjs(current);
                const latestDate = dayjs(latest);

                return currentDate.isAfter(latestDate) ? current : latest;
            }
        );
    }

    useEffect(() => {
        const latest = getLatestTimestamp();
        setSelectedVersionTimestamp(latest);
    }, [oneSelectedEmployee]);

    function selectVersion(timestamp: DateTimeString) {
        if (employeeVersionTimestamps.includes(timestamp)) {
            setSelectedVersionTimestamp(timestamp);
        } else {
            setSelectedVersionTimestamp(null);
        }
    }

    const context: IEmployeeVersionsContext = {
        selectedVersionTimestamp,
        employeeVersionTimestamps,
        selectVersion,
        getLatestTimestamp,
    };

    return (
        <EmployeeVersionsContext.Provider value={context}>
            {children}
        </EmployeeVersionsContext.Provider>
    );
}

export const useEmployeeVersions = createHook(EmployeeVersionsContext);
