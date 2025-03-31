import { useEmployeeEditor } from "@/controller/employee/EmployeeEditorContext";
import { Listed } from "@/view/primitives/listed/Listed";
import { EducationalInstitution } from "@/model";
import { tempIds } from "@/controller/employee/utils";
import { EducationalInstitutionField } from "@/view/employee/fields/education/EducationalInstitutionField";

export function EducationalInstitutionsList() {
    const { getList, updateList, removeFromList } = useEmployeeEditor();

    const getEducationalInstitutions = () =>
        getList<EducationalInstitution>("educationalInstitutions");

    const addEducationalInstitution = () =>
        updateList<EducationalInstitution>("educationalInstitutions", {
            id: tempIds.generate(),
            label: null,
            graduatedAt: null,
            comment: null,
        });

    const updateEducationalInstitution = (
        educationalInstitution: EducationalInstitution
    ) =>
        updateList<EducationalInstitution>(
            "educationalInstitutions",
            educationalInstitution
        );

    const removeEducationalInstitution = (
        educationalInstitution: EducationalInstitution
    ) =>
        removeFromList<EducationalInstitution>(
            "educationalInstitutions",
            educationalInstitution
        );

    return (
        <Listed
            items={getEducationalInstitutions()}
            FieldType={EducationalInstitutionField}
            get={getEducationalInstitutions}
            add={addEducationalInstitution}
            update={updateEducationalInstitution}
            remove={removeEducationalInstitution}
            title="Учебные учреждения"
        ></Listed>
    );
}
