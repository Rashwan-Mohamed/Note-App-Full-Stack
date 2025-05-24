
import React, { useState } from 'react'
import SVG6 from '../../assets/SVG Components/SVG6';
import { useViewContext } from '../../contexts/ViewNoteConext';

export default function AddNewTag() {
    const { noteContent, handleNewTag, setNoteContent, trackTagsChange, newTag, setNewTag, edit } = useViewContext();
    const handleRemoveTag = (t) => {
        let tes = noteContent.itags.filter((no) => no !== t);
        setNoteContent((old) => {
            return { ...old, itags: tes };
        });
        trackTagsChange.remove.push(t);
    };

    const handleEnterPress = (event) => {
        if (event.key === "Enter") {
            handleNewTag();
        }
    };
    return (
        <div className="oneEd">
            <p className="ponEn">
                <SVG6></SVG6>
                <span>Tags</span>
            </p>

            {!edit ? (<p>{noteContent.itags.join(", ")}</p>) : (<>
                <div className="tagsWrapper">
                    {noteContent.itags.map((t) => {
                        return (<div
                            key={t}
                            onClick={() => {
                                handleRemoveTag(t);
                            }}
                            className="tGAS"
                        >
                            {t}
                            <span>x</span>
                        </div>);
                    })}
                    <input
                        type="text"
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        className="addTag"
                        onKeyDown={handleEnterPress}
                    />
                </div>
            </>)}



        </div>
    )
}
