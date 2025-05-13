import { useEffect } from "react";



export function Popup({ active, setActive }) {


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