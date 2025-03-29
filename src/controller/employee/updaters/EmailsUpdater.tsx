// import { useDisplayedEmployee } from "@/controller/employee/DisplayedEmployeeContext";
//
// import { tempIds } from "@/controller/employee/utils";
// import { Email } from "@/model";

// export function EmailsUpdater() {
//     const { displayedEmployee } = useDisplayedEmployee();
//     const { updateEmails } = useEmployeeUpdater();

//     const emails = displayedEmployee?.emails || [];

//     function newEmail(): Email {
//         return {
//             id: tempIds.generate(),
//             value: "",
//             comment: "",
//         };
//     }

//     return <>{emails.map((email) => CombinedField)}</>;
// }
