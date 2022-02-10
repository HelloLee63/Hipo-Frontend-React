import { createContext, useContext, useEffect } from "react";
import { useConfig } from "../../../components/providers/configProvider";
import { useKnownTokens } from "../../../components/providers/knownTokensProvider";
import { useReload } from "../../../hooks/useReload";
import { InvariantContext } from "../../../utils/context";
import { useWallet } from "../../../wallets/walletProvider";
import WalletDataContract from "../../contracts/WalletDataContract";
import { useContract } from "../contractManagerProvider";

function useWalletDataContract (address) {
  return useContract(address, () => {
    return new WalletDataContract(address)
  })
}

const Context = createContext(InvariantContext('WalletDataProvider'))

export function useWalletData() {
  return useContext(Context)
}

const WalletDataProvider = props => {
  const { children } = props
  const config = useConfig()
  const walletDataContract = useWalletDataContract(config.contracts.dataProvider.walletDataProvider)
  const walletCtx = useWallet()
  const [reload] = useReload()

  const { 
    wethToken, 
    usdcToken, 
    usdtToken, 
    daiToken, 
    usdcwethLpToken,
    wethusdtLpToken,
    daiwethLpToken, 
  } = useKnownTokens()

  useEffect(() => {
    if(walletCtx.account) {
      wethToken.contract.loadBalance().then(reload).catch(Error)
    }
  },[walletCtx.account])

  useEffect(() => {
    if(walletCtx.account) {
      usdcToken.contract.loadBalance().then(reload).catch(Error)
    }
  },[walletCtx.account])

  useEffect(() => {
    if(walletCtx.account) {
      usdtToken.contract.loadBalance().then(reload).catch(Error)
    }
  },[walletCtx.account])

  useEffect(() => {
    if(walletCtx.account) {
      daiToken.contract.loadBalance().then(reload).catch(Error)
    }
  },[walletCtx.account])

  useEffect(() => {
    if(walletCtx.account) {
      usdcwethLpToken.contract.loadBalance().then(reload).catch(Error)
    }
  },[walletCtx.account])

  useEffect(() => {
    if(walletCtx.account) {
      wethusdtLpToken.contract.loadBalance().then(reload).catch(Error)
    }
  },[walletCtx.account])

  useEffect(() => {
    if(walletCtx.account) {
      daiwethLpToken.contract.loadBalance().then(reload).catch(Error)
    }
  },[walletCtx.account])

  const value = {
    walletDataContract,
  }


  return (
    <Context.Provider value={value}>
      { children }
    </Context.Provider>
  )
}

export default WalletDataProvider