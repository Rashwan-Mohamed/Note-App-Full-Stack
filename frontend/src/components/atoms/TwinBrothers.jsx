
import React from 'react'
import { useViewContext } from '../../contexts/ViewNoteConext';

export default function TwinBrothers() {
    const { setNoteContent, chosen, noteContent, setChange, setEdit, newTag, handleNewTag, uniqueTitle, handleEditNote } = useViewContext()
    const { title = '', tags = [], content = '', lastEdited, isArchived, naew } = chosen;

    return (
        <>
            <button
                onClick={() => {
                    setChange(false);
                    setEdit(false);
                    if (newTag) {
                        handleNewTag();
                    }
                    if (uniqueTitle()) {
                        handleEditNote(title, "edit", noteContent);
                    }
                }}
                className="ftbtn fotbtnsv"
            >
                Save Note
            </button>
            <button
                onClick={() => {
                    setChange(false);
                    setEdit(false);
                    setNoteContent({
                        iContent: content, ititle: title, itags: tags,
                    });
                }}
                className="ftbtn fotbtncn"
            >
                Cancel
            </button>
        </>
    )
}
