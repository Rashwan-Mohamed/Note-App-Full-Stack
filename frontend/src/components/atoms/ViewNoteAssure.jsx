/* eslint-disable react/prop-types */
export function ViewNoteAssure({ children, chosen }) {
    if (chosen) return <>{children}</>;

    return (
        <section className="mino">
            <article style={{ whiteSpace: "pre-line" }} className="mainContent">
                NO NOTES MATCH THIS CRITERIA
            </article>
        </section>
    );
}