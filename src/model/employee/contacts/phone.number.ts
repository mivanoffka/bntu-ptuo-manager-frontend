import { PhoneNumberType } from "@/model/employee/contacts/phone.number.type";

export interface PhoneNumber {
    id: number | null;
    value: number | null;
    type: PhoneNumberType | null;
}
