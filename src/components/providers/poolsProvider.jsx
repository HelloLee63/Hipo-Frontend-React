import { createContext, useCallback, useContext, useMemo } from "react"
import { InvariantContext } from "../../utils/context"
import { useKnownTokens } from "./knownTokensProvider"

export const Durations = {
    FiveDays: '300',
    TenDays: '600',
    FifteenDays: '900',
    ThirtyDays: '1800',
    FortyFiveDays: '2700',
    SixtyDays: '3600'
}

export const DurationsMeta = [
  {
    duration: Durations.FiveDays,
    description: '5 Days',
    id: 1
  }, 
  {
    duration: Durations.TenDays,
    description: '10 Days',
    id: 2
  },
  {
    duration: Durations.FifteenDays,
    description: '15 Days',
    id: 3
  },
  {
    duration: Durations.ThirtyDays,
    description: '30 Days',
    id: 4
  },
  {
    duration: Durations.FortyFiveDays,
    description: '45 Days',
    id: 5
  },
  {
    duration: Durations.SixtyDays,
    description: '60 Days',
    id: 6
  }
]

const Context = createContext(InvariantContext('PoolsProvider'))

export function usePools() {
  return useContext(Context)
}

const PoolsProvider = ({ children }) => {

  const {
    wethToken,
    usdcToken,
    usdtToken,
    daiToken,

    usdcwethLpToken,
    wethusdtLpToken,
    daiwethLpToken,

    cuUSDCWETH,
    cuWETHUSDT,
    cuDAIWETH,
    
    bWETH5,
    bWETH10,
    bWETH15,
    bWETH30,
    bWETH45,
    bWETH60,
    bUSDC5,
    bUSDC10,
    bUSDC15,
    bUSDC30,
    bUSDC45,
    bUSDC60,
    bUSDT5,
    bUSDT10,
    bUSDT15,
    bUSDT30,
    bUSDT45,
    bUSDT60,
    bDAI5,
    bDAI10,
    bDAI15,
    bDAI30,
    bDAI45,
    bDAI60,
    
    dWETH5,
    dWETH10,
    dWETH15,
    dWETH30,
    dWETH45,
    dWETH60,
    dUSDC5,
    dUSDC10,
    dUSDC15,
    dUSDC30,
    dUSDC45,
    dUSDC60,
    dUSDT5,
    dUSDT10,
    dUSDT15,
    dUSDT30,
    dUSDT45,
    dUSDT60,
    dDAI5,
    dDAI10,
    dDAI15,
    dDAI30,
    dDAI45,
    dDAI60,

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

  const assets = useMemo(() => [wethToken, usdcToken, usdtToken, daiToken], [])

  const bondPools = useMemo(() => [
    {
      bondAsset: wethToken,
      duration: DurationsMeta[0],
      icon: '/media/tokens/ICON/WETH/5.svg',
      bToken: bWETH5,
      dToken: dWETH5,
      lpToken: lpWETH5,
      contract: bWETH5.contract
    },
    {
      bondAsset: wethToken,
      duration: DurationsMeta[1],
      icon: '/media/tokens/ICON/WETH/10.svg',
      bToken: bWETH10,
      dToken: dWETH10,
      lpToken: lpWETH10,
      contract: bWETH10.contract
    },
    {
      bondAsset: wethToken,
      duration: DurationsMeta[2],
      icon: '/media/tokens/ICON/WETH/15.svg',
      bToken: bWETH15,
      dToken: dWETH15,
      lpToken: lpWETH15,
      contract: bWETH15.contract
    },
    {
      bondAsset: wethToken,
      duration: DurationsMeta[3],
      icon: '/media/tokens/ICON/WETH/30.svg',
      bToken: bWETH30,
      dToken: dWETH30,
      lpToken: lpWETH30,
      contract: bWETH30.contract
    },
    {
      bondAsset: wethToken,
      duration: DurationsMeta[4],
      icon: '/media/tokens/ICON/WETH/45.svg',
      bToken: bWETH45,
      dToken: dWETH45,
      lpToken: lpWETH45,
      contract: bWETH45.contract
    },
    {
      bondAsset: wethToken,
      duration: DurationsMeta[5],
      icon: '/media/tokens/ICON/WETH/60.svg',
      bToken: bWETH60,
      dToken: dWETH60,
      lpToken: lpWETH60,
      contract: bWETH60.contract
    },
    {
      bondAsset: usdcToken,
      duration: DurationsMeta[0],
      icon: '/media/tokens/ICON/USDC/5.svg',
      bToken: bUSDC5,
      dToken: dUSDC5,
      lpToken: lpUSDC5,
      contract: bUSDC5.contract
    },
    {
      bondAsset: usdcToken,
      duration: DurationsMeta[1],
      icon: '/media/tokens/ICON/USDC/10.svg',
      bToken: bUSDC10,
      dToken: dUSDC10,
      lpToken: lpUSDC10,
      contract: bUSDC10.contract
    },
    {
      bondAsset: usdcToken,
      duration: DurationsMeta[2],
      icon: '/media/tokens/ICON/USDC/15.svg',
      bToken: bUSDC15,
      dToken: dUSDC15,
      lpToken: lpUSDC15,
      contract: bUSDC15.contract
    },
    {
      bondAsset: usdcToken,
      duration: DurationsMeta[3],
      icon: '/media/tokens/ICON/USDC/30.svg',
      bToken: bUSDC30,
      dToken: dUSDC30,
      lpToken: lpUSDC30,
      contract: bUSDC30.contract
    },
    {
      bondAsset: usdcToken,
      duration: DurationsMeta[4],
      icon: '/media/tokens/ICON/USDC/45.svg',
      bToken: bUSDC45,
      dToken: dUSDC45,
      lpToken: lpUSDC45,
      contract: bUSDC45.contract
    },
    {
      bondAsset: usdcToken,
      duration: DurationsMeta[5],
      icon: '/media/tokens/ICON/USDC/60.svg',
      bToken: bUSDC60,
      dToken: dUSDC60,
      lpToken: lpUSDC60,
      contract: bUSDC60.contract
    },
    {
      bondAsset: usdtToken,
      duration: DurationsMeta[0],
      icon: '/media/tokens/ICON/USDT/5.svg',
      bToken: bUSDT5,
      dToken: dUSDT5,
      lpToken: lpUSDT5,
      contract: bUSDT5.contract
    },
    {
      bondAsset: usdtToken,
      duration: DurationsMeta[1],
      icon: '/media/tokens/ICON/USDT/10.svg',
      bToken: bUSDT10,
      dToken: dUSDT10,
      lpToken: lpUSDT10,
      contract: bUSDT10.contract
    },
    {
      bondAsset: usdtToken,
      duration: DurationsMeta[2],
      icon: '/media/tokens/ICON/USDT/15.svg',
      bToken: bUSDT15,
      dToken: dUSDT15,
      lpToken: lpUSDT15,
      contract: bUSDT15.contract
    },
    {
      bondAsset: usdtToken,
      duration: DurationsMeta[3],
      icon: '/media/tokens/ICON/USDT/30.svg',
      bToken: bUSDT30,
      dToken: dUSDT30,
      lpToken: lpUSDT30,
      contract: bUSDT30.contract
    },
    {
      bondAsset: usdtToken,
      duration: DurationsMeta[4],
      icon: '/media/tokens/ICON/USDT/45.svg',
      bToken: bUSDT45,
      dToken: dUSDT45,
      lpToken: lpUSDT45,
      contract: bUSDT45.contract
    },
    {
      bondAsset: usdtToken,
      duration: DurationsMeta[5],
      icon: '/media/tokens/ICON/USDT/60.svg',
      bToken: bUSDT60,
      dToken: dUSDT60,
      lpToken: lpUSDT60,
      contract: bUSDT60.contract
    },
    {
      bondAsset: daiToken,
      duration: DurationsMeta[0],
      icon: '/media/tokens/ICON/DAI/5.svg',
      bToken: bDAI5,
      dToken: dDAI5,
      lpToken: lpDAI5,
      contract: bDAI5.contract
    },
    {
      bondAsset: daiToken,
      duration: DurationsMeta[1],
      icon: '/media/tokens/ICON/DAI/10.svg',
      bToken: bDAI10,
      dToken: dDAI10,
      lpToken: lpDAI10,
      contract: bDAI10.contract
    },
    {
      bondAsset: daiToken,
      duration: DurationsMeta[2],
      icon: '/media/tokens/ICON/DAI/15.svg',
      bToken: bDAI15,
      dToken: dDAI15,
      lpToken: lpDAI15,
      contract: bDAI15.contract
    },
    {
      bondAsset: daiToken,
      duration: DurationsMeta[3],
      icon: '/media/tokens/ICON/DAI/30.svg',
      bToken: bDAI30,
      dToken: dDAI30,
      lpToken: lpDAI30,
      contract: bDAI30.contract
    },
    {
      bondAsset: daiToken,
      duration: DurationsMeta[4],
      icon: '/media/tokens/ICON/DAI/45.svg',
      bToken: bDAI45,
      dToken: dDAI45,
      lpToken: lpDAI45,
      contract: bDAI45.contract
    },
    {
      bondAsset: daiToken,
      duration: DurationsMeta[5],
      icon: '/media/tokens/ICON/DAI/60.svg',
      bToken: bDAI60,
      dToken: dDAI60,
      lpToken: lpDAI60,
      contract: bDAI60.contract
    },
  ], [])

  const collateralPools = useMemo(() => [
    {
      collateralAsset: usdcwethLpToken,
      underlyingAssets: [wethToken, usdcToken],
      contract: cuUSDCWETH.contract
    },
    {
      collateralAsset: wethusdtLpToken,
      underlyingAssets: [wethToken, usdtToken],
      contract: cuWETHUSDT.contract
    },
    {
      collateralAsset: daiwethLpToken,
      underlyingAssets: [wethToken, daiToken],
      contract: cuDAIWETH.contract
    }
  ], [])

  const getPoolByBond = useCallback((bondAsset, duration) => {
    return bondPools.find((pool) => pool.bondAsset.symbol === bondAsset && 
      pool.duration.duration === duration)
  }, [bondPools])

  const getBondPoolByBond = useCallback((bondAsset, duration) => {
    return bondPools.find((pool) => pool.bondAsset.address === bondAsset && 
      pool.duration.duration === duration)
  }, [bondPools])

  const getCollateralPoolBySymbol = useCallback(
    (collateralAssetSymbol) => {
      return collateralPools.find(pool => pool.collateralAsset.symbol === collateralAssetSymbol)
    }, [collateralPools])
  
  const getCollateralPoolByAddress = useCallback(
    (collateralAssetAddress) => {
      return collateralPools.find(pool => pool.collateralAsset.address === collateralAssetAddress.toLowerCase())
    }
  , [collateralPools])

  const value = {
    assets,
    bondPools,
    collateralPools,
    getPoolByBond,
    getBondPoolByBond,
    getCollateralPoolBySymbol,
    getCollateralPoolByAddress
  }

  return (
    <Context.Provider value={value}>
      { children }
    </Context.Provider>
  )
}

export default PoolsProvider