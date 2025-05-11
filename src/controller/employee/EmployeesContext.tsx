import { createContext, ReactNode, useEffect, useState } from "react";
import { createHook } from "@/controller/utils";
import { DateTimeString, IEmployee, IEmployeeVersion } from "@/model";
import { useApi } from "@/controller/api";
import { EmployeesEndPoint } from "@/controller/employee/constants";
import dayjs from "dayjs";
import { getLatestTimestamp } from "@/controller/employee/utils";
import {
    DEFAULT_FILTER,
    IEmployeesFilter,
} from "@/model/employee/employees.filter";
import { useNavigate, useParams } from "react-router-dom";
import { useEditMode } from "@/controller/employee/EditModeContext";

export interface IPaginatedData<T> {
    results: T[];
    count: number;
    next: string | null;
    previous: string | null;
}

export interface IEmployeesContext {
    selectedId: number | null;
    selectedTimestamp: DateTimeString | null;
    latestTimestamp: DateTimeString | null;
    selectId: (id: number | null) => void;
    selectTimestamp: (timestamp: DateTimeString | null) => void;
    isLatest: boolean;

    employeesListFilter: IEmployeesFilter;
    setEmployeesListFilter: (filter: IEmployeesFilter) => void;
    employeesList: IEmployee[];
    selectedEmployee: IEmployee | null;
    setSelectedEmployee: (employee: IEmployee) => void;
    selectedEmployeeVersion: IEmployeeVersion | null;
    setSelectedEmployeeVersion: (version: IEmployeeVersion) => void;
    pagesLoaded: number;
    limit: number;
    totalItems: number;

    fetchAllEmployees: () => Promise<void>;
    downloadAllEmployeesExcel: () => Promise<void>;
    fetchNextEmployees: () => Promise<void>;
    fetchSelectedEmployee: () => Promise<void>;
    fetchSelectedEmployeeVersion: () => Promise<void>;
    sendNewEmployee: (version: IEmployeeVersion) => Promise<IEmployee>;
    sendNewVersion: (version: IEmployeeVersion) => Promise<IEmployeeVersion>;
    restoreToSelectedVersion: () => Promise<void>;
    deleteSelectedVersion: () => Promise<void>;
    deleteSelectedEmployee: () => Promise<void>;
}

export const EmployeesContext = createContext<IEmployeesContext>({
    selectedId: null,
    selectedTimestamp: null,
    selectId: () => {},
    selectTimestamp: () => {},
    latestTimestamp: null,
    isLatest: false,

    employeesListFilter: DEFAULT_FILTER,
    setEmployeesListFilter: (filter: IEmployeesFilter) => {},
    employeesList: [],
    selectedEmployee: null,
    setSelectedEmployee: () => {},
    selectedEmployeeVersion: null,
    setSelectedEmployeeVersion: () => {},
    pagesLoaded: 0,
    limit: 15,
    totalItems: 0,

    fetchAllEmployees: async () => {},
    downloadAllEmployeesExcel: async () => {},
    fetchNextEmployees: async () => {},
    fetchSelectedEmployee: async () => {},
    fetchSelectedEmployeeVersion: async () => {},
    sendNewEmployee: async (version: IEmployeeVersion) => {
        return {} as IEmployee;
    },
    sendNewVersion: async (version: IEmployeeVersion) => {
        return {} as IEmployeeVersion;
    },
    restoreToSelectedVersion: async () => {},
    deleteSelectedVersion: async () => {},
    deleteSelectedEmployee: async () => {},
});

