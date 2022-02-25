import { createContext, useContext, useEffect, useMemo, useState } from "react"
import { useConfig } from "../../../../components/providers/configProvider"
import { usePools } from "../../../../components/providers/poolsProvider"
import { useReload } from "../../../../hooks/useReload"
import { InvariantContext } from "../../../../utils/context"
import { useWallet } from "../../../../wallets/walletProvider"

const Context = createContext(InvariantContext('LiquidityPoolProvider'))

export function useLiquidityPool() {
  return useContext(Context)
}

const LiquidityPoolProvider = props => {

  const { children } = props
  const config = useConfig()
  const walletCtx = useWallet()
  const [reload] = useReload()

  const { bondPools, getPoolByBond } = usePools()

  const [assetSymbol, setAssetSymbol] = useState(bondPools[0].bondAsset.symbol)
  const [duration, setDuration] = useState(bondPools[0].duration.duration)

  console.log(duration);
  const [addAmount, setAddAmount] = useState(0)

  const pool = useMemo(() => getPoolByBond(assetSymbol, duration), [assetSymbol, duration])

  useEffect(() => {
    if (walletCtx.account) {
      pool?.bondAsset.contract.loadAllowance(config.contracts.financingPool?.financingPool).then(reload).catch(Error)
      }
  }, [pool, walletCtx.account])

  const value = {
    pool,

    assetSymbol,
    setAssetSymbol,

    duration,
    setDuration,

    addAmount, 
    setAddAmount,
  }

  return (
    <Context.Provider value={value}>{ children }</Context.Provider>
  )
}

export default LiquidityPoolProvider