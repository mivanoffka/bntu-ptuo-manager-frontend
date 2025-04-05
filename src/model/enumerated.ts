import { IPrimaryKeyed } from "@/model/primary.keyed";

export interface IEnumerated extends IPrimaryKeyed {
    label: string;
}
