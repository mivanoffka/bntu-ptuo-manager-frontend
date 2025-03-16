import { Name } from "@/model/employee/common/name";
import { IHistoryItem } from "@/model/history.item";
import { Dayjs } from "dayjs";

export interface EmployeeCommon {
    name: Name;
    nameHistory: IHistoryItem<Name>[];

    birthdate: Dayjs | null;
    birthplace: string | null;
    genderId: number | null;
}

export { Name };
