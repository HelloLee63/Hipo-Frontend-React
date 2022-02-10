import { createContext, useContext, useEffect } from "react";
import { useReload } from "../../../../hooks/useReload";
import { InvariantContext } from "../../../../utils/context";
import { useWallet } from "../../../../wallets/walletProvider";
import { useProtocolData } from "../../../../web3/components/providers/ProtocolDataProvider";

const Context = createContext(InvariantContext('CollateralsProvider'))

export function useCollaterals() {
  return useContext(Context)
}

const CollateralsProvider = props => {
  const { children } = props
  const walletCtx = useWallet()
  const protocolData = useProtocolData()
  const [reload] = useReload()
  
  useEffect(() => {
    if(walletCtx.account) {
      protocolData.colPools?.forEach(colPool => {
        (colPool.contract).loadBalance().then(reload).catch(Error)
      })
    }
  }, [protocolData.colPools, walletCtx.account])

  const value = { }

  return (
    <Context.Provider value={value}>
      { children }
    </Context.Provider>
  )
}

export default CollateralsProvider