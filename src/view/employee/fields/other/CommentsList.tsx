import { Listed } from "@/view/primitives/listed/Listed";
import { IComment } from "@/model";
import { tempIds } from "@/controller/employee/utils";
import { CommentField } from "@/view/employee/fields/other/CommentField";
import { useEmployeeEditor } from "@/controller/employee";

export function CommentsList() {
    const { getList, updateList, removeFromList } = useEmployeeEditor();

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
            items={getComments()}
            FieldType={CommentField}
            newItemGetter={getNewComment}
            onChange={updateComment}
            onDelete={removeComment}
            title="Комментарии"
        ></Listed>
    );
}
