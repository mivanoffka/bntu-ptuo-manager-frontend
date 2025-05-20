import { DateTimeString } from "@/model/basics";

export const enum UserRole {
    ADMIN = "admin",
    MANAGER = "manager",
    EDITOR = "editor",
    VIEWER = "viewer",
    UNAUTHORIZED = "unauthorized",
}

export interface IUser {
    id: number;
    username: string;
    dateJoined: DateTimeString;
    role: UserRole;
    isVerified: boolean;
}

export interface IUsersFilter {
    search?: string;
    role?: string;
    isVerified?: boolean;
}

export const USER_GROUPS = {
    [UserRole.ADMIN]: [UserRole.ADMIN],
    [UserRole.MANAGER]: [UserRole.ADMIN, UserRole.MANAGER],
    [UserRole.EDITOR]: [UserRole.ADMIN, UserRole.MANAGER, UserRole.EDITOR],
    [UserRole.VIEWER]: [
        UserRole.ADMIN,
        UserRole.MANAGER,
        UserRole.EDITOR,
        UserRole.VIEWER,
    ],
    [UserRole.UNAUTHORIZED]: [],
};
