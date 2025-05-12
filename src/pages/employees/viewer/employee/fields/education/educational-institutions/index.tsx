import { Listed } from "@/components/listed";
import { useEditMode } from "@/contexts/employees/edit-mode";
import { useEmployeeEditor } from "@/contexts/employees/editor";
import { tempIds } from "@/contexts/employees/utils";
import { IEducationalInstitution } from "@/model";
import { EducationalInstitutionField } from "@/pages/employees/viewer/employee/fields/education/educational-institutions/list-item";

export function EducationalInstitutionsList() {
    const { getList, updateList, removeFromList } = useEmployeeEditor();
    const { editModeEnabled } = useEditMode();

    const getEducationalInstitutions = () =>
        getList<IEducationalInstitution>("educationalInstitutions");

    const getNewEducationalInstitution = () => ({
        id: tempIds.generate(),
        label: null,
        graduatedAt: null,
        comment: null,
    });

    const updateEducationalInstitution = (
        item: IEducationalInstitution | null
    ) => {
        if (item) {
            updateList<IEducationalInstitution>(
                "educationalInstitutions",
                item
            );
        }
    };

    const removeEducationalInstitution = (item: IEducationalInstitution) =>
        removeFromList<IEducationalInstitution>(
            "educationalInstitutions",
            item
        );

    return (
        <Listed<IEducationalInstitution>
            editModeEnabled={editModeEnabled}
            items={getEducationalInstitutions()}
            FieldType={EducationalInstitutionField}
            newItemGetter={getNewEducationalInstitution}
            onChange={updateEducationalInstitution}
            onDelete={removeEducationalInstitution}
            title="Учебные учреждения"
        ></Listed>
    );
}
