import { useEffect, useState } from "react";
import UseWidth from "./hooks/UseWidth.jsx";
import { PhoneView } from './pages/PhoneView.jsx'
import DesktopView from './pages/DesktopView.jsx'
import { Popup } from './components/atoms/Popup.jsx'
import {
    timeNow, editNoteTag, updateNote, newNoteRequest, deleteNote, fetchNotes,
} from "./utility.js";
import { NoteContext } from "./contexts/NoteContext.jsx";
import Nav from "./pages/Nav.jsx";
import {Bounce, ToastContainer} from "react-toastify";

function App() {
    const width = UseWidth();
    const [isArchived, setIsArchived] = useState(0);
    const [note, setNoto] = useState([]);
    const [workingNote, setWorkingNote] = useState([]);
    const [chosen, setChosen] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");
    const [tags, setTags] = useState([]);
    const [showNote, setShowNote] = useState(() => width < 768 ? false : true);
    const [active, setActive] = useState(false);

    const trackTagsChange = {
        add: [], remove: []
    };

    const reloadNotes = () => {
        const filtered = note.filter((n) => {
            return n.isArchived === isArchived && (!tags.length || n.tags.some((ele) => tags.includes(ele))
            );
        });
        setWorkingNote(filtered);
    };


    // USE EFFECT TO FETCH THE NOTES FROM THE DATABASE
    useEffect(() => {
        fetchNotes(handleSettingNotes)
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
            setChosen(0);

        } else if (operation === "archieve" || operation === "Un-Archive") {


            let eas = note.find((note) => note.title === title);
            eas.isArchived = eas.isArchived === 1 ? 0 : 1;
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
        if (tag === '') {
            setTags([])
        }
        else if (!tags.includes(tag)) {
            setTags((old) => [...old, tag]);
            setChosen(0);
        }
    };
    // SET THE CURRENT SELECTED TAG
    const handleTagRemoval = (tag) => {
        setTags(() => tags.filter(ta => ta !== tag))
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
        setActive, active, tags, handleTagRemoval, allNotes: note
    };

    return (<>
        <NoteContext.Provider value={params}>
            <ToastContainer
                position="top-right"
                autoClose={50000}
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick={true}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                transition={Bounce}
            />
            <main className={width < 768 ? (showNote ? "activeNote" : "notActiveNote") : ''}>
                <Popup />
                <Nav />
                {width < 768 ? (<>
                    <PhoneView />
                </>) : <DesktopView />}
            </main>
        </NoteContext.Provider>
    </>);
}

export default App;
