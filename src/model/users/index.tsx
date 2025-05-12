import { DateTimeString } from "@/model/basics";

export const enum UserRole {
    ADMIN = "admin",
    MANAGER = "manager",
    EDITOR = "editor",
    VIEWER = "viewer",
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
