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

export interface IPaginatedData<T> {
    results: T[];
    count: number;
    next: string | null;
    previous: string | null;
}

export interface IEmployeesContext {
    employeesListFilter: IEmployeesFilter;
    setEmployeesListFilter: (filter: IEmployeesFilter) => void;
    employeesList: IEmployee[];
    selectedId: number | null;
    selectedEmployee: IEmployee | null;
    setSelectedEmployee: (employee: IEmployee) => void;
    selectedEmployeeVersion: IEmployeeVersion | null;
    setSelectedEmployeeVersion: (version: IEmployeeVersion) => void;
    pagesLoaded: number;
    limit: number;
    totalItems: number;

    fetchAllEmployees: () => Promise<void>;
    fetchNextEmployees: () => Promise<void>;
    fetchSelectedEmployee: () => Promise<void>;
    fetchSelectedEmployeeVersion: () => Promise<void>;
    sendNewEmployee: (version: IEmployeeVersion) => Promise<void>;
    sendNewVersion: (version: IEmployeeVersion) => Promise<void>;
    restoreToSelectedVersion: () => Promise<void>;
}

export const EmployeesContext = createContext<IEmployeesContext>({
    employeesListFilter: DEFAULT_FILTER,
    setEmployeesListFilter: (filter: IEmployeesFilter) => {},
    employeesList: [],
    selectedId: null,
    selectedEmployee: null,
    setSelectedEmployee: () => {},
    selectedEmployeeVersion: null,
    setSelectedEmployeeVersion: () => {},
    pagesLoaded: 0,
    limit: 15,
    totalItems: 0,

    fetchAllEmployees: async () => {},
    fetchNextEmployees: async () => {},
    fetchSelectedEmployee: async () => {},
    fetchSelectedEmployeeVersion: async () => {},
    sendNewEmployee: async () => {},
    sendNewVersion: async () => {},
    restoreToSelectedVersion: async () => {},
});

export function EmployeesProvider({ children }: { children: ReactNode }) {
    const { id, timestamp } = useParams();
    const selectedId = id ? parseInt(id) : null;
    const navigate = useNavigate();

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
            .post(
                `${EmployeesEndPoint.PREFIX}/${id}/${EmployeesEndPoint.RESTORE}/${timestamp}/`
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
        }
    }, [selectedId]);

    useEffect(() => {
        if (timestamp) {
            fetchSelectedEmployeeVersion();
        }
    }, [timestamp]);

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
        if (selectedEmployee) {
            const latestTimestamp = getLatestTimestamp(
                selectedEmployee.employeeVersionTimestamps
            );

            navigate(`/employees/${selectedEmployee.id}/${latestTimestamp}`);
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
            await _patchEmployee(selectedId, newVersion);
            await fetchSelectedEmployee();
        }
    }

    async function sendNewEmployee(newVersion: IEmployeeVersion) {
        const employee = await _postNewEmployee(newVersion);

        if (employee) {
            setEmployeesList([employee, ...employeesList]);
            navigate(
                `/employees/${employee.id}/${employee.latestEmployeeVersion.createdAt}`
            );
        }
    }

    async function restoreToSelectedVersion() {
        if (selectedId && timestamp) {
            await _restoreEmployeeVersion(
                selectedId,
                timestamp as DateTimeString
            );
            await fetchSelectedEmployee();
        }
    }

    const context: IEmployeesContext = {
        employeesListFilter,
        setEmployeesListFilter,
        employeesList,
        selectedId,
        selectedEmployee,
        selectedEmployeeVersion,
        pagesLoaded,
        totalItems,
        limit,
        setSelectedEmployee,
        setSelectedEmployeeVersion,

        fetchAllEmployees,
        fetchNextEmployees,
        fetchSelectedEmployee,
        fetchSelectedEmployeeVersion,
        sendNewVersion,
        sendNewEmployee,
        restoreToSelectedVersion,
    };

    return (
        <EmployeesContext.Provider value={context}>
            {children}
        </EmployeesContext.Provider>
    );
}

export const useEmployees = createHook(EmployeesContext);
