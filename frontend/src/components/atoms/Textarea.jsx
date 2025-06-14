import {useViewContext} from '../../contexts/ViewNoteConext';
import SimpleEditor from "./SimpleEditor.jsx";
import Tiptap from "../organisms/TipTap.jsx";

export default function Textarea() {
    const {noteContent, setNoteContent, edit} = useViewContext()

    return (
        <article style={{whiteSpace: "pre-line"}} className="mainContent">
            {/*<SimpleEditor content={noteContent.iContent} setContent={setNoteContent} />*/}
            {/*<h3>Preview:</h3>*/}
            {/*<div*/}
            {/*    style={{ border: '1px solid #ccc', padding: 8, marginTop: 16 }}*/}
            {/*    dangerouslySetInnerHTML={{ __html: noteContent.iContent }}*/}
            {/*/>*/}
            {edit ? (
                <SimpleEditor content={noteContent.iContent} setContent={setNoteContent} />
            ) : (
                <div
                    // style={{ border: '1px solid #ccc', padding: 8, marginTop: 16 }}
                    dangerouslySetInnerHTML={{ __html: noteContent.iContent }}
                />
            )}
            {/*<textarea*/}
            {/*    value={noteContent.iContent ?? ''}*/}
            {/*    onChange={(e) => {*/}
            {/*        setNoteContent((old) => {*/}
            {/*            return {...old, iContent: e.target.value};*/}
            {/*        });*/}
            {/*    }}*/}
            {/*    disabled={!edit}*/}
            {/*    name=""*/}
            {/*    placeholder="press edit and start typing..."*/}
            {/*    id="textAreas"*/}
            {/*>*/}
            {/*    {`${noteContent.iContent}`}*/}
            {/*</textarea>*/}
        </article>
    )
}
