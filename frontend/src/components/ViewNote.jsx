import {useEffect, useState} from "react";
import UseWidth from "../UseWidth.jsx";
import {formatDate} from "../utility.js";

function ViewNote({
                      chosen,
                      handleEditNote,
                      note,
                      chosState,
                      setShowNote,
                      showNote,
                      trackTagsChange
                  }) {
    const {title = '', tags = [], content = '', lastEdited, isArchived, naew} = chosen;
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
        setNoteContent({iContent: content, ititle: title, itags: tags});

        setNewTag("");
    }, [chosen]);
    if (!chosen) {
        return (<section className="mino">
            <article style={{whiteSpace: "pre-line"}} className="mainContent">
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
                return {...old, itags: [...old.itags, newTag]};
            });
            trackTagsChange.add.push(newTag);
        }
        setNewTag("");
    };
    const handleRemoveTag = (t) => {
        let tes = noteContent.itags.filter((no) => no !== t);
        setNoteContent((old) => {
            return {...old, itags: tes};
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
                return {...old, ititle: title};
            });
            setUniqueName(true);
            setTimeout(() => {
                setUniqueName(false);
            }, 3000);
        }
        return un;
    };

    return (<section className={"mino"}>
        {sure && (<div className="wrapperLay">
            {" "}
            <section className="finalWarning">
                <p>
                    are you sure you want to{" "}
                    {sure.operation === "edit" ? "save" : sure.operation} this note ?
                </p>
                <div className="sureBtns">
                    <button
                        className="ftbtn suDo"
                        onClick={() => {
                            handleEditNote(sure.title, sure.operation, sure.payload);
                            setSure(null);
                        }}
                    >
                        {sure.operation === "edit" ? "save" : sure.operation}
                    </button>
                    <button
                        className="ftbtn fotbtncn"
                        onClick={() => {
                            setSure(null);
                        }}
                    >
                        Cancel
                    </button>
                </div>
            </section>
        </div>)}
        {width < 768 ? (<>
            <header>
                <button onClick={() => setShowNote(false)} className="goBackNote">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <path
                            fill="#525866"
                            fillRule="evenodd"
                            d="M15.75 20.414 7.336 12l8.414-8.414L17.164 5l-7 7 7 7-1.414 1.414Z"
                            clipRule="evenodd"
                        />
                    </svg>
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
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke="#e0e4ea"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1.5"
                                d="M21 7.782v8.435C21 19.165 18.919 21 15.974 21H8.026C5.081 21 3 19.165 3 16.216V7.782C3 4.834 5.081 3 8.026 3h7.948C18.919 3 21 4.843 21 7.782Z"
                            />
                            <path
                                stroke="#e0e4ea"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1.5"
                                d="m15 14-3.002 3L9 14M11.998 17v-7M20.934 7H3.059"
                            />
                        </svg>
                        {width > 1025 ? (<span> {isArchived ? "Un-Archive" : "Archive"} Note</span>) : ("")}
                    </button>
                    <button
                        onClick={() => {
                            setSure({title: title, operation: "delete", content: ""});
                        }}
                        className="asideBtns"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="25"
                            fill="none"
                            viewBox="0 0 24 25"
                        >
                            <path
                                stroke="#e0e4ea"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1.5"
                                d="m14.852 3.879.818 1.785h2.64c.811 0 1.47.658 1.47 1.47V8.22c0 .555-.45 1.005-1.006 1.005H5.005C4.45 9.226 4 8.776 4 8.221V7.133c0-.811.658-1.47 1.47-1.47h2.639l.818-1.784c.246-.536.78-.879 1.37-.879h3.185c.59 0 1.125.343 1.37.879ZM18.24 9.3v8.686c0 1.665-1.333 3.014-2.977 3.014H8.517c-1.644 0-2.977-1.349-2.977-3.014V9.301M10.2 12.816v4.509m3.38-4.509v4.509"
                            />
                        </svg>

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
                        return {...old, ititle: e.target.value};
                    })}
                    disabled={!edit}
                />
                {uniqueName && (<p className="uniqueTitle">please choose a unique title.</p>)}
                <div className="oneEd">
                    <p className="ponEn">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke="#2b303b"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1.8"
                                d="M3.016 5.966c.003-1.411 1.07-2.677 2.456-2.916.284-.05 3.616-.042 4.995-.041 1.364 0 2.527.491 3.49 1.452 2.045 2.042 4.088 4.085 6.128 6.13 1.208 1.21 1.224 3.066.022 4.28a805.496 805.496 0 0 1-5.229 5.228c-1.212 1.201-3.069 1.186-4.279-.022-2.064-2.058-4.127-4.115-6.182-6.182-.795-.8-1.264-1.766-1.368-2.895-.084-.903-.035-4.26-.033-5.034Z"
                                clipRule="evenodd"
                            />
                            <path
                                stroke="#2b303b"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1.8"
                                d="M9.907 8.315a1.607 1.607 0 0 1-1.61 1.583c-.872-.002-1.599-.73-1.594-1.596a1.604 1.604 0 0 1 1.633-1.607c.864.003 1.575.736 1.571 1.62Z"
                                clipRule="evenodd"
                            />
                        </svg>
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
                        <img src="src\assets\images\icon-clock.svg" alt=""/>
                        <span>Last Edited</span>
                    </p>
                    <p>{formatDate(lastEdited)}</p>
                </div>
            </div>
            <article style={{whiteSpace: "pre-line"}} className="mainContent">
                        <textarea
                            value={noteContent.iContent}
                            onChange={(e) => {
                                setNoteContent((old) => {
                                    return {...old, iContent: e.target.value};
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
                        return {...old, ititle: e.target.value};
                    })}
                    disabled={!edit}
                />
                {uniqueName && (<p className="uniqueTitle">please choose a unique title.</p>)}
                <div className="oneEd">
                    <p className="ponEn">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke="#2b303b"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1.8"
                                d="M3.016 5.966c.003-1.411 1.07-2.677 2.456-2.916.284-.05 3.616-.042 4.995-.041 1.364 0 2.527.491 3.49 1.452 2.045 2.042 4.088 4.085 6.128 6.13 1.208 1.21 1.224 3.066.022 4.28a805.496 805.496 0 0 1-5.229 5.228c-1.212 1.201-3.069 1.186-4.279-.022-2.064-2.058-4.127-4.115-6.182-6.182-.795-.8-1.264-1.766-1.368-2.895-.084-.903-.035-4.26-.033-5.034Z"
                                clipRule="evenodd"
                            />
                            <path
                                stroke="#2b303b"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1.8"
                                d="M9.907 8.315a1.607 1.607 0 0 1-1.61 1.583c-.872-.002-1.599-.73-1.594-1.596a1.604 1.604 0 0 1 1.633-1.607c.864.003 1.575.736 1.571 1.62Z"
                                clipRule="evenodd"
                            />
                        </svg>
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
                        <img src="src\assets\images\icon-clock.svg" alt=""/>
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
            <article style={{whiteSpace: "pre-line"}} className="mainContent">
                        <textarea
                            value={noteContent.iContent ?? ''}
                            onChange={(e) => {
                                setNoteContent((old) => {
                                    return {...old, iContent: e.target.value};
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
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke="#e0e4ea"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="M21 7.782v8.435C21 19.165 18.919 21 15.974 21H8.026C5.081 21 3 19.165 3 16.216V7.782C3 4.834 5.081 3 8.026 3h7.948C18.919 3 21 4.843 21 7.782Z"
                        />
                        <path
                            stroke="#e0e4ea"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="m15 14-3.002 3L9 14M11.998 17v-7M20.934 7H3.059"
                        />
                    </svg>
                    {width > 1025 ? (<span> {isArchived ? "Un-Archive" : "Archive"} Note</span>) : ("")}
                </button>
                <button
                    onClick={() => {
                        setSure({title: title, operation: "delete", content: ""});
                    }}
                    className="asideBtns"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="25"
                        fill="none"
                        viewBox="0 0 24 25"
                    >
                        <path
                            stroke="#e0e4ea"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="m14.852 3.879.818 1.785h2.64c.811 0 1.47.658 1.47 1.47V8.22c0 .555-.45 1.005-1.006 1.005H5.005C4.45 9.226 4 8.776 4 8.221V7.133c0-.811.658-1.47 1.47-1.47h2.639l.818-1.784c.246-.536.78-.879 1.37-.879h3.185c.59 0 1.125.343 1.37.879ZM18.24 9.3v8.686c0 1.665-1.333 3.014-2.977 3.014H8.517c-1.644 0-2.977-1.349-2.977-3.014V9.301M10.2 12.816v4.509m3.38-4.509v4.509"
                        />
                    </svg>

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
