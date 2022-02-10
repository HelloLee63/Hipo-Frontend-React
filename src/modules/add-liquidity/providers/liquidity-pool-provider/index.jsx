import { createContext, useContext, useEffect, useMemo, useState } from "react"
import { useConfig } from "../../../../components/providers/configProvider"
import { useReload } from "../../../../hooks/useReload"
import { InvariantContext } from "../../../../utils/context"
import { useWallet } from "../../../../wallets/walletProvider"
import { useLiquidityPools } from "../liquidity-pools-provider"

const Context = createContext(InvariantContext('LiquidityPoolProvider'))

export function useLiquidityPool() {
  return useContext(Context)
}

const LiquidityPoolProvider = props => {

  const { children } = props
  const config = useConfig()
  const walletCtx = useWallet()
  const liquidityPoolsCtx = useLiquidityPools()
  const [assetSymbol, setAssetSymbol] = useState(liquidityPoolsCtx.Assets[0].symbol)
  const [duration, setDuration] = useState(liquidityPoolsCtx.durations[0].duration)
  const [enabling, setEnabling] = useState(false)
  const [approveVisible, setApproveVisible] = useState(false)
  const [adding, setAdding] = useState(false)
  
  const [reload] = useReload()
  const liquidityPool = useMemo(() => liquidityPoolsCtx.getLiquidityPool(assetSymbol, duration), [assetSymbol, duration])

  useEffect(() => {
    liquidityPool.asset.contract.loadCommon().then(reload).catch(Error)
  }, [liquidityPool])
  
  useEffect(() => {
    if (walletCtx.account) {
      liquidityPool?.asset.contract.loadBalance().then(reload).catch(Error)
      }
    }, [liquidityPool, walletCtx.account])

  useEffect(() => {
    if (walletCtx.account) {
      liquidityPool?.contract.loadBalance().then(reload).catch(Error)
    }
  })

  useEffect(() => {
    if (walletCtx.account) {
      liquidityPool?.asset.contract.loadAllowance(config.contracts.financingPool?.financingPool).then(reload).catch(Error)
      }
  }, [liquidityPool, walletCtx.account])

  const value = {
    setAssetSymbol,
    setEnabling,
    setDuration,
    liquidityPool,
    adding, 
    setAdding,
  }

  return (
    <Context.Provider value={value}>{ children }</Context.Provider>
  )
}

export default LiquidityPoolProvider