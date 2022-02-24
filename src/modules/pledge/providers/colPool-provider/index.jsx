import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useConfig } from "../../../../components/providers/configProvider";
import { useReload } from "../../../../hooks/useReload";

import { InvariantContext } from "../../../../utils/context";
import { useWallet } from "../../../../wallets/walletProvider";
import { useColPools } from "../colPools-provider";

const Context = createContext(InvariantContext('ColPoolProvider'))

export function useColPool() {
  return useContext(Context)
}

const ColPoolProvider = props => {
  const { children } = props

  const walletCtx = useWallet()
  const config = useConfig()

  const [reload] = useReload()

  const colPoolsCtx = useColPools()
  const [poolSymbol, setPoolSymbol] = useState(colPoolsCtx.colPools[0].underlyingAsset.symbol)

  const colPool = useMemo(() => colPoolsCtx.getColPoolBySymbol(poolSymbol), [poolSymbol])

  const tokenSymbol = colPool.underlyingAsset.symbol
  const tokenName = colPool.underlyingAsset.name
  const tokenIcon = colPool.underlyingAsset.icon

  const [pledgeAmount, setPledgeAmount] = useState(0)

  useEffect(() => {
    if (walletCtx.account) {
      colPool.token.contract.loadBalance().then(reload).catch(Error)
    }
  }, [colPool, walletCtx.account])

  useEffect(() => {
    if (walletCtx.account) {
      colPool.underlyingAsset.contract.loadAllowance(config.contracts.financingPool?.financingPool).then(reload).catch(Error)
    }
  }, [colPool, walletCtx.account])

  const value = {
    colPool,
    setPoolSymbol,
    tokenSymbol,
    tokenName,
    tokenIcon,
    pledgeAmount, 
    setPledgeAmount,
  }

  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  )    
}

export default ColPoolProvider