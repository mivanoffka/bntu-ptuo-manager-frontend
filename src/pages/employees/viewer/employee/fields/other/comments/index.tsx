import { Listed } from "@/components/listed";
import { useEditMode } from "@/contexts/employees/edit-mode";
import { useEmployeeEditor } from "@/contexts/employees/editor";
import { tempIds } from "@/contexts/employees/utils";
import { IComment } from "@/model";
import { CommentField } from "@/pages/employees/viewer/employee/fields/other/comments/list-item";

export function CommentsList() {
    const { getList, updateList, removeFromList } = useEmployeeEditor();
    const { editModeEnabled } = useEditMode();

    const getComments = () => getList<IComment>("comments");

    const getNewComment = () => ({
        id: tempIds.generate(),
        value: null,
    });

    const updateComment = (item: IComment | null) => {
        if (item) {
            updateList<IComment>("comments", item);
        }
    };

    const removeComment = (item: IComment) =>
        removeFromList<IComment>("comments", item);

    return (
        <Listed<IComment>
            editModeEnabled={editModeEnabled}
            items={getComments()}
            FieldType={CommentField}
            newItemGetter={getNewComment}
            onChange={updateComment}
            onDelete={removeComment}
            title="Комментарии"
        ></Listed>
    );
}
