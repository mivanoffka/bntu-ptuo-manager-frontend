import { Relative, Reward } from "@/model/employee/other";
import { BntuPosition } from "@/model/employee/bntu";
import { Genders, Name } from "@/model/employee/common";
import { Address, Email, PhoneNumber } from "@/model/employee/contacts";
import { EducationLevels, AcademicDegrees } from "@/model/employee/education";
import { TradeUnionPosition } from "@/model/employee/trade-union";
import { History } from "@/model/history";
import { Dayjs } from "dayjs";

export interface IEmployee {
    id: number | null;

    // Common

    names: History<Name>[];

    birthdate: Dayjs | null;
    birthplace: string | null;
    gender: Genders | null;

    // BNTU

    bntuPositions: BntuPosition[];

    // TradeUnion

    tradeUnionPositions: TradeUnionPosition[];
    joinedAt: Dayjs | null;
    isArchived: boolean | null;
    archivedAt: Dayjs | null;
    isRetired: boolean | null;
    retiredAt: Dayjs | null;

    // Contacts

    phoneNumbers: PhoneNumber[];
    emails: Email[];
    addresses: Address[];

    // Education

    graduatedFrom: string[];
    academicDegree: AcademicDegrees;
    educationLevel: EducationLevels;

    // Other

    relatives: Relative[];
    rewards: Reward[];
    comments: Comment[];
}
