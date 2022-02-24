import { createContext } from "react";
import { InvariantContext } from "../../utils/context";
import { useSessionStorage } from "react-use-storage";
import { useMemo, useState, useCallback, useEffect, useContext } from "react";
import { RinkebyTestnetNetwork } from '../../networks/rinkeby-testnet'
import { isDevelopmentMode, isProductionMode } from "../../utils";
import { MainnetNetwork } from "../../networks/mainnet";

const Context = createContext(InvariantContext('NetworkProvider'));

export function useNetwork() {
    return useContext(Context);
}

const networks = (() => {
    if (isDevelopmentMode) {
        return [
            // KovanNetwork,
            // OptimisticKovanNetwork,
            // TestnetNetwork,
            // OptimisticKovanNetwork,
           
            // OptimisticMainnetNetwork,
            // PolygonNetwork,
            // AvalancheTestnetNetwork,
            // AvalancheNetwork,
            // BinanceTestnetNetwork,
            // BinanceNetwork,
            // ArbitrumTestnetNetwork,
            // ArbitrumNetwork,
            RinkebyTestnetNetwork,
            MainnetNetwork,
        ]
    }

    if (isProductionMode) {
        return [          
            // PolygonNetwork, 
            // AvalancheNetwork, 
            // BinanceNetwork, 
            // TestnetNetwork, 
            // ArbitrumNetwork
            RinkebyTestnetNetwork,
            MainnetNetwork, 
        ]
    }

    return []
})()

const NetworkProvider = props => {

    console.log('Network Provider is rendered');
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
        defaultNetwork: networks[0],
        activeNetwork,
        findNetwork,
        findNetworkByChainId,
        changeNetwork,
    }

    return <Context.Provider value={value}>{children}</Context.Provider>
}

export default NetworkProvider