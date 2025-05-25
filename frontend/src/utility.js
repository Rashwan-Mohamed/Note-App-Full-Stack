import axios from 'axios';

export const formatDate = (date) => {
    const fDate = new Date(date);
    return new Intl.DateTimeFormat("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    }).format(fDate);
};

export function timeNow(last) {
    let nd = new Date();
    last = nd.toISOString();
    return last;
}

const API_BASE = import.meta.env.VITE_APP_API_BASE_URL;
console.log(API_BASE);

const API_URL = `${API_BASE}/notes`;
const EDIT_URL = `${API_BASE}/editNote`;
const DELETE_URL = `${API_BASE}/deleteNote`;
const GET_USER_URL = `${API_BASE}/user`;
const NEW_NOTE_URL = `${API_BASE}/newNote`;
const TAGS_EDIT_URL = `${API_BASE}/editTag`;
const INSERT_USER_URL = `${API_BASE}/user`;
const END_SESSION_URL = `${API_BASE}/session`;
const START_NEW_SESSION_URL = `${API_BASE}/session`;


export const fetchNotes = async (setNoto) => {
    try {
        const response = await axios.get(API_URL, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true // 🔥 Correct way for axios to send the session cookie
        });

        let newMap = response.data.map((ele) => {
            if (!ele.tags) {
                ele.tags = [];
            }
            return ele;
        });

        setNoto(newMap);

    } catch (e) {
        console.log('ERROR FETCHING NOTES', e);
    }
}
export const updateNote = async (noteId, updatedNoteBody, operation, setActive) => {
    console.log('Request sent');

    try {
        const response = await axios.post(EDIT_URL,
            { body: updatedNoteBody, id: noteId },
            { headers: { 'Content-Type': 'application/json' }, withCredentials: true }
        );

        console.log('Response:', response.data);
        if (setActive && typeof setActive === 'function') {
            setActive(`${operation}d`);
        }
    } catch (error) {
        console.error('Error updating note:', error);
    }
};
export const deleteNote = async (noteId, setActive) => {
    try {
        const response = await axios.post(DELETE_URL,
            { id: noteId }, // <-- this is the request body (data)
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            }
        );
        console.log('Note Deleted!', response.data);
        setActive('deleted');
    } catch (error) {
        console.error('Error deleting note:', error);
    }
};

export const editNoteTag = async (noteId, tag, operation) => {
    console.log('Request sent')
    try {
        const response = await axios.post(TAGS_EDIT_URL, {
            body: tag, noteId: noteId, operation
        }, {
            headers: {
                'Content-Type': 'application/json'
            }, withCredentials: true
        });
        console.log(response.data);
    } catch (error) {
        console.error('Error updating note:', error);
    }
};
export const newNoteRequest = async () => {
    try {
        const response = await axios.post(NEW_NOTE_URL, { id: 1 }, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        });
        console.log('Note added!', response.data);
        // setActive(`created`);
    } catch (error) {
        console.error('Error updating note:', error);
    }

}

export const getUser = async (email, user = "") => {
    try {
        const response = await axios.get(GET_USER_URL, {
            params: { email, user },
            headers: {
                'Content-Type': 'application/json'
            }
        }, {
            withCredentials: true // 🔥 Important!
        }
        );
        const userName = response.data
        // console.log(userName.exists, 'RASHWAN MOHAMED');
        return userName.exists;
    } catch (error) {
        return false
    }
}

export const addNewUser = async (email, user, password) => {
    try {
        const response = await axios.post(INSERT_USER_URL, { email, user, password }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log('User added!', response.data);
        // setActive(`created`);
        return true
    } catch (error) {
        console.error('Error Adding note:', error);
        return false;
    }

}

export const newSission = async (email, password) => {
    console.log('attempt to start session');

    try {
        const response = await axios.post(START_NEW_SESSION_URL, { email, password }, {
            headers: {
                'Content-Type': 'application/json'
            }
            ,
            withCredentials: true
        });
        console.log('session started!', response.data);
        // setActive(`created`);
        if (response.data) {
            return response.data
        }
    } catch (error) {
        // console.error('failed to start the session:', error);
        return false;
    }

}
export const logout = async () => {
    try {
        const response = await axios.get(END_SESSION_URL, {
            headers: {
                'Content-Type': 'application/json'
            }
            ,
            withCredentials: true
        });

        console.log('logged out!', response.data);
        return true
    } catch (error) {
        console.error('failed to Logout:', error);
        return false;
    }

}

export const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{7,}$/;
    return passwordRegex.test(password);
}   