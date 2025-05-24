import {useViewContext} from "../../contexts/ViewNoteConext.jsx";

export default function EditBtn() {
    const {setChange, uniqueTitle, edit, handleNewTag, setEdit, newTag} = useViewContext()
    return (
        <>
            <button
                onClick={() => {
                    setChange(() => true);
                    if (edit) {
                        uniqueTitle();
                    }
                    if (newTag) {
                        handleNewTag();
                    }
                    setEdit(!edit);
                }}
                className="editNote"
            >
                {edit ? "Stop Editing" : "Edit"}
            </button>
        </>
    )
}
