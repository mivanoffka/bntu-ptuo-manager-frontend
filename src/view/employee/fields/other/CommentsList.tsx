import { Listed } from "@/view/primitives/listed/Listed";
import { IComment } from "@/model";
import { tempIds } from "@/controller/employee/utils";
import { CommentField } from "@/view/employee/fields/other/CommentField";
import { useEmployeeEditor } from "@/controller/employee";

export function CommentsList() {
    const { getList, updateList, removeFromList } = useEmployeeEditor();

    const getComments = () => getList<IComment>("comments");

    const addComment = () =>
        updateList<IComment>("comments", {
            id: tempIds.generate(),
            value: null,
        });

    const updateComment = (comment: IComment) =>
        updateList<IComment>("comments", comment);

    const removeComment = (comment: IComment) =>
        removeFromList<IComment>("comments", comment);

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
