/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import SVG7 from '../assets/SVG Components/SVG7';
import SVG8 from '../assets/SVG Components/SVG8';
import SVG6 from '../assets/SVG Components/SVG6';
import { formatDate } from '../utility';
import ArchiveNote from './atoms/ArchiveNote';
import DeleteNote from './atoms/DeleteNote';
import AssureOperation from './atoms/AssureOperation';

export default function NoteWideView({ params }) {
    const { chosen, width, handleEditNote, trackTagsChange, note } = params
    const { title = '', tags = [], content = '', lastEdited, isArchived, naew } = chosen;
    const [noteContent, setNoteContent] = useState({
        iContent: content, ititle: title, itags: tags,
    });
    const [newTag, setNewTag] = useState("");
    const [sure, setSure] = useState(false);
    const [edit, setEdit] = useState(false);
    const [uniqueName, setUniqueName] = useState(false);
    const [change, setChange] = useState(false);
    useEffect(() => {
        if (naew) {
            setChange(() => true);
            setEdit(() => true);
        } else {
            setEdit(() => false);
            setChange(false);
        }
        setNoteContent({ iContent: content, ititle: title, itags: tags });

        setNewTag("");
    }, [chosen]);
    const handleNewTag = () => {
        // make sure that tag doesn't exist already
        let nop = false;
        noteContent.itags.forEach((tq) => {
            if (tq === newTag) {
                nop = true;
            }
        });
        if (!nop) {
            setNoteContent((old) => {
                return { ...old, itags: [...old.itags, newTag] };
            });
            trackTagsChange.add.push(newTag);
        }
        setNewTag("");
    };
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
    const uniqueTitle = () => {
        let un = true;
        note.forEach((rer) => {
            if (rer.title === noteContent.ititle && rer.title !== title) {
                un = false;
            }
        });
        if (!un) {
            setNoteContent((old) => {
                return { ...old, ititle: title };
            });
            setUniqueName(true);
            setTimeout(() => {
                setUniqueName(false);
            }, 3000);
        }
        return un;
    };
    return (
        <>
            {sure && <AssureOperation sure={sure} setSure={setSure} handleEditNote={handleEditNote}  ></AssureOperation>}
            {" "}
            <div className="noteInfo">
                <input
                    type="text"
                    name=""
                    id="titleInput"
                    value={noteContent.ititle}
                    onChange={(e) => setNoteContent((old) => {
                        return { ...old, ititle: e.target.value };
                    })}
                    disabled={!edit}
                />
                {uniqueName && (<p className="uniqueTitle">please choose a unique title.</p>)}
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
                <div className="oneEd lastoneEd">
                    <p className="ponEn">
                        <img src="src\assets\images\icon-clock.svg" alt="" />
                        <span>Last Edited</span>
                    </p>
                    <p>{formatDate(lastEdited)}</p>
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
                </div>
            </div>
            <article style={{ whiteSpace: "pre-line" }} className="mainContent">
                <textarea
                    value={noteContent.iContent ?? ''}
                    onChange={(e) => {
                        setNoteContent((old) => {
                            return { ...old, iContent: e.target.value };
                        });
                    }}
                    disabled={!edit}
                    name=""
                    placeholder="press edit and start typing..."
                    id="textAreas"
                >
                    {`${noteContent.iContent}`}
                </textarea>
            </article>
            <aside className="noteAside">
                <ArchiveNote setSure={setSure} isArchived={isArchived} width={width} title={title} ></ArchiveNote>
                <DeleteNote setSure={setSure} width={width} title={title} ></DeleteNote>
            </aside>
            {change && (<footer>
                {" "}
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
            </footer>)}
        </>
    )
}
