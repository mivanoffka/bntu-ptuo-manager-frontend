import { ImageField } from "@/components/fields/image";
import { useEditMode } from "@/contexts/employees/edit-mode";
import { useEmployeeEditor } from "@/contexts/employees/editor";

export function EmployeePhotoField() {
    const { editModeEnabled } = useEditMode();

    const { getNewImage, setNewImage, getField } = useEmployeeEditor();

    const imagePath = getField<string | null>("imagePath");
    const baseImageUrl = imagePath ? `http://localhost:8000/${imagePath}` : "";

    return (
        <ImageField
            editModeEnabled={editModeEnabled}
            newImage={getNewImage()}
            setNewImage={setNewImage}
            baseImageUrl={baseImageUrl}
            width={112}
            height={150}
        ></ImageField>
    );
}
