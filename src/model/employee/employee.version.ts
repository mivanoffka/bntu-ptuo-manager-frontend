import { IRelative, IReward } from "@/model/employee/other";
import { IBntuPosition } from "@/model/employee/bntu";
import { IAddress, IEmail, IPhoneNumber } from "@/model/employee/contacts";
import { ITradeUnionPosition } from "@/model/employee/trade-union";
import { DateTimeString } from "@/model/date.time.string";
import { IEducationalInstitution } from "@/model/employee/education/educational.institution";
import { IPrimaryKeyed } from "@/model/primary.keyed";
import { ITimeStamped } from "@/model/timestamped";

export interface IEmployeeVersion extends IPrimaryKeyed, ITimeStamped {
    [key: string]: any;

    // Common

    firstName: string | null;
    middleName: string | null;
    lastName: string | null;

    birthdate: DateTimeString | null;
    birthplace: string | null;
    genderId: number | null;

    imagePath: string | null;

    // BNTU

    bntuPositions: IBntuPosition[];

    // TradeUnion

    tradeUnionPositions: ITradeUnionPosition[];
    tradeUnionDepartmentAuthenticLabel: string | null;
    tradeUnionDepartmentPath: string | null;
    workingGroupId: number | null;

    joinedAt: DateTimeString | null;
    recordedAt: DateTimeString | null;
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
