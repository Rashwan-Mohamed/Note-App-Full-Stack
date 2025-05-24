/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import UseWidth from "../hooks/UseWidth.jsx";
import { formatDate } from "../utility.js";
import SVG2 from "../assets/SVG Components/SVG2.jsx";
import SVG3 from "../assets/SVG Components/SVG3.jsx";
import SVG4 from "../assets/SVG Components/SVG4.jsx";
import SVG5 from "../assets/SVG Components/SVG5.jsx";
import SVG6 from "../assets/SVG Components/SVG6.jsx";
import SVG7 from "../assets/SVG Components/SVG7.jsx";
import SVG8 from "../assets/SVG Components/SVG8.jsx";
import AssureOperation from "./AssureOperation.jsx";


function ViewNote({
    chosen,
    handleEditNote,
    note,
    chosState,
    setShowNote,
    showNote,
    trackTagsChange
}) {
    const { title = '', tags = [], content = '', lastEdited, isArchived, naew } = chosen;
    const [noteContent, setNoteContent] = useState({
        iContent: content, ititle: title, itags: tags,
    });
    const [newTag, setNewTag] = useState("");
    const [sure, setSure] = useState(false);
    const [edit, setEdit] = useState(false);
    const [uniqueName, setUniqueName] = useState(false);
    const [change, setChange] = useState(false);
    const width = UseWidth();

    // reload the noteContent hook when note is updated
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
    if (!chosen) {
        return (<section className="mino">
            <article style={{ whiteSpace: "pre-line" }} className="mainContent">
                NO NOTES MATCH THIS CRITERIA
            </article>
        </section>);
    }
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

    return (<section className={"mino"}>
        {sure && <AssureOperation sure={sure} setSure={setSure} handleEditNote={handleEditNote} ></AssureOperation>}
        {width < 768 ? (<>
            <header>
                <button onClick={() => setShowNote(false)} className="goBackNote">
                    <SVG2></SVG2>
                    {" "}
                    <span>Go Back</span>
                </button>
                <div className="stuffNote">
                    <button
                        onClick={() => {
                            setSure({
                                title: title, operation: isArchived ? "Un-Archive" : "archieve", content: "",
                            });
                        }}
                        className="asideBtns"
                    >
                        <SVG3></SVG3>
                        {width > 1025 ? (<span> {isArchived ? "Un-Archive" : "Archive"} Note</span>) : ("")}
                    </button>
                    <button
                        onClick={() => {
                            setSure({ title: title, operation: "delete", content: "" });
                        }}
                        className="asideBtns"
                    >
                        <SVG4></SVG4>
                        {width > 1025 ? <span> Delete Note</span> : ""}
                    </button>
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

                    {change && (<section className="twinBrothers">
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
                    </section>)}
                </div>
            </header>
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
                        <SVG5></SVG5>
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
                </div>
            </div>
            <article style={{ whiteSpace: "pre-line" }} className="mainContent">
                <textarea
                    value={noteContent.iContent}
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
        </>) : (<>
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
                <button
                    onClick={() => {
                        setSure({
                            title: title, operation: isArchived ? "Un-Archive" : "archieve", content: "",
                        });
                    }}
                    className="asideBtns"
                >
                    <SVG7></SVG7>
                    {width > 1025 ? (<span> {isArchived ? "Un-Archive" : "Archive"} Note</span>) : ("")}
                </button>
                <button
                    onClick={() => {
                        setSure({ title: title, operation: "delete", content: "" });
                    }}
                    className="asideBtns"
                >
                    <SVG8></SVG8>

                    {width > 1025 ? <span> Delete Note</span> : ""}
                </button>
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
        </>)}
    </section>);
}

export default ViewNote;
