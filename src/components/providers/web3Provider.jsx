import { createContext, useContext, useEffect, useState, useMemo, useCallback} from "react";
import Web3 from "web3";
import EventEmitter from "wolfy87-eventemitter";
import { RinkebyTestnetNetwork } from "../../networks/rinkeby-testnet";
import { InvariantContext } from "../../utils/context";
import { MetamaskConnector } from "../../wallets/connectors/metamask";
import { useWallet } from "../../wallets/walletProvider";
import { Text } from "../custom/typography";
import { useGeneral } from "./generalProvider";
import { useNetwork } from "./networkProvider";
import Icon from "../custom/icon";
import { MainnetNetwork } from "../../networks/mainnet";
import { KTSVG } from "../../_metronic/helpers/components/KTSVG";
import Button from "../antd/button";

export const MainnetHttpsWeb3Provider = new Web3.providers.HttpProvider(MainnetNetwork.rpc.httpsUrl);
export const RinkebyHttpsWeb3Provider = new Web3.providers.HttpProvider(RinkebyTestnetNetwork.rpc.httpsUrl)

const CacheHttpsWeb3Provider = {
    [RinkebyTestnetNetwork.rpc.httpsUrl]: RinkebyHttpsWeb3Provider,
    [MainnetNetwork.rpc.httpsUrl]: MainnetHttpsWeb3Provider,
}

export const WEB3_ERROR_VALUE = 3.9638773911973445e75

const Context = createContext(InvariantContext('Web3Provider'))

export function useWeb3() {
    return useContext(Context)
}

const Web3Provider = props => {
    const { children } = props
    const { windowState } = useGeneral()
    const { networks, activeNetwork, changeNetwork, findNetwork, findNetworkByChainId, defaultNetwork } = useNetwork()

    const wallet = useWallet()

    const event = useMemo(() => new EventEmitter(), [])

    const [blockNumer, setBlockNumber] = useState()
    const [networkSelectVisible, showNetworkSelect] = useState()

    const httpsWeb3 = useMemo(() => {
        let provider = CacheHttpsWeb3Provider[activeNetwork.rpc.httpsUrl]
        if (!provider) {
            provider = new Web3.providers.HttpProvider(activeNetwork.rpc.httpsUrl)
            CacheHttpsWeb3Provider[activeNetwork.rpc.httpsUrl] = provider
        }

        return new Web3(provider)
    }, [activeNetwork])

    const wssWeb3 = useMemo(() => {
        if (activeNetwork.rpc.wssUrl) {
            return undefined
        }

        const provider = new Web3.providers.WebsocketProvider(activeNetwork.rpc.wssUrl)
        return new Web3(provider)
    }, [activeNetwork])

    function tryCall (to, from, data, value) {
        return httpsWeb3.eth.call({
            to,
            from,
            data,
            value,
        })
    }

    const getContractAbi = useCallback(
        (address) => {
            const { apiUrl, key } = activeNetwork.explorer
            const url = `${apiUrl}/api?module=contract&action=getabi&address=${address}&apikey=${key}`
            return fetch(url)
                .then(result => result.json())
                .then(({ status, result}) => {
                    if (status === '1') {
                        return JSON.parse(result)
                    }

                    return Promise.reject(result)
                })
        },
        [activeNetwork.explorer],
        )

        useEffect(() => {
            if (wallet.connector instanceof MetamaskConnector) {
                wallet.connector.getProvider().then(provider => {
                    provider.on('chainChanged', (chainId) => {
                        const network = findNetworkByChainId(Number(chainId)) ?? defaultNetwork
                        changeNetwork(network.id)
                    })
                })
            }
        }, [wallet.connector])

        const switchNetwork = useCallback(
            async (networkId) => {
                const network = findNetwork(networkId)

                if (!network) {
                    return
                }

                let canSetNetwork = true

                if (wallet.connector instanceof MetamaskConnector && network.metamaskChain) {
                    try {
                        const error = await wallet.connector.switchChain({
                            chainId: network.metamaskChain.chainId,
                        })

                        if(error) {
                            await Promise.reject(error)
                        }
                    } catch (e) {
                        canSetNetwork = false

                        if (e.code === 4902 || e.message?.includes('Unrecognized chain ID')) {
                            await wallet.connector.addChain(network.metamaskChain)
                        }                           
                    }
                }

                if (canSetNetwork) {
                    changeNetwork(network.id)
                }
            },
            [wallet.connector],
        )

        useEffect(() => {
            if (!windowState.isVisible || !wssWeb3) {
                return undefined
            }

            wssWeb3.eth
                .getBlockNumber()
                .then(value => {
                    if (value) {
                        setBlockNumber(value)
                    }
                })
                .catch(Error)
            const subscription = wssWeb3.eth.subscribe('newBlockHeaders')

            subscription
                .on('data', blockHeader => {
                    if (blockHeader && blockHeader.number) {
                        setBlockNumber(blockHeader.number)
                    }
                })
                .on('error', () => {
                    setTimeout(() => {
                        subscription.subscribe()
                    }, 1_000)
                })
            
            return () => {
                subscription.unsubscribe?.()
            }
        }, [windowState.isVisible])

        function getEtherscanTxUrl(txHash) {
            return txHash ? `${activeNetwork.explorer.url}/tx/${txHash}` : undefined
        }
        
        function getEtherscanAddressUrl(address) {
            return address ? `${activeNetwork.explorer.url}/address/${address}` : undefined
        }

        const value ={
            event,
            blockNumer,
            activeProvider: httpsWeb3,
            showNetworkSelect: () => {
                showNetworkSelect(true)
            },
            tryCall,
            getContractAbi,
            getEtherscanTxUrl,
            getEtherscanAddressUrl,
        }

        return (
            <Context.Provider value={value}>
                {children}
                {networkSelectVisible && (
                    <div className="modal fade" id='hipo_connect_network' aria-hidden='true'>
                        <div className="modal-dialog modal-dialog-centered mw-568px">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h3>
                                        <span className='card-label fw-bolder fs-3 mb-1'>Select Network</span>
                                    </h3>
                                
                                    <div className='btn btn-sm btn-icon btn-active-color-primary' data-bs-dismiss='modal'>
                                        <KTSVG path='/media/icons/duotune/arrows/arr061.svg' className='svg-icon-1' />
                                    </div>
                                </div>
                    
                                <div className='modal-body py-lg-5 px-lg-10'>
                                    {networks.map(network => (
                                    <Button
                                        key = {network.id}
                                        type = "select"
                                        style = {{ height: '96px' }}
                                        onClick = {() => switchNetwork(network.id)}>
                                        <Icon name={network.meta.logo} width={40} height={40} className='mr-12' />
                                        <div className="flex flow-row align-start">
                                            <Text type='p1' weight='semibold' color='primary'>
                                                {network.meta.name}
                                            </Text>
                                            {network === activeNetwork && (
                                                <Text type='small' weight='semibold' color='secondary'>
                                                    Connected
                                                </Text>
                                            )}
                                        </div>
                                    </Button>
                                    ))}
                                </div>              
                            </div>
                        </div>
                    </div>
                )}
            </Context.Provider>
        )    
}

export default Web3Provider