export function EmployeesProvider({ children }: { children: ReactNode }) {
    const { disableEditMode } = useEditMode();

    const { id, timestamp } = useParams();
    const selectedId = id ? parseInt(id) : null;
    const selectedTimestamp = timestamp ? (timestamp as DateTimeString) : null;
    const navigate = useNavigate();
    const [isLatest, setIsLatest] = useState(false);

    const [latestTimestamp, setLatestTimestamp] =
        useState<DateTimeString | null>(null);

    function selectId(id: number | null) {
        if (!id) {
            return navigate("/employees");
        }
        return navigate(`/employees/${id}`);
    }

    function selectTimestamp(timestamp: DateTimeString | null) {
        if (!timestamp) {
            return navigate(`/employees/${selectedId}`);
        }

        return navigate(`/employees/${selectedId}/${timestamp}`);
    }

    const { axiosInstance } = useApi();
    const [employeesList, setEmployeesList] = useState<IEmployee[]>([]);
    const [employeesListFilter, setEmployeesListFilter] =
        useState<IEmployeesFilter>(DEFAULT_FILTER);
    const [selectedEmployee, setSelectedEmployee] = useState<IEmployee | null>(
        null
    );
    const [selectedEmployeeVersion, setSelectedEmployeeVersion] =
        useState<IEmployeeVersion | null>(null);

    const [pagesLoaded, setPagesLoaded] = useState(0);
    const [limit, setLimit] = useState(15);
    const [totalItems, setTotalItems] = useState(0);

    // region Api

    async function _getManyEmployees(
        page: number,
        limit: number,
        filter: IEmployeesFilter
    ): Promise<IPaginatedData<IEmployee>> {
        const params = {
            page,
            limit,
            ...filter,
        };

        const data = await axiosInstance
            .get(EmployeesEndPoint.PREFIX, { params })
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                console.log(error);
                return undefined;
            });

        return data;
    }

    async function _getManyEmployeesExcel(
        filter: IEmployeesFilter
    ): Promise<boolean> {
        try {
            const params = { ...filter };

            const response = await axiosInstance.get(
                `${EmployeesEndPoint.PREFIX}/${EmployeesEndPoint.EXCEL}`,
                {
                    params,
                    responseType: "blob",
                }
            );

            const url = window.URL.createObjectURL(new Blob([response.data]));

            const link = document.createElement("a");
            link.href = url;

            const contentDisposition = response.headers["content-disposition"];
            let filename = `employees_${new Date()
                .toISOString()
                .replace(/[:.]/g, "-")}.xlsx`;
            if (contentDisposition) {
                const match = contentDisposition.match(/filename="(.+)"/);
                if (match && match[1]) {
                    filename = match[1];
                }
            }
            link.setAttribute("download", filename);

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            // Clean up the blob URL
            window.URL.revokeObjectURL(url);

            return true;
        } catch (error) {
            console.error("Error downloading Excel file:", error);
            return false;
        }
    }

    async function _getOneEmployee(id: number): Promise<IEmployee> {
        const data = await axiosInstance
            .get(`${EmployeesEndPoint.PREFIX}/${id}/`)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                console.log(error);
                return undefined;
            });

        return data;
    }

    async function _getOneEmployeeVersion(
        id: number,
        timestamp: DateTimeString
    ): Promise<IEmployeeVersion> {
        const data = await axiosInstance
            .get(
                `${EmployeesEndPoint.PREFIX}/${id}/${EmployeesEndPoint.VERSIONS}/${timestamp}/`
            )
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                console.log(error);
                return undefined;
            });

        return data;
    }

    async function _postNewEmployee(
        version: IEmployeeVersion
    ): Promise<IEmployee> {
        const body = {
            newEmployeeVersion: version,
        };

        const data = await axiosInstance
            .post(`${EmployeesEndPoint.PREFIX}/`, body)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                console.log(error);
                return undefined;
            });

        return data;
    }

    async function _patchEmployee(id: number, version: IEmployeeVersion) {
        const body = {
            newEmployeeVersion: version,
        };

        const data = await axiosInstance
            .patch(`${EmployeesEndPoint.PREFIX}/${id}/`, body)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                console.log(error);
                return undefined;
            });

        return data;
    }

    async function _deleteEmployee(id: number) {
        const data = await axiosInstance
            .delete(`${EmployeesEndPoint.PREFIX}/${id}/`)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                console.log(error);
                return undefined;
            });

        return data;
    }

    async function _deleteEmployeeVersion(
        id: number,
        timestamp: DateTimeString
    ) {
        const data = await axiosInstance
            .delete(
                `${EmployeesEndPoint.PREFIX}/${id}/${EmployeesEndPoint.VERSIONS}/${timestamp}/`
            )
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                console.log(error);
                return undefined;
            });

        return data;
    }

    async function _restoreEmployeeVersion(
        id: number,
        timestamp: DateTimeString
    ) {
        const data = await axiosInstance
            .patch(
                `${EmployeesEndPoint.PREFIX}/${id}/${EmployeesEndPoint.VERSIONS}/${timestamp}/${EmployeesEndPoint.RESTORE}/`
            )
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                console.log(error);
                return undefined;
            });

        return data;
    }

    // endregion

    useEffect(() => {
        setIsLatest(selectedTimestamp === latestTimestamp);

        console.log("selectedTimestamp", selectedTimestamp);
        console.log("latestTimestamp", latestTimestamp);
    }, [selectedEmployeeVersion]);

    async function fetchAllEmployees() {
        const page = 1;

        const data = await _getManyEmployees(page, limit, employeesListFilter);

        if (data) {
            const { results, count } = data;

            setPagesLoaded(page);
            setTotalItems(count);
            setEmployeesList(results);
        }
    }

    async function downloadAllEmployeesExcel() {
        await _getManyEmployeesExcel(employeesListFilter);
    }

    useEffect(() => {
        if (selectedId) {
            if (!employeesList.find((e) => e.id === selectedId)) {
                fetchSelectedEmployee();
            }
        }
    }, [employeesList]);

    useEffect(() => {
        const debounceTimeout = setTimeout(() => {
            fetchAllEmployees();
        }, 250);

        return () => clearTimeout(debounceTimeout);
    }, [employeesListFilter]);

    useEffect(() => {
        if (selectedId) {
            fetchSelectedEmployee();
        } else {
            navigate("/employees");
            setSelectedEmployee(null);
            setSelectedEmployeeVersion(null);
        }
    }, [selectedId]);

    useEffect(() => {
        if (selectedTimestamp) {
            fetchSelectedEmployeeVersion();
        }
    }, [selectedTimestamp]);

    async function fetchNextEmployees() {
        const page = pagesLoaded + 1;

        const data = await _getManyEmployees(page, limit, employeesListFilter);

        if (data) {
            const { results, count } = data;

            setPagesLoaded(page);
            setTotalItems(count);
            setEmployeesList([...employeesList, ...results]);
        }
    }

    async function fetchSelectedEmployee() {
        if (selectedId) {
            const data = await _getOneEmployee(selectedId);

            if (data) {
                if (!employeesList.find((e) => e.id === selectedId)) {
                    setEmployeesList([data, ...employeesList]);
                }

                setSelectedEmployee(data);
            }
        }
    }

    useEffect(() => {
        selectTimestamp(latestTimestamp);
    }, [latestTimestamp]);

    useEffect(() => {
        if (selectedEmployee) {
            const latestTimestamp = getLatestTimestamp(
                selectedEmployee.employeeVersionTimestamps
            );

            setLatestTimestamp(latestTimestamp);
        } else {
            selectTimestamp(null);
            setSelectedEmployeeVersion(null);
        }
    }, [selectedEmployee]);

    async function fetchSelectedEmployeeVersion() {
        if (selectedId && timestamp) {
            const data = await _getOneEmployeeVersion(
                selectedId,
                timestamp as DateTimeString
            );

            if (data) {
                setSelectedEmployeeVersion(data);
            }
        }
    }

    async function sendNewVersion(newVersion: IEmployeeVersion) {
        if (selectedId) {
            const version = await _patchEmployee(selectedId, newVersion);

            if (version) {
                await fetchSelectedEmployee();
            }

            return version;
        }

        return undefined;
    }

    async function sendNewEmployee(newVersion: IEmployeeVersion) {
        const employee = await _postNewEmployee(newVersion);

        if (employee) {
            setEmployeesList([employee, ...employeesList]);
            navigate(
                `/employees/${employee.id}/${employee.latestEmployeeVersion.createdAt}`
            );
        }

        return employee;
    }

    async function restoreToSelectedVersion() {
        if (selectedId && timestamp) {
            await _restoreEmployeeVersion(
                selectedId,
                timestamp as DateTimeString
            );
            if (latestTimestamp) {
                selectTimestamp(latestTimestamp);
            }
            await fetchSelectedEmployee();
        }
    }

    async function deleteSelectedVersion() {
        if (selectedId && timestamp) {
            await _deleteEmployeeVersion(
                selectedId,
                timestamp as DateTimeString
            );
            if (latestTimestamp) {
                selectTimestamp(latestTimestamp);
            }
            await fetchSelectedEmployee();
        }
    }

    async function deleteSelectedEmployee() {
        if (selectedId) {
            await _deleteEmployee(selectedId);
            selectId(null);
            await fetchAllEmployees();
        }
    }

    const context: IEmployeesContext = {
        selectId,
        selectTimestamp,
        selectedId,
        selectedTimestamp,
        latestTimestamp,
        isLatest,

        employeesListFilter,
        setEmployeesListFilter,
        employeesList,
        selectedEmployee,
        selectedEmployeeVersion,
        pagesLoaded,
        totalItems,
        limit,
        setSelectedEmployee,
        setSelectedEmployeeVersion,

        fetchAllEmployees,
        downloadAllEmployeesExcel,
        fetchNextEmployees,
        fetchSelectedEmployee,
        fetchSelectedEmployeeVersion,
        sendNewVersion,
        sendNewEmployee,
        restoreToSelectedVersion,
        deleteSelectedVersion,
        deleteSelectedEmployee,
    };

    return (
        <EmployeesContext.Provider value={context}>
            {children}
        </EmployeesContext.Provider>
    );
}

export const useEmployees = createHook(EmployeesContext);
