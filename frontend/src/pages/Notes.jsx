import {useEffect, useState} from "react";
import {useGlobalContext} from "../contexts/NoteContext.jsx";
import {formatDate} from "../utility.js";


function Notes() {
    const {note, handleSelectNote, handleCreatNewNote, setShowNote, width} = useGlobalContext()
    const [data, setData] = useState(note ?? [])
    useEffect(() => {
        setData(note ?? [])
    }, [note])

    return (
        <section className="sectionNotee">
            <button onClick={() => {
                handleCreatNewNote()
            }} className="createNew">
                + create new note
            </button>
            <article className="ticles">
                <ul>
                    {data.map((note, index) => {
                        const {title, tags, lastEdited, id} = note;
                        return (
                            <li
                                onClick={() => {
                                    if (width < 768) {
                                        setShowNote(true);
                                    }
                                    handleSelectNote(index);
                                }}
                                key={id}
                                className="clickNote"
                            >
                                <h4>{title}</h4>
                                <div className="tNoteTag">
                                    {tags.map((tea, index) => {
                                        return <span key={index}>{tea}</span>;
                                    })}
                                </div>
                                <p className="lastEditied">{formatDate(lastEdited)}</p>
                            </li>
                        );
                    })}
                </ul>
            </article>
        </section>
    );
}

export default Notes;
