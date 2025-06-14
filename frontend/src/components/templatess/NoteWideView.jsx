import Textarea from '../atoms/Textarea';
import EditBtn from '../atoms/EditBtn';
import AddNewTag from '../atoms/AddNewTag';
import { useViewContext } from '../../contexts/ViewNoteConext';
import TwinBrothers from '../atoms/TwinBrothers';
import ChangeTitle from "../atoms/ChangeTitle.jsx";
import { formatDate } from "../../utility.js";
import DeArNote from "../atoms/DeArNote.jsx";


export default function NoteWideView() {
    const {
        chosen,
        change,
    } = useViewContext()
    const { lastEdited } = chosen;


    return (
        <>

            {" "}
            <div className="noteInfo">
                <ChangeTitle />
                <AddNewTag />
                <div className="oneEd lastoneEd">
                    <p className="ponEn">
                        <img src="src\assets\images\icon-clock.svg" alt="" />
                        <span>Last Edited</span>
                    </p>
                    <p>{formatDate(lastEdited)}</p>
                    <EditBtn></EditBtn>
                </div>
            </div>
            <aside className="noteAside">
                <DeArNote />
            </aside>
            <Textarea />

            {
                change && (<footer>
                    {" "}
                    <TwinBrothers />
                </footer>)
            }
        </>
    )
}
