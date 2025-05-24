import Textarea from "../atoms/Textarea";
import EditBtn from "../atoms/EditBtn";
import AddNewTag from "../atoms/AddNewTag";
import {useViewContext} from "../../contexts/ViewNoteConext";
import TwinBrothers from "../atoms/TwinBrothers";
import ChangeTitle from "../atoms/ChangeTitle";
import DeArNote from "../atoms/DeArNote.jsx";
import SVG2 from "../../assets/SVG Components/SVG2.jsx";
import {formatDate} from "../../utility.js";

export default function NoteSmallView() {
    const {
        chosen, change, setShowNote
    } = useViewContext()
    const {lastEdited} = chosen;


    return (<>

        <header>
            <button onClick={() => setShowNote(false)} className="goBackNote">
                <SVG2></SVG2> <span>Go Back</span>
            </button>
            <div className="stuffNote">
                <DeArNote/>
                <EditBtn></EditBtn>
                {change && (<section className="twinBrothers">
                    {" "}
                    <TwinBrothers/>
                </section>)}
            </div>
        </header>
        <div className="noteInfo">
            <ChangeTitle/>
            <AddNewTag/>
            <div className="oneEd lastoneEd">
                <p className="ponEn">
                    <img src="src\assets\images\icon-clock.svg" alt=""/>
                    <span>Last Edited</span>
                </p>
                <p>{formatDate(lastEdited)}</p>
            </div>
        </div>
        <Textarea/>
    </>);
}
