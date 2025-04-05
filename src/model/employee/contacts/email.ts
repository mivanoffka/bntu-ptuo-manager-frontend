import { IPrimaryKeyed } from "@/model/primary.keyed";

export interface IEmail extends IPrimaryKeyed {
    value: string | null;
    comment: string | null;
}
