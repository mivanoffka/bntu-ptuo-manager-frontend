import { useEmployeeEditor } from "@/controller/employee/EmployeeEditorContext";
import { Listed } from "@/view/primitives/listed/Listed";
import { Comment } from "@/model";
import { tempIds } from "@/controller/employee/utils";
import { CommentField } from "@/view/employee/fields/other/CommentField";

export function CommentsList() {
    const { getList, updateList, removeFromList } = useEmployeeEditor();

    const getComments = () => getList<Comment>("comments");

    const addComment = () =>
        updateList<Comment>("comments", {
            id: tempIds.generate(),
            value: null,
        });

    const updateComment = (comment: Comment) =>
        updateList<Comment>("comments", comment);

    const removeComment = (comment: Comment) =>
        removeFromList<Comment>("comments", comment);

    return (
        <Listed
            items={getComments()}
            FieldType={CommentField}
            get={getComments}
            add={addComment}
            update={updateComment}
            remove={removeComment}
            title="Комментарии"
        ></Listed>
    );
}
