import { createContext, useContext } from "react";

export const ViewContext = createContext({})

export const useViewContext = () => {
    return useContext(ViewContext)
}