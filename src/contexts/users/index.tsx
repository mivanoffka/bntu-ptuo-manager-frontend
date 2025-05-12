import { createContext, useState, useEffect, ReactNode } from "react";
import { createHook } from "@/contexts/utils";
import { useApi } from "@/contexts/api";
import { UsersEndPoint } from "@/contexts/users/constants";
import { UserRole, IUser, IUsersFilter } from "@/model";

interface IUsersContext {
    loading: boolean;
    error: string | null;

    fetchAllUsers: () => Promise<void>;
    fetchNextUsers: () => Promise<void>;
    updateUserRole: (id: number, role: UserRole) => Promise<void>;
    usersTotalItems: number;
    usersPagesLoaded: number;
    usersLimit: number;
    users: IUser[];

    fetchAllUnverifiedUsers: () => Promise<void>;
    fetchNextUnverifiedUsers: () => Promise<void>;
    verifyUser: (id: number) => Promise<void>;
    declineUser: (id: number) => Promise<void>;
    unverifiedUsersTotalItems: number;
    unverifiedUsersPagesLoaded: number;
    unverifiedUsersLimit: number;
    unverifiedUsers: IUser[];
}

const Users = createContext<IUsersContext | undefined>(undefined);

export const UsersProvider = ({ children }: { children: ReactNode }) => {
    const { axiosInstance } = useApi();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [users, setUsers] = useState<IUser[]>([]);
    const [usersPagesLoaded, setUsersPagesLoaded] = useState(0);
    const [usersLimit, setUsersLimit] = useState(15);
    const [usersTotalItems, setUsersTotalItems] = useState(0);

    const [unverifiedUsers, setUnverifiedUsers] = useState<IUser[]>([]);
    const [unverifiedUsersPagesLoaded, setUnverifiedUsersPagesLoaded] =
        useState(0);
    const [unverifiedUsersLimit, setUnverifiedUsersLimit] = useState(15);
    const [unverifiedUsersTotalItems, setUnverifiedUsersTotalItems] =
        useState(0);

    async function _getManyUsers(
        page: number,
        limit: number,
        filter: IUsersFilter
    ) {
        const params = {
            page,
            limit,
            ...filter,
        };

        setLoading(true);
        setError(null);
        try {
            const response = await axiosInstance.get(UsersEndPoint.PREFIX, {
                params,
            });

            return response.data;
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    async function _patchUserRole(id: number, role: UserRole) {
        setLoading(true);
        setError(null);

        const body = {
            role,
        };

        try {
            const response = await axiosInstance.patch(
                `${UsersEndPoint.PREFIX}/${id}/${UsersEndPoint.ROLE}/`,
                body
            );

            return response.data;
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    async function _verifyUser(id: number) {
        setLoading(true);
        setError(null);

        try {
            const response = await axiosInstance.patch(
                `${UsersEndPoint.PREFIX}/${id}/${UsersEndPoint.VERIFY}/`
            );

            return response.data;
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    async function _declineUser(id: number) {
        setLoading(true);
        setError(null);

        try {
            const response = await axiosInstance.delete(
                `${UsersEndPoint.PREFIX}/${id}/${UsersEndPoint.DECLINE}/`
            );
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    async function fetchAllUsers() {
        const page = 1;

        const data = await _getManyUsers(page, usersLimit, {
            isVerified: true,
        });

        if (data) {
            const { results, count } = data;

            setUsersPagesLoaded(page);
            setUsersTotalItems(count);
            setUsers(results);
        }
    }

    async function fetchNextUsers() {
        const page = usersPagesLoaded + 1;

        const data = await _getManyUsers(page, usersLimit, {
            isVerified: true,
        });

        if (data) {
            const { results, count } = data;

            setUsersPagesLoaded(page);
            setUsersTotalItems(count);
            setUsers([...users, ...results]);
        }
    }

    async function updateUserRole(id: number, role: UserRole) {
        await _patchUserRole(id, role);
        await fetchAllUsers();
    }

    async function verifyUser(id: number) {
        await _verifyUser(id);

        await fetchAllUnverifiedUsers();
        await fetchAllUsers();
    }

    async function declineUser(id: number) {
        await _declineUser(id);

        await fetchAllUnverifiedUsers();
        await fetchAllUsers();
    }

    async function fetchAllUnverifiedUsers() {
        const page = 1;

        const data = await _getManyUsers(page, usersLimit, {
            isVerified: false,
        });

        if (data) {
            const { results, count } = data;

            setUnverifiedUsersPagesLoaded(page);
            setUnverifiedUsersTotalItems(count);
            setUnverifiedUsers(results);
        }
    }

    async function fetchNextUnverifiedUsers() {
        const page = unverifiedUsersPagesLoaded + 1;

        const data = await _getManyUsers(page, usersLimit, {
            isVerified: false,
        });

        if (data) {
            const { results, count } = data;

            setUnverifiedUsersPagesLoaded(page);
            setUnverifiedUsersTotalItems(count);
            setUnverifiedUsers([...users, ...results]);
        }
    }

    useEffect(() => {
        fetchAllUsers();
        fetchAllUnverifiedUsers();
    }, []);

    const context: IUsersContext = {
        loading,
        error,

        fetchAllUsers,
        fetchNextUsers,
        updateUserRole,
        usersTotalItems,
        usersLimit,
        usersPagesLoaded,
        users,

        fetchAllUnverifiedUsers,
        fetchNextUnverifiedUsers,
        verifyUser,
        declineUser,
        unverifiedUsers,
        unverifiedUsersTotalItems,
        unverifiedUsersLimit,
        unverifiedUsersPagesLoaded,
    };

    return <Users.Provider value={context}>{children}</Users.Provider>;
};

export const useUsers = createHook(Users);
