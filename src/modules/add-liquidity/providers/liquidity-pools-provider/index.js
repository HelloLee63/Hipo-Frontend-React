import { createContext, useCallback, useContext, useEffect, useMemo } from "react"
import { useKnownTokens } from "../../../../components/providers/knownTokensProvider"
import { useNetwork } from "../../../../components/providers/networkProvider"
import { useReload } from "../../../../hooks/useReload"
import { InvariantContext } from "../../../../utils/context"
import { useWallet } from "../../../../wallets/walletProvider"
import { Durations } from "../../../issue/providers/debt-pools-provider"

const Context = createContext(InvariantContext('LiquidityPoolsProvider'))

export function useLiquidityPools() {
  return useContext(Context)
}

const LiquidityPoolsProvider = props => {

  const { children } = props
  const network = useNetwork()
  const walletCtx = useWallet()
  const [reload] = useReload()

  const { 
    wethToken, 
    usdcToken, 
    daiToken, 
    usdtToken,

    lpWETH5,
    lpWETH10,
    lpWETH15,
    lpWETH30,
    lpWETH45,
    lpWETH60,
    lpUSDC5,
    lpUSDC10,
    lpUSDC15,
    lpUSDC30,
    lpUSDC45,
    lpUSDC60,
    lpUSDT5,
    lpUSDT10,
    lpUSDT15,
    lpUSDT30,
    lpUSDT45,
    lpUSDT60,
    lpDAI5,
    lpDAI10,
    lpDAI15,
    lpDAI30,
    lpDAI45,
    lpDAI60,
  } = useKnownTokens()

  const LiquidityPools = useMemo(() => [
    {
      asset: wethToken,
      duration: Durations.FiveDays,
      icon: '/media/tokens/ICON/WETH/5.svg',
      token: lpWETH5,
      contract: lpWETH5.contract
    },
    {
      asset: wethToken,
      duration: Durations.TenDays,
      icon: '/media/tokens/ICON/WETH/10.svg',
      token: lpWETH10,
      contract: lpWETH10.contract
    },
    {
      asset: wethToken,
      duration: Durations.FifteenDays,
      icon: '/media/tokens/ICON/WETH/15.svg',
      token: lpWETH15,
      contract: lpWETH15.contract
    },
    {
      asset: wethToken,
      duration: Durations.ThirtyDays,
      icon: '/media/tokens/ICON/WETH/30.svg',
      token: lpWETH30,
      contract: lpWETH30.contract
    },
    {
      asset: wethToken,
      duration: Durations.FortyFiveDays,
      icon: '/media/tokens/ICON/WETH/45.svg',
      token: lpWETH45,
      contract: lpWETH45.contract
    },
    {
      asset: wethToken,
      duration: Durations.SixtyDays,
      icon: '/media/tokens/ICON/WETH/60.svg',
      token: lpWETH60,
      contract: lpWETH60.contract
    },
    {
      asset: usdcToken,
      duration: Durations.FiveDays,
      icon: '/media/tokens/ICON/USDC/5.svg',
      token: lpUSDC5,
      contract: lpUSDC5.contract
    },
    {
      asset: usdcToken,
      duration: Durations.TenDays,
      icon: '/media/tokens/ICON/USDC/10.svg',
      token: lpUSDC10,
      contract: lpUSDC10.contract
    },
    {
      asset: usdcToken,
      duration: Durations.FifteenDays,
      icon: '/media/tokens/ICON/USDC/15.svg',
      token: lpUSDC15,
      contract: lpUSDC15.contract
    },
    {
      asset: usdcToken,
      duration: Durations.ThirtyDays,
      icon: '/media/tokens/ICON/USDC/30.svg',
      token: lpUSDC30,
      contract: lpUSDC30.contract
    },
    {
      asset: usdcToken,
      duration: Durations.FortyFiveDays,
      icon: '/media/tokens/ICON/USDC/45.svg',
      token: lpUSDC45,
      contract: lpUSDC45.contract
    },
    {
      asset: usdcToken,
      duration: Durations.SixtyDays,
      icon: '/media/tokens/ICON/USDC/60.svg',
      token: lpUSDC60,
      contract: lpUSDC60.contract
    },
    {
      asset: usdtToken,
      duration: Durations.FiveDays,
      icon: '/media/tokens/ICON/USDT/5.svg',
      token: lpUSDT5,
      contract: lpUSDT5.contract
    },
    {
      asset: usdtToken,
      duration: Durations.TenDays,
      icon: '/media/tokens/ICON/USDT/10.svg',
      token: lpUSDT10,
      contract: lpUSDT10.contract
    },
    {
      asset: usdtToken,
      duration: Durations.FifteenDays,
      icon: '/media/tokens/ICON/USDT/15.svg',
      token: lpUSDT15,
      contract: lpUSDT15.contract
    },
    {
      asset: usdtToken,
      duration: Durations.ThirtyDays,
      icon: '/media/tokens/ICON/USDT/30.svg',
      token: lpUSDT30,
      contract: lpUSDT30.contract
    },
    {
      asset: usdtToken,
      duration: Durations.FortyFiveDays,
      icon: '/media/tokens/ICON/USDT/45.svg',
      token: lpUSDT45,
      contract: lpUSDT45.contract
    },
    {
      asset: usdtToken,
      duration: Durations.SixtyDays,
      icon: '/media/tokens/ICON/USDT/60.svg',
      token: lpUSDT60,
      contract: lpUSDT60.contract
    },
    {
      asset: daiToken,
      duration: Durations.FiveDays,
      icon: '/media/tokens/ICON/DAI/5.svg',
      token: lpDAI5,
      contract: lpDAI5.contract
    },
    {
      asset: daiToken,
      duration: Durations.TenDays,
      icon: '/media/tokens/ICON/DAI/10.svg',
      token: lpDAI10,
      contract: lpDAI10.contract
    },
    {
      asset: daiToken,
      duration: Durations.FifteenDays,
      icon: '/media/tokens/ICON/DAI/15.svg',
      token: lpDAI15,
      contract: lpDAI15.contract
    },
    {
      asset: daiToken,
      duration: Durations.ThirtyDays,
      icon: '/media/tokens/ICON/DAI/30.svg',
      token: lpDAI30,
      contract: lpDAI30.contract
    },
    {
      asset: daiToken,
      duration: Durations.FortyFiveDays,
      icon: '/media/tokens/ICON/DAI/45.svg',
      token: lpDAI45,
      contract: lpDAI45.contract
    },
    {
      asset: daiToken,
      duration: Durations.SixtyDays,
      icon: '/media/tokens/ICON/DAI/60.svg',
      token: lpDAI60,
      contract: lpDAI60.contract
    },
  ], [network])
  
  const Assets = [ wethToken, usdcToken, usdtToken, daiToken ]
  
  const durations = [
    {
      duration: '300',
      lable: '5 Days',
      id: 1
    }, 
    {
      duration: '600',
      lable: '10 Days',
      id: 2
    },
    {
      duration: '900',
      lable: '15 Days',
      id: 3
    },
    {
      duration: '1800',
      lable: '30 Days',
      id: 4
    },
    {
      duration: '2700',
      lable: '45 Days',
      id: 5
    },
    {
      duration: '3600',
      lable: '60 Days',
      id: 6
    }
  ]
  
  const getLiquidityPool = useCallback(
    (asset, duration) => {
      return LiquidityPools.find(liquidityPool => liquidityPool.asset.symbol === asset && liquidityPool.duration === duration)
    },
    [LiquidityPools]
  )

  useEffect(() => {
    if(walletCtx.account) {
      LiquidityPools.forEach(pool => {
        pool.contract.loadBalance().then(reload).catch(Error)
      })
    }
  },[walletCtx.account, LiquidityPools])

  const value = {
    Assets,
    durations,
    LiquidityPools,
    getLiquidityPool,
  }

  return (
    <Context.Provider value={value}>{ children }</Context.Provider>
  )
}

export default LiquidityPoolsProvider