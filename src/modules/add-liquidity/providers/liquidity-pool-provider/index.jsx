import { createContext, useContext, useEffect, useMemo } from "react"
import { useConfig } from "../../../../components/providers/configProvider"
import { useKnownTokens } from "../../../../components/providers/knownTokensProvider"
import { useReload } from "../../../../hooks/useReload"
import { InvariantContext } from "../../../../utils/context"
import { useWallet } from "../../../../wallets/walletProvider"
import { useLiquidityPools } from "../liquidity-pools-provider"

const Context = createContext(InvariantContext('LiquidityPoolProvider'))

export function useLiquidityPool() {
  return useContext(Context)
}

const LiquidityPoolProvider = props => {

  const { assetAddress, duration, children } = props
  const config = useConfig()
  const walletCtx = useWallet()
  const liquidityPoolsCtx = useLiquidityPools()
  const { getLiquidityPool } = useLiquidityPools() 
  const [reload] = useReload()
  const liquidityPool = useMemo(() => getLiquidityPool(assetAddress, duration), [assetAddress, duration])

  useEffect(() => {
    if (walletCtx.account) {
      liquidityPool?.asset.forEach(token => {
        (token.contract).loadBalance().then(reload).catch(Error)
        // (token.contract).loadAllowance(config.contracts.financingPool?.financingPool).then(reload).catch(Error)
      })
    }
  }, [liquidityPool, walletCtx.account])

  useEffect(() => {
    if (walletCtx.account) {
      liquidityPool?.asset.forEach(token => {
        
        (token.contract).loadAllowance(config.contracts.financingPool?.financingPool).then(reload).catch(Error)
      })
    }
  }, [liquidityPool, walletCtx.account])

  const value = {
    liquidityPoolMeta: liquidityPool,
  }

  return (
    <Context.Provider value={value}>{ children }</Context.Provider>
  )
}

export default LiquidityPoolProvider