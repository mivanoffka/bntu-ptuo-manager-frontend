import { IPrimaryKeyed } from "@/model/primary.keyed";

export interface IAddress extends IPrimaryKeyed {
    value: string | null;
    comment: string | null;
}
