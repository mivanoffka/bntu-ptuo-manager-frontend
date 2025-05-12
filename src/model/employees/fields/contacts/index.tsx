import { IPrimaryKeyed, IEnumerated } from "@/model/basics";

export interface IAddress extends IPrimaryKeyed {
    value: string | null;
    comment: string | null;
}

export interface IEmail extends IPrimaryKeyed {
    value: string | null;
    comment: string | null;
}

export interface IPhoneNumber extends IPrimaryKeyed {
    value: string | null;
    comment: string | null;
    phoneNumberTypeId: number | null;
}

export interface PhoneNumberType extends IEnumerated {}
