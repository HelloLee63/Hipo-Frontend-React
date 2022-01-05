import { createContext, useContext, useRef } from "react";
import { useWeb3 } from "../../components/providers/web3Provider";
import { useReload } from "../../hooks/useReload";
import { InvariantContext } from "../../utils/context";
import { useWallet } from "../../wallets/walletProvider";
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

  const contract = manager.getContract(address, () => new useErc20Contract(abi, address))
  contract.on(Web3Contract.UPDATE_DATA, reload)

  return contract
}

const ContractManagerProvider = props => {
  const { children } = props

  const wallet = useWallet()
  const web3 = useWeb3()
  const contractRef = useRef(new Map())
  const [reload] = useReload()

  const web3ProviderRef = useRef(web3.activeProvider)

  if (web3ProviderRef.current !== web3.activeProvider) {
    web3ProviderRef.current = web3.activeProvider

    contractRef.current.forEach(contract => {
      contract.setCallProvider(web3.activeProvider)
    })

    reload()
  }

  const walletProviderRef = useRef(wallet.provider)

  if(walletProviderRef.current !== wallet.provider) {
    walletProviderRef.current = wallet.provider

    contractRef.current.forEach(contract => {
      contract.setProvider(wallet.provider)
    })

    reload()
  }

  const walletAccountRef = useRef(wallet.account)

  if (walletAccountRef.current !== wallet.account) {
    walletAccountRef.current = wallet.account

    contractRef.current.forEach(contract => {
      contract.setAccount(wallet.account)
    })

    reload()
  }

  function getContract(address, factory) {
    let contract

    if (contractRef.current.has(address)) {
      contract = factory?.() ?? new Web3Contract([], address, '')

      contract.setCallProvider(web3ProviderRef.current)
      contract.setProvider(walletAccountRef.current)
      contract.setAccount(walletAccountRef.current)

      contractRef.current.set(address, contract)
      reload()
    } else {
      contract = contractRef.current.get(address)
    }

    return contract
  }

  const value = {
    getContract,
  }

  return (
    <Context.Provider value={value}>
      {children}
      {Array.from(contractRef.current).map(([address, contract]) => (
        <ContractListener key={address} contract={contract} />
      ))}
    </Context.Provider>
  )
}

export default ContractManagerProvider