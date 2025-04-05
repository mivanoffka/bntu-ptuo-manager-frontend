import { IPrimaryKeyed } from "@/model/primary.keyed";

export interface IComment extends IPrimaryKeyed {
    value: string | null;
}
