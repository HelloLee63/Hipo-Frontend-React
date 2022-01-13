import { func } from "prop-types";
import { createContext, useContext } from "react";
import { InvariantContext } from "../../../../utils/context";


const Context = createContext(InvariantContext('ColPoolProvider'))

export function useColPool() {
    return useContext(Context)
}

const ColPoolProvider = props => {
    
}