
import UseWidth from "../../hooks/UseWidth.jsx";
import { useGlobalContext } from "../NoteContext.jsx";
import NoteSmallView from "./NoteSmallView.jsx";
import NoteWideView from "./NoteWideView.jsx";


function ViewNote() {
    const width = UseWidth();
    const { handleEditNote, note, setShowNote, trackTagsChange, chosen: frozen } = useGlobalContext();
    const chosen = note[frozen]
    if (!chosen) {
        return (<section className="mino">
            <article style={{ whiteSpace: "pre-line" }} className="mainContent">
                NO NOTES MATCH THIS CRITERIA
            </article>
        </section>);
    }
    let params = { width, chosen, setShowNote, handleEditNote, note, trackTagsChange }
    return (<section className={"mino"}>

        {width < 768 ?
            <NoteSmallView params={params}></NoteSmallView>
            : <NoteWideView params={params} />}
    </section>);
}

export default ViewNote;
