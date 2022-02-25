import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useConfig } from "../../../../components/providers/configProvider";
import { usePools } from "../../../../components/providers/poolsProvider";
import { useReload } from "../../../../hooks/useReload";

import { InvariantContext } from "../../../../utils/context";
import { useWallet } from "../../../../wallets/walletProvider";

const Context = createContext(InvariantContext('ColPoolProvider'))

export function useColPool() {
  return useContext(Context)
}

const ColPoolProvider = props => {
  const { children } = props

  const walletCtx = useWallet()
  const config = useConfig()

  const [reload] = useReload()

  const { collateralPools, getCollateralPoolBySymbol } = usePools()
  const [poolSymbol, setPoolSymbol] = useState(collateralPools[0].collateralAsset.symbol)

  const colPool = useMemo(() => getCollateralPoolBySymbol(poolSymbol), [poolSymbol])

  const tokenSymbol = colPool.collateralAsset.symbol
  const tokenName = colPool.collateralAsset.name
  const tokenIcon = colPool.collateralAsset.icon

  const [pledgeAmount, setPledgeAmount] = useState(0)

  useEffect(() => {
    if (walletCtx.account) {
      colPool.collateralAsset.contract.loadAllowance(config.contracts.financingPool?.financingPool).then(reload).catch(Error)
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