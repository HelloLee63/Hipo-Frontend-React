import { useState, useMemo, useEffect, createContext, useCallback, useRef, useContext } from "react";
import { useSessionStorage } from "react-use-storage";
import { UnsupportedChainIdError, Web3ReactProvider, useWeb3React } from '@web3-react/core';
import { NoEthereumProviderError } from '@web3-react/injected-connector';
import BigNumber from 'bignumber.js';
import { ethers } from 'ethers';
import Web3 from 'web3';
import EventEmitter from 'wolfy87-eventemitter';
import { useNetwork } from "../components/providers/networkProvider";
import { InvariantContext } from "../utils/context";
import ConnectWalletModal from './components/connetct-wallet-modal/index';
import MetamaskWalletConfig from './connectors/metamask';
import InstallMetaMaskModal from "./components/install-wallet-modal";
import UnsupportedChainModal from "./components/unsupported-chain-modal";

export const WalletConnectors = [
  MetamaskWalletConfig,
];

const Context = createContext(InvariantContext('Web3WalletProvider'))

export function useWallet() {
  return useContext(Context)
}

const Web3WalletProvider = props => {

  const { activeNetwork } = useNetwork();
  const web3React = useWeb3React();
  const [sessionProvider, setSessionProvider, removeSessionProvider] = useSessionStorage('wallet_provider') 
  const event = useMemo(() => new EventEmitter(), [])
  const [initialized, setInitialized] = useState(false)
  const [connecting, setConnecting] = useState()
  const connectingRef = useRef(connecting)
  connectingRef.current = connecting

  const [activeMeta, setActiveMeta] = useState()
  const [ethBalance, setEthBalance] = useState()
  const [ensName, setENSName] = useState()
  const [ensAvatar, setENSAvatar]= useState()

  const [connectWalletModal, setConnectWalletModal] = useState(false)
  const [installMetaMaskModal, setInstallMetaMaskModal] = useState(false)
  const [unsupportedChainModal, setUnsupportedChainModal] = useState(false);



  const preConnectedAccount = useRef(web3React.account)

  if (preConnectedAccount.current !== web3React.account) {
    preConnectedAccount.current = web3React.account
    event.emit('UPDATE_ACCOUNT', web3React.account)
  }

  const disconnect = useCallback(() => {
    web3React.deactivate()
    activeMeta?.onDisconnect?.(web3React.connector)
    setConnecting(undefined)
    setActiveMeta(undefined)
    setEthBalance(undefined)
    removeSessionProvider()
  }, [web3React, activeMeta, removeSessionProvider, setConnecting])

  const connect = useCallback(
    async (walletConfig, args) => {
      if (connectingRef.current) {
        return
      }
      connectingRef.current = walletConfig

      setConnecting(walletConfig)
      setConnectWalletModal(false)
      setInstallMetaMaskModal(false)

      const connector = walletConfig.factory(activeNetwork, args)

      function onError(error) {
        console.error('WalletProvider::Connect().onError', { error })
        if (error instanceof NoEthereumProviderError) {
          setInstallMetaMaskModal(true)

          disconnect()
          
        } else if (error instanceof UnsupportedChainIdError) {
          setUnsupportedChainModal(true)
          disconnect()
        } else {
            const err = walletConfig.onError?.(error)

            if (err) {
                console.log(err.message);
            }
        }
      }

      function onSuccess() {
        if (!connectingRef.current) {
            return
        }

        walletConfig.onConnect?.(connector, args)
        setActiveMeta(walletConfig)
        setSessionProvider(walletConfig.id)
      }
      await web3React.activate(connector, undefined, true).then(onSuccess).catch(onError)
      setConnecting(undefined)
    },
    [web3React, connectingRef, setConnecting, setSessionProvider, disconnect],
  )

  useEffect(() => {
    setEthBalance(undefined)
    setENSName(undefined)
    setENSAvatar(undefined)

    const account = web3React.account

    if (account && Web3.utils.isAddress(account)) {
      const ethWeb3 = new Web3(web3React.library)

      ethWeb3.eth
          .getBalance(account)
          .then(value => {
              setEthBalance(value ? new BigNumber(value): undefined)
          })
          .catch(Error)

      const provider = new ethers.providers.JsonRpcProvider(activeNetwork.rpc.httpsUrl)
      provider
          .lookupAddress(account)
          .then(value => {
              setENSName(value ?? undefined)

              if (value) {
                  provider
                      .getAvatar(value ?? '')
                      .then(value => {
                          setENSAvatar(value ?? undefined)
                      })
                      .catch(Error)
              }
          })
          .catch(Error)
    }
  }, [web3React.account, activeNetwork])

  useEffect(() => {
      (async () => {
          if (sessionProvider) {
              const walletConnector = WalletConnectors.find(c => c.id === sessionProvider)

              if (walletConnector) {
                  await connect(walletConnector)
              }
          }
          setInitialized(true)
      })()
  }, [])

  const value = {
    initialized,
    connecting,
    isActive: web3React.active,
    account: web3React.account ?? undefined,
    meta: activeMeta,
    connector: web3React.connector,
    provider: web3React.library,
    ethBalance,
    connect,
    disconnect,
    showWalletsModal: () => {
      setConnectWalletModal(true);
    },
    event,
    ens: {
        name: ensName,
        avatar: ensAvatar,
    },
  }

  return (
    <Context.Provider value={value}>
      {props.children}      
      {connectWalletModal && <ConnectWalletModal onCancel={() => setConnectWalletModal(false)}/>}
      {installMetaMaskModal && <InstallMetaMaskModal onCancel={() => setInstallMetaMaskModal(false)} />}
      {unsupportedChainModal && <UnsupportedChainModal onCancel={() => setUnsupportedChainModal(false)} />}
    </Context.Provider>
  )
}

const WalletProvider = props => {  
	const { children } = props
	return (
		<Web3ReactProvider getLibrary={library => library}>
			<Web3WalletProvider>{children}</Web3WalletProvider>
		</Web3ReactProvider>
	)
}

export default WalletProvider