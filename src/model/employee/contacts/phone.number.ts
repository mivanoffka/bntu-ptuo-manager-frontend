import { PhoneNumberType } from "@/model/employee/contacts/phone.number.type";

export interface PhoneNumber {
    id: number | null;
    number: number | null;
    type: PhoneNumberType | null;
}
