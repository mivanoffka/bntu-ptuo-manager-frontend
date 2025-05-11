import { DateTimeString } from "@/model/date.time.string";

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
