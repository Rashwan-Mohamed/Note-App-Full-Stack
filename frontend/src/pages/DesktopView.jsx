
import Aside from "../components/organisms/Aside.jsx";
import Notes from "./Notes.jsx";
import ViewNote from "../components/templatess/ViewNote.jsx";
import { ViewNoteAssure } from "../components/atoms/ViewNoteAssure.jsx";
import { useGlobalContext } from "../components/NoteContext.jsx";

export default function DesktopView() {
    const {
        note = [],
        chosen,
    } = useGlobalContext();

    return (<>
        {" "}
        <Aside
        ></Aside>
        <Notes
        ></Notes>
        <ViewNoteAssure chosen={note[chosen]}>
            <ViewNote
            ></ViewNote>
        </ViewNoteAssure>
    </>)
}