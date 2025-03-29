import { Relative, Reward } from "@/model/employee/other";
import { BntuPosition } from "@/model/employee/bntu";
import { Gender, Name } from "@/model/employee/common";
import { Address, Email, PhoneNumber } from "@/model/employee/contacts";
import { EducationLevel, AcademicDegree } from "@/model/employee/education";
import { TradeUnionPosition } from "@/model/employee/trade-union";
import { History } from "@/model/history";
import { DateTimeString } from "@/model/date.time.string";
import { EducationalInstitution } from "@/model/employee/education/educational.institution";

export interface Employee {
    [key: string]: any;

    id: number | null;

    // Common

    names: History<Name>;

    birthdate: DateTimeString | null;
    birthplace: string | null;
    gender: Gender | null;

    // BNTU

    bntuPositions: BntuPosition[];

    // TradeUnion

    tradeUnionPositions: TradeUnionPosition[];
    joinedAt: DateTimeString | null;
    isArchived: boolean | null;
    archivedAt: DateTimeString | null;
    isRetired: boolean | null;
    retiredAt: DateTimeString | null;

    // Contacts

    phoneNumbers: PhoneNumber[];
    emails: Email[];
    addresses: Address[];

    // Education

    educationInstitutions: EducationalInstitution[];
    academicDegree: AcademicDegree | null;
    educationLevel: EducationLevel | null;

    // Other

    relatives: Relative[];
    rewards: Reward[];
    comments: Comment[];
}
