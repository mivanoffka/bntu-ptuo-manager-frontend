import { useApi } from "@/controller/api";
import { useOneSelectedEmployee } from "@/controller/employee/OneSelectedEmployeeContext";
import { createHook } from "@/controller/utils";
import { IEmployeeVersion } from "@/model";
import { DateTimeString } from "@/model";
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
    latestTimestamp: DateTimeString | null;
    selectVersion: (timestamp: DateTimeString) => void;
    selectLatestVersion: () => void;
}

export const EmployeeVersionsContext = createContext<IEmployeeVersionsContext>({
    selectedVersionTimestamp: null,
    employeeVersionTimestamps: [],
    latestTimestamp: null,
    selectVersion: () => {},
    selectLatestVersion: () => {},
});

export function EmployeeVersionsProvider({
    children,
}: {
    children: ReactNode;
}) {
    const { axiosInstance } = useApi();
    const { oneSelectedEmployee } = useOneSelectedEmployee();
    const [employeeVersionTimestamps, setEmployeeVersionTimestamps] = useState<
        DateTimeString[]
    >([]);

    const [latestTimestamp, setLatestTimestamp] =
        useState<DateTimeString | null>(null);

    const [selectedVersionTimestamp, setSelectedVersionTimestamp] =
        useState<DateTimeString | null>(null);

    useEffect(() => {
        if (!oneSelectedEmployee) {
            setSelectedVersionTimestamp(null);
            setEmployeeVersionTimestamps([]);
            return;
        }
        const { employeeVersionTimestamps } = oneSelectedEmployee;

        setEmployeeVersionTimestamps(employeeVersionTimestamps);
    }, [oneSelectedEmployee]);

    function getLatestTimestamp(from: DateTimeString[]): DateTimeString | null {
        return from.reduce(
            (latest: DateTimeString, current: DateTimeString) => {
                const currentDate = dayjs(current);
                const latestDate = dayjs(latest);

                return currentDate.isAfter(latestDate) ? current : latest;
            }
        );
    }

    useEffect(() => {
        if (!oneSelectedEmployee) {
            return;
        }

        const latest = getLatestTimestamp(employeeVersionTimestamps);

        setLatestTimestamp(latest);
        selectVersion(latest);
    }, [employeeVersionTimestamps]);

    function selectVersion(timestamp: DateTimeString | null) {
        if (!timestamp) {
            setSelectedVersionTimestamp(null);
            return;
        }

        if (employeeVersionTimestamps.includes(timestamp)) {
            setSelectedVersionTimestamp(timestamp);
        } else {
            setSelectedVersionTimestamp(null);
        }
    }

    function selectLatestVersion() {
        selectVersion(latestTimestamp);
    }

    const context: IEmployeeVersionsContext = {
        selectedVersionTimestamp,
        employeeVersionTimestamps,
        selectVersion,
        latestTimestamp,
        selectLatestVersion,
    };

    return (
        <EmployeeVersionsContext.Provider value={context}>
            {children}
        </EmployeeVersionsContext.Provider>
    );
}

export const useEmployeeVersions = createHook(EmployeeVersionsContext);
