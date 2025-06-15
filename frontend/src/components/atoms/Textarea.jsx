import {SimpleEditor} from "./SimpleEditor.jsx";
import {useViewContext} from "../../contexts/ViewNoteConext.jsx";

export default function Textarea() {
    const {edit,noteContent}=useViewContext()
    return (
        <article style={{whiteSpace: "pre-line"}} className="mainContent">
            <SimpleEditor />
            {/*{edit ? (*/}
            {/*    <SimpleEditor  />*/}
            {/*) : (*/}
            {/*    <div*/}
            {/*        // style={{ border: '1px solid #ccc', padding: 8, marginTop: 16 }}*/}
            {/*        dangerouslySetInnerHTML={{ __html: noteContent.iContent }}*/}
            {/*    />*/}
            {/*)}*/}
        </article>
    )
}
