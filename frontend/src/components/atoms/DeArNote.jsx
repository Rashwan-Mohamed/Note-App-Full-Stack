/* eslint-disable react/prop-types */
import SVG4 from '../../assets/SVG Components/SVG4';
import {useViewContext} from "../../contexts/ViewNoteConext.jsx";
import SVG3 from "../../assets/SVG Components/SVG3.jsx";

export default function DeArNote() {
    const {setSure, width, title, isArchived} = useViewContext()
    return (
        <>

            <button
                onClick={() => {
                    setSure({title: title, operation: "delete", content: ""});
                }}
                className="asideBtns"
            >
                <SVG4></SVG4>
                {width > 1025 ? <span> Delete Note</span> : ""}
            </button>


            <button
                onClick={() => {
                    setSure({
                        title: title, operation: isArchived ? "Un-Archive" : "archieve", content: "",
                    });
                }}
                className="asideBtns"
            >
                <SVG3></SVG3>
                {width > 1025 ? (<span> {isArchived ? "Un-Archive" : "Archive"} Note</span>) : ("")}
            </button>
        </>
    )
}
