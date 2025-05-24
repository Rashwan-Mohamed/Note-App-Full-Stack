import { createContext, useContext } from 'react';


export const NoteContext = createContext({});

export const useGlobalContext = () => {
    return useContext(NoteContext)
}