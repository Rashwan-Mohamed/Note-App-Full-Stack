import { useNavigate } from "react-router";
import { logout } from "../utility.js";
import { useAuth } from "../hooks/useAuth.jsx";
import { useState } from "react";
import Spinner from "../components/atoms/Spinner.jsx";
import { useGlobalContext } from "../contexts/NoteContext.jsx";


export default function Nav() {
    let navigate = useNavigate()
    const { user, resetAuth } = useAuth();
    const [isLoading, setIsLoading] = useState('')
    let username = user?.username;
    const {
        width,
        setSearchQuery,
        searchQuery,
        isArchived,
        showNote,
    } = useGlobalContext()
    const handleLogout = async () => {
        setIsLoading('Signing out')
        try {
            await logout()
            navigate('/')
        } finally {
            setIsLoading('')
        }
    }


    if (isLoading) {
        return <div className="loading-container"><Spinner /> {isLoading}...</div>;
    }
    return (
        <nav>
            {/* {width < 1025 && (
                <div className="icon">
                    <SVG1></SVG1>
                </div>
            )} */}
            <h3>{username ? `Welcome ${user?.username}` : 'Hi Guest'}</h3>

            <h3 className={showNote ? "AllArchived" : ''}>
                {!isArchived ? "All" : "Archived"} Notes
            </h3>
            <div className="rightNav">
                <div className="searck">
                    <input
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                        }}
                        type="text"
                        placeholder={width > 768 && "Search by title, content or tags..."}
                    />
                </div>
                {/* <button className="settings">
                    <SVG1></SVG1>
                </button> */}
                <div className="ctbtns">
                    <button className={'editNote signOutButton'}  onClick={() => {
                        handleLogout()
                        resetAuth()
                    }}>Sign Out
                    </button>
                </div>
            </div>
        </nav>
    );
}
