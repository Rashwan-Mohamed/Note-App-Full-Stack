import {useViewContext} from '../../contexts/ViewNoteConext';

export default function Textarea() {
    const {noteContent, setNoteContent, edit} = useViewContext()
    return (
        <article style={{whiteSpace: "pre-line"}} className="mainContent">
            <textarea
                value={noteContent.iContent ?? ''}
                onChange={(e) => {
                    setNoteContent((old) => {
                        return {...old, iContent: e.target.value};
                    });
                }}
                disabled={!edit}
                name=""
                placeholder="press edit and start typing..."
                id="textAreas"
            >
                {`${noteContent.iContent}`}
            </textarea>
        </article>
    )
}
