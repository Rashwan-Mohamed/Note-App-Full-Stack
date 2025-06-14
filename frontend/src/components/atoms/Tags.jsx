import { useGlobalContext } from "../../contexts/NoteContext";

/* eslint-disable react/prop-types */

function Tags({ data = [], handleTagSelect }) {
    const { tags: selectedTags, handleTagRemoval, allNotes } = useGlobalContext()
    let tagsa = new Set();
    for (let ele of allNotes) {
        const { tags } = ele;
        tags.forEach((tah) => tagsa.add(tah));
    }
    return (
        <section className="sectionTh">
            <h4 className="Greyone">tags</h4>
            <div className="selectedTags">
                {selectedTags.map((tar) => {
                    return <li className="tGAS" key={tar} onClick={() => handleTagRemoval(tar)} >{tar} <span>x</span> </li>
                })}
            </div>
            <ul className="manyTags">
                <li onClick={() => handleTagSelect("")} className="singleTag">
                    {svg1}
                    <p>All</p>
                </li>
                {[...tagsa].map((tag) => {
                    return (
                        <li
                            onClick={() => handleTagSelect(tag)}
                            className="singleTag"
                            key={tag}
                        >
                            {svg2}
                            <p>{tag}</p>
                        </li>
                    );
                })}
            </ul>
        </section>
    );
}

export default Tags;

const svg1 = <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="none"
    viewBox="0 0 24 24"
>
    <path
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
        d="M3.016 5.966c.003-1.411 1.07-2.677 2.456-2.916.284-.05 3.616-.042 4.995-.041 1.364 0 2.527.491 3.49 1.452 2.045 2.042 4.088 4.085 6.128 6.13 1.208 1.21 1.224 3.066.022 4.28a805.496 805.496 0 0 1-5.229 5.228c-1.212 1.201-3.069 1.186-4.279-.022-2.064-2.058-4.127-4.115-6.182-6.182-.795-.8-1.264-1.766-1.368-2.895-.084-.903-.035-4.26-.033-5.034Z"
        clipRule="evenodd"
    />
    <path
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
        d="M9.907 8.315a1.607 1.607 0 0 1-1.61 1.583c-.872-.002-1.599-.73-1.594-1.596a1.604 1.604 0 0 1 1.633-1.607c.864.003 1.575.736 1.571 1.62Z"
        clipRule="evenodd"
    />
</svg>
const svg2 = <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="none"
    viewBox="0 0 24 24"
>
    <path
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
        d="M3.016 5.966c.003-1.411 1.07-2.677 2.456-2.916.284-.05 3.616-.042 4.995-.041 1.364 0 2.527.491 3.49 1.452 2.045 2.042 4.088 4.085 6.128 6.13 1.208 1.21 1.224 3.066.022 4.28a805.496 805.496 0 0 1-5.229 5.228c-1.212 1.201-3.069 1.186-4.279-.022-2.064-2.058-4.127-4.115-6.182-6.182-.795-.8-1.264-1.766-1.368-2.895-.084-.903-.035-4.26-.033-5.034Z"
        clipRule="evenodd"
    />
    <path
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
        d="M9.907 8.315a1.607 1.607 0 0 1-1.61 1.583c-.872-.002-1.599-.73-1.594-1.596a1.604 1.604 0 0 1 1.633-1.607c.864.003 1.575.736 1.571 1.62Z"
        clipRule="evenodd"
    />
</svg>