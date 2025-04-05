import { DateTimeString } from "@/model/date.time.string";
import { IPrimaryKeyed } from "@/model/primary.keyed";
import { ITimeStamped } from "@/model/timestamped";

export interface IName extends IPrimaryKeyed, ITimeStamped {
    firstName: string | null;
    lastName: string | null;
    middleName: string | null;
}
