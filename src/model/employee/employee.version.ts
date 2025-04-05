import { IRelative, IReward } from "@/model/employee/other";
import { IBntuPosition } from "@/model/employee/bntu";
import { IName } from "@/model/employee/common";
import { IAddress, IEmail, IPhoneNumber } from "@/model/employee/contacts";
import {
    ITradeUnionDepartmentRecord,
    ITradeUnionPosition,
    IWorkingGroupRecord,
} from "@/model/employee/trade-union";
import { DateTimeString } from "@/model/date.time.string";
import { IEducationalInstitution } from "@/model/employee/education/educational.institution";
import { IPrimaryKeyed } from "@/model/primary.keyed";
import { ITimeStamped } from "@/model/timestamped";

export interface IEmployeeVersion extends IPrimaryKeyed, ITimeStamped {
    [key: string]: any;

    // Common

    names: IName[];

    birthdate: DateTimeString | null;
    birthplace: string | null;
    genderId: number | null;

    // BNTU

    bntuPositions: IBntuPosition[];

    // TradeUnion

    tradeUnionPositions: ITradeUnionPosition[];
    tradeUnionDepartmentRecord: ITradeUnionDepartmentRecord[];
    workingGroupRecords: IWorkingGroupRecord[];

    joinedAt: DateTimeString | null;
    isArchived: boolean | null;
    archivedAt: DateTimeString | null;
    isRetired: boolean | null;
    retiredAt: DateTimeString | null;

    // Contacts

    phoneNumbers: IPhoneNumber[];
    emails: IEmail[];
    addresses: IAddress[];

    // Education

    educationInstitutions: IEducationalInstitution[];
    academicDegreeId: number | null;
    educationLevelId: number | null;

    // Other

    relatives: IRelative[];
    rewards: IReward[];
    comments: Comment[];
}
