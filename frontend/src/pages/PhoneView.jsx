import ViewNote from "../components/templatess/ViewNote.jsx";
import Aside from "../components/organisms/Aside.jsx";
import Notes from "./Notes.jsx";
import {ViewNoteAssure} from "../components/atoms/ViewNoteAssure.jsx";
import {useGlobalContext} from "../contexts/NoteContext.jsx";


export function PhoneView() {
    const {
        note = [],
        chosen,
        showNote
    } = useGlobalContext();
    return <>

        {showNote ? (<ViewNoteAssure chosen={note[chosen]}>
                    <ViewNote/>
                </ViewNoteAssure>
            )
            : (<>
                    <Aside
                    ></Aside>
                    <Notes
                    ></Notes>
                </>
            )}
    </>
}