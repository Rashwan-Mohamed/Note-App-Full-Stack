import React from 'react'
import { useViewContext } from '../../contexts/ViewNoteConext';

export default function ChangeTitle() {
    const { noteContent, setNoteContent, edit, uniqueName } = useViewContext()
    return (
        <>
            <input
                type="text"
                name=""
                id="titleInput"
                value={noteContent.ititle}
                onChange={(e) =>
                    setNoteContent((old) => {
                        return { ...old, ititle: e.target.value };
                    })
                }
                disabled={!edit}
            />
            {uniqueName && (<p className="uniqueTitle">please choose a unique title.</p>)}
        </>
    )
}
