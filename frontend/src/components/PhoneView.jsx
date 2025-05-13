import Nav from "./Nav.jsx";
import ViewNote from "./ViewNote.jsx";
import Aside from "./Aside.jsx";
import Notes from "./Notes.jsx";
import {ViewNoteAssure} from "./ViewNoteAssure.jsx";


export function PhoneView({params}) {
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
        setActive,
        showNote,
        setShowNote
    } = params;
    return <>
        <Nav
            showNote={showNote}
            width={width}
            isArchived={isArchived}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
        ></Nav>
        {showNote ? (<ViewNoteAssure chosen={note[chosen]}>
                    <ViewNote
                        showNote={showNote}
                        setShowNote={setShowNote}
                        note={note}
                        handleEditNote={handleEditNote}
                        chosen={note[chosen]}
                        chosState={chosen}
                        trackTagsChange={trackTagsChange}
                    />
                </ViewNoteAssure>
            )
            : (<>
                    <Aside
                        handleTagSelect={handleTagSelect}
                        isArchived={isArchived}
                        handleNoteState={handleNoteState}
                        note={note}
                        handleSelectNote={handleSelectNote}
                    ></Aside>
                    <Notes
                        width={width}
                        setShowNote={setShowNote}
                        handleCreatNewNote={handleCreatNewNote}
                        handleSelectNote={handleSelectNote}
                        data={note}
                        isArchived={isArchived}
                    ></Notes>
                </>
            )}
    </>
}