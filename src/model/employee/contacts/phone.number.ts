import { IPrimaryKeyed } from "@/model/primary.keyed";

export interface IPhoneNumber extends IPrimaryKeyed {
    value: string | null;
    comment: string | null;
    phoneNumberTypeId: number | null;
}
