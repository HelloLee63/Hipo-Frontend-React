import { useContext, useState } from "react";
import { createContext } from "react";
import { InvariantContext } from "../../utils/context";

const Context = createContext(InvariantContext('GeneralProvider'));

const mqlDark = window.matchMedia('(prefers-color-scheme: dark)');
const defaultTheme = mqlDark.matches ? 'dark' : 'light';

export function useGeneral() {
    return useContext(Context);
}

const GeneralProvider = (props) => {
    const [navOpen, setNavOpen] = useState(false);
    const [visibilityState, setVisibilityState] = useState(window.document.visibilityState);
    const [osColorScheme, setOsColorScheme] = useState(defaultTheme);
    const [selectedTheme, setSelectedTheme, removeSelectedTheme] = useLocalStorage('bb_theme', );
    
    const theme = selectedTheme || osColorScheme;

    useWindowEventListner('visibilitychange', () => {
        
    })

}