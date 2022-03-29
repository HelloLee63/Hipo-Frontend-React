import { createContext, useContext } from "react";
import { InvariantContext } from "../../utils/context";
import { useNetwork } from "./networkProvider";


const Context = createContext(InvariantContext('ConfigProvider'))

export function useConfig() {
    return useContext(Context)
}

const ConfigProvider = props => {

    const { children } = props
    const { activeNetwork } = useNetwork()
    const config = activeNetwork.config
    const value = {
        ...activeNetwork.config,
        links: {
            website: 'https://www.hipo.one',
            discord: '',
            twitter: '',
            whitepaper: '',
            docs: '',
            github: 'https://github.com/hipoone',

        },
    }

    return <Context.Provider value={value}>{children}</Context.Provider>
}

export default ConfigProvider
