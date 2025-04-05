import { DateTimeString } from "@/model/date.time.string";
import { IEmployeeVersion } from "@/model/employee/employee.version";
import { IPrimaryKeyed } from "@/model/primary.keyed";

export interface IEmployee extends IPrimaryKeyed {
    employeeVersionTimestamps: DateTimeString[];
    latestEmployeeVersion: IEmployeeVersion;
}
