/* eslint-disable react/prop-types */
import { formatDate } from "../utility.js";


function Notes({ data = [], handleSelectNote, handleCreatNewNote, setShowNote, width, isArchived, setActive }) {

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
                        const { title, tags, content, lastEdited, isArchived } = note;
                        return (
                            <li
                                onClick={() => {
                                    if (width < 768) {
                                        setShowNote(true);
                                    }
                                    handleSelectNote(index);
                                }}
                                key={title}
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
