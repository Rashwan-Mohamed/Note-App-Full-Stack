import React from 'react'

export default function TwinBrothers({ setChange, setEdit, newTag, handleNewTag, uniqueTitle }) {
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
