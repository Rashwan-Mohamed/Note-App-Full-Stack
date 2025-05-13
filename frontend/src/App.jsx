import { useEffect, useState } from "react";
import UseWidth from "./UseWidth";
import { PhoneView } from './components/PhoneView.jsx'
import DesktopView from './components/DesktopView.jsx'
import { Popup } from './components/Popup.jsx'
import {
    timeNow, editNoteTag, updateNote, newNoteRequest, deleteNote, fetchNotes,
    newSission,
} from "./utility.js";

function App({ id }) {
    const width = UseWidth();
    const [isArchived, setIsArchived] = useState(0);
    const [note, setNoto] = useState([]);
    const [workingNote, setWorkingNote] = useState([]);
    const [chosen, setChosen] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");
    const [tags, setTags] = useState("");
    const [showNote, setShowNote] = useState(true);
    const [active, setActive] = useState(false);

    const trackTagsChange = {
        add: [], remove: []
    };

    const signGuest = async () => {
        await newSission('guest', 'guest@email.com', '1234567gG!@');
        fetchNotes(handleSettingNotes)
    }

    const reloadNotes = () => {
        const filtered = note.filter((n) => {
            return n.isArchived === isArchived && (!tags || n.tags.includes(tags));
        });
        setWorkingNote(filtered);
    };


    // USE EFFECT TO FETCH THE NOTES FROM THE DATABASE
    useEffect(() => {
        if (id === 'guest') {
            signGuest();
        } else {
            fetchNotes(handleSettingNotes)
        }
    }, []);
    // SEARCHING FUNCTIONALITY
    useEffect(() => {
        if (searchQuery.length) {
            const searchLower = searchQuery.toLowerCase();
            const searchResult = note.filter(({
                title, tags, content
            }) => title.toLowerCase().includes(searchLower) || tags.some(tag => tag.toLowerCase().includes(searchLower)) || content?.toLowerCase().includes(searchLower));
            setWorkingNote(searchResult);
        } else {
            reloadNotes();
        }
        setChosen(0);
    }, [tags, isArchived, searchQuery]);
    // RELOAD NOTES WHEN NOTES CHANGES
    useEffect(() => {
        reloadNotes();
    }, [note, isArchived]);
    const handleNoteState = (to) => {
        setIsArchived(to ? 0 : 1);
        // reloadNotes();
        // console.log('called');
    };

    // Function to Edit,Delete Or Archive note
    async function handleEditNote(title, operation, payload) {
        if (operation === "edit") {
            let nsa = note.find((note) => {
                if (note.title === title) {
                    return { ...note };
                }
            });
            if (nsa) {
                nsa.content = payload.iContent;
                nsa.title = payload.ititle;
                nsa.tags = payload.itags;
                nsa.naew = 0;
                nsa.lastEdited = timeNow(note.lastEdited)
            }
            if (trackTagsChange.add.length > 0) {
                await editNoteTag(nsa.id, trackTagsChange.add, 'add');
            }
            if (trackTagsChange.remove.length > 0) {
                await editNoteTag(nsa.id, trackTagsChange.remove, 'remove');
            }
            await updateNote(nsa.id, nsa, operation, setActive);
            trackTagsChange.add = [];
            trackTagsChange.remove = [];
        } else if (operation === "archieve" || operation === "Un-Archive") {
            let eas = note.find((note) => note.title === title);
            eas.isArchived = eas.isArchived == 1 ? 0 : 1;
            await updateNote(eas.id, eas, operation, setActive);
            setChosen(0);
        } else if (operation === "delete") {
            let rea = note.find((note) => {
                if (note.title === title) return note;
            });
            await deleteNote(rea.id, setActive)
            setChosen(0);
        }
        fetchNotes(handleSettingNotes);

    }

    // set the current chosen note to be viewed
    function handleSelectNote(id) {
        setChosen(id);
    }

    // SET THE CURRENT SELECTED TAG
    const handleTagSelect = (tag) => {
        setTags(tag);
        setChosen(0);
    };
    const handleCreatNewNote = async () => {
        await newNoteRequest(setActive);
        fetchNotes(handleSettingNotes);
    }
    const handleSettingNotes = (notes) => {
        setNoto(() => notes)
    }


    let params = {
        showNote,
        setShowNote,
        note: workingNote,
        chosen,
        handleTagSelect,
        isArchived,
        handleNoteState,
        width,
        handleCreatNewNote,
        searchQuery,
        setSearchQuery,
        handleEditNote,
        handleSelectNote,
        trackTagsChange,
        setActive
    };
    return (<>
        <main className={width < 768 ? (showNote ? "activeNote" : "notActiveNote") : ''}>
            <Popup active={active} setActive={setActive} />
            {width < 768 ? (<>
                <PhoneView params={params} />
            </>) : <DesktopView params={params} />}
        </main>
    </>);
}

export default App;
