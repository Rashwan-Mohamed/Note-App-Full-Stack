/* eslint-disable react/prop-types */
import Nav from "./Nav.jsx";
import Aside from "../components/Aside.jsx";
import Notes from "./Notes.jsx";
import ViewNote from "../components/ViewNote.jsx";
import { ViewNoteAssure } from "../components/ViewNoteAssure.jsx";

export default function DesktopView({ params }) {
    const {
        note = [],
        handleEditNote,
        chosen,
        handleTagSelect,
        isArchived,
        handleNoteState,
        width,
        handleCreatNewNote,
        handleSelectNote,
        searchQuery,
        setSearchQuery,
        trackTagsChange,
        setActive
    } = params;

    return (<>
        {" "}
        <Nav
            width={width}
            isArchived={isArchived}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
        ></Nav>
        <Aside
            handleTagSelect={handleTagSelect}
            isArchived={isArchived}
            handleNoteState={handleNoteState}
            handleSelectNote={handleSelectNote}
            note={note}
        ></Aside>
        <Notes
            handleCreatNewNote={handleCreatNewNote}
            handleSelectNote={handleSelectNote}
            data={note}
            isArchived={isArchived}
            setActive={setActive}
        ></Notes>
        <ViewNoteAssure chosen={note[chosen]}>
            <ViewNote
                note={note}
                handleEditNote={handleEditNote}
                chosen={note[chosen]}
                chosState={chosen}
                trackTagsChange={trackTagsChange}
            ></ViewNote>
        </ViewNoteAssure>


    </>)
}