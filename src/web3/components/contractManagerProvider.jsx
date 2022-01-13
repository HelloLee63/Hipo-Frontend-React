import { createContext, useContext, useRef } from "react";
import { useWeb3 } from "../../components/providers/web3Provider";
import { useReload } from "../../hooks/useReload";
import { InvariantContext } from "../../utils/context";
import { useWallet } from "../../wallets/walletProvider";
import Erc20Contract from "../erc20Contract";
import Web3Contract from "../web3Contract";
import ContractListener from "./contract-listener";

const Context = createContext(InvariantContext('ContractManagerProvider'))

export function useContractManager() {
  return useContext(Context)
}

export function useContract(address, factory) {
  const [reload] = useReload()
  const manager = useContractManager()

  const contract = manager.getContract(address, factory)

  contract.on(Web3Contract.UPDATE_DATA, reload)
  return contract
}

export function useErc20Contract(address, abi = []) {
  const [reload] = useReload()
  const manager = useContractManager()

  if (!address) {
    return undefined
  }

  // const contract = new Erc20Contract(abi, address)

  const contract = manager.getContract(address, () => new Erc20Contract(abi, address))
  
  contract.on(Web3Contract.UPDATE_DATA, reload)

  return contract
}

const ContractManagerProvider = props => {
  const { children } = props

  const wallet = useWallet()
  const web3 = useWeb3()
  const contractsRef = useRef(new Map())
  const [reload] = useReload()

  const web3ProviderRef = useRef(web3.activeProvider)

  if (web3ProviderRef.current !== web3.activeProvider) {
    web3ProviderRef.current = web3.activeProvider

    contractsRef.current.forEach(contract => {
      contract.setCallProvider(web3.activeProvider)
    })

    reload()
  }

  const walletProviderRef = useRef(wallet.provider)

  if(walletProviderRef.current !== wallet.provider) {
    walletProviderRef.current = wallet.provider

    contractsRef.current.forEach(contract => {
      contract.setProvider(wallet.provider)
    })

    reload()
  }

  const walletAccountRef = useRef(wallet.account)

  if (walletAccountRef.current !== wallet.account) {
    walletAccountRef.current = wallet.account

    contractsRef.current.forEach(contract => {
      contract.setAccount(wallet.account)
    })

    reload()
  }

  function getContract(address, factory) {
    let contract

    if (!contractsRef.current.has(address)) {
      contract = factory?.() ?? new Web3Contract([], address, '')
      contract.setCallProvider(web3ProviderRef.current)
      contract.setProvider(walletProviderRef.current)            
      contract.setAccount(walletAccountRef.current)

      contractsRef.current.set(address, contract)
      reload()
    } else {
      contract = contractsRef.current.get(address)
    }

    return contract
  }

  const value = {
    getContract,
  }

  return (
    <Context.Provider value={value}>
      {children}
      {Array.from(contractsRef.current).map(([address, contract]) => (
        <ContractListener key={address} contract={contract} />
      ))}
    </Context.Provider>
  )
}

export default ContractManagerProvider