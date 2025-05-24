import { useEffect } from "react";
import { useGlobalContext } from "../../contexts/NoteContext.jsx";


export function Popup() {
    const { active, setActive } = useGlobalContext()

    // MESSAGE POPUP
    useEffect(() => {
        setTimeout(() => {
            setActive(false);
        }, 2000);
        return () => clearTimeout(() => {
            setActive(false);
        }, 2000);
    }, [active]);
    return <>
        {active && (<div className="tmpMessage">note {active} successfully!</div>)}
    </>
}