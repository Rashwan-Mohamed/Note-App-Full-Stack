import {useState} from 'react';
import {newSession} from '../../utility';
import {useNavigate} from 'react-router';
import Spinner from "../atoms/Spinner.jsx";

export default function SignGuest() {
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const handleGuestSession = async () => {
        setIsLoading(true)
        try {
            let res = await newSession('guest@email.com', '1234567gG!@');
            if (res) {
                navigate('/notes')
            }
        } finally {
            setIsLoading(false)
        }
    }
    if (isLoading) {
        return <div className="loading-container"><Spinner/> Signing In As A Guest...</div>;
    }
    return (
        <button className='ftbtn btas' onClick={() => handleGuestSession()}>Continue As a guest</button>
    )
}
