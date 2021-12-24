import { createContext } from "react";
import { InvariantContext } from "../../utils/context";
import { useSessionStorage } from "react-use-storage";
import { useMemo, useState, useCallback, useEffect } from "react";


const Context = createContext(InvariantContext('NetworkProvider'));

export function useNetwork() {
    return useContext(Context);
}

const networks = (() => {
    if (isDevelopmentMode) {
        return [
            KovanNetwork,
            OptimisticKovanNetwork,
            TestnetNetwork,
            OptimisticKovanNetwork,
            MainnetNetwork,
            OptimisticMainnetNetwork,
            PolygonNetwork,
            AvalancheTestnetNetwork,
            AvalancheNetwork,
            BinanceTestnetNetwork,
            BinanceNetwork,
            ArbitrumTestnetNetwork,
            ArbitrumNetwork,
        ]
    }

    if (isProductionMode) {
        return [
            MainnetNetwork, 
            PolygonNetwork, 
            AvalancheNetwork, 
            BinanceNetwork, 
            TestnetNetwork, 
            ArbitrumNetwork
        ]
    }

    return []
})()

const NetworkProvider = (props) => {
    const { children } = props

    const [lastNetwork, setLastNetwork] = useSessionStorage('last_network')

    const initialNetwork = useMemo(() => {
        let network
        try {
            if (lastNetwork) {
                const networkId = lastNetwork?.toLowerCase();
                network = networks.find(n => n.id.toLowerCase() === networkId)
            }
        } catch {}

        return network ?? networks[0]
    }, [lastNetwork])

    const [activeNetwork] = useState(initialNetwork)

    const findNetwork = useCallback(
        (networkId) => {
            return networks.find(n => n.id.toLowerCase() === networkId.toLowerCase())
        },
        []
    )

    const findNetworkByChainId = useCallback(
        (chainId) => {
            return networks.find(n => n.meta.chainId === chainId)
        },
        []
    )

    const changeNetwork = useCallback(
        (networkId) => {
            const network = findNetwork(networkId)

            if (network) {
                setLastNetwork(network.id.toLowerCase())
                window.location.reload()
            }

            return network
        },
        []
    )

    useEffect(() => {
        window.document.title = activeNetwork.config.title
    }, [activeNetwork])

    const value = {
        networks,
        defaultNetwork,
        activeNetwork,
        findNetwork,
        findNetworkByChainId,
        changeNetwork,
    }

    return <Context.Provider value={value}>{children}</Context.Provider>
}

export default NetworkProvider