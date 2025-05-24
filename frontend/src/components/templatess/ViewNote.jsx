import UseWidth from "../../hooks/UseWidth.jsx";
import {useGlobalContext} from "../../contexts/NoteContext.jsx";
import NoteSmallView from "./NoteSmallView.jsx";
import NoteWideView from "./NoteWideView.jsx";
import {useEffect, useState} from "react";
import AssureOperation from "../atoms/AssureOperation.jsx";
import {ViewContext} from "../../contexts/ViewNoteConext.jsx";


function ViewNote() {
    const width = UseWidth();
    const {handleEditNote, note, setShowNote, trackTagsChange, chosen: frozen} = useGlobalContext();
    const chosen = note[frozen]
    const {title = '', tags = [], content = '', naew} = chosen;
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
    let params = {
        width,
        chosen,
        setShowNote,
        handleEditNote,
        note,
        trackTagsChange,
        handleNewTag,
        uniqueTitle,
        sure,
        setSure,
        edit,
        setEdit,
        uniqueName,
        setUniqueName,
        change,
        setChange,
        noteContent,
        setNoteContent,
        setNewTag,
        newTag
    }
    return (
        <ViewContext.Provider value={params}>
            <section className={"mino"}>
                {sure &&
                    <AssureOperation></AssureOperation>}
                {width < 768 ?
                    <NoteSmallView></NoteSmallView>
                    : <NoteWideView/>}
            </section>
        </ViewContext.Provider>
    );
}

export default ViewNote;
