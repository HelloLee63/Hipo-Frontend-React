
import { createContext, useCallback, useContext, useEffect, useMemo } from "react";
import { useKnownTokens } from "../../../../components/providers/knownTokensProvider";
import { useNetwork } from "../../../../components/providers/networkProvider";
import { useReload } from "../../../../hooks/useReload";
import { InvariantContext } from "../../../../utils/context";
import { useWallet } from "../../../../wallets/walletProvider";
import { Durations } from "../../../issue/providers/debt-pools-provider";

const Context = createContext(InvariantContext('BondPoolsProvider'))

export function useBondPools() {
  return useContext(Context)
}

const BondPoolsProvider = props => {
  
  const { children } = props
  const walletCtx = useWallet()
  const [reload] = useReload()
  const network = useNetwork()

  const {
    wethToken,
    usdcToken,
    usdtToken,
    daiToken, 
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
  } = useKnownTokens()

  const BondPools = useMemo(() => [
    {
      bondAsset: wethToken,
      duration: Durations.FiveDays,
      icon: '/media/tokens/ICON/WETH/5.svg',
      token: bWETH5,
      contract: bWETH5.contract
    },
    {
      bondAsset: wethToken,
      duration: Durations.TenDays,
      icon: '/media/tokens/ICON/WETH/10.svg',
      token: bWETH10,
      contract: bWETH10.contract
    },
    {
      bondAsset: wethToken,
      duration: Durations.FifteenDays,
      icon: '/media/tokens/ICON/WETH/15.svg',
      token: bWETH15,
      contract: bWETH15.contract
    },
    {
      bondAsset: wethToken,
      duration: Durations.ThirtyDays,
      icon: '/media/tokens/ICON/WETH/30.svg',
      token: bWETH30,
      contract: bWETH30.contract
    },
    {
      bondAsset: wethToken,
      duration: Durations.FortyFiveDays,
      icon: '/media/tokens/ICON/WETH/45.svg',
      token: bWETH45,
      contract: bWETH45.contract
    },
    {
      bondAsset: wethToken,
      duration: Durations.SixtyDays,
      icon: '/media/tokens/ICON/WETH/60.svg',
      token: bWETH60,
      contract: bWETH60.contract
    },
    {
      bondAsset: usdcToken,
      duration: Durations.FiveDays,
      icon: '/media/tokens/ICON/USDC/5.svg',
      token: bUSDC5,
      contract: bUSDC5.contract
    },
    {
      bondAsset: usdcToken,
      duration: Durations.TenDays,
      icon: '/media/tokens/ICON/USDC/10.svg',
      token: bUSDC10,
      contract: bUSDC10.contract
    },
    {
      bondAsset: usdcToken,
      duration: Durations.FifteenDays,
      icon: '/media/tokens/ICON/USDC/15.svg',
      token: bUSDC15,
      contract: bUSDC15.contract
    },
    {
      bondAsset: usdcToken,
      duration: Durations.ThirtyDays,
      icon: '/media/tokens/ICON/USDC/30.svg',
      token: bUSDC30,
      contract: bUSDC30.contract
    },
    {
      bondAsset: usdcToken,
      duration: Durations.FortyFiveDays,
      icon: '/media/tokens/ICON/USDC/45.svg',
      token: bUSDC45,
      contract: bUSDC45.contract
    },
    {
      bondAsset: usdcToken,
      duration: Durations.SixtyDays,
      icon: '/media/tokens/ICON/USDC/60.svg',
      token: bUSDC60,
      contract: bUSDC60.contract
    },
    {
      bondAsset: usdtToken,
      duration: Durations.FiveDays,
      icon: '/media/tokens/ICON/USDT/5.svg',
      token: bUSDT5,
      contract: bUSDT5.contract
    },
    {
      bondAsset: usdtToken,
      duration: Durations.TenDays,
      icon: '/media/tokens/ICON/USDT/10.svg',
      token: bUSDT10,
      contract: bUSDT10.contract
    },
    {
      bondAsset: usdtToken,
      duration: Durations.FifteenDays,
      icon: '/media/tokens/ICON/USDT/15.svg',
      token: bUSDT15,
      contract: bUSDT15.contract
    },
    {
      bondAsset: usdtToken,
      duration: Durations.ThirtyDays,
      icon: '/media/tokens/ICON/USDT/30.svg',
      token: bUSDT30,
      contract: bUSDT30.contract
    },
    {
      bondAsset: usdtToken,
      duration: Durations.FortyFiveDays,
      icon: '/media/tokens/ICON/USDT/45.svg',
      token: bUSDT45,
      contract: bUSDT45.contract
    },
    {
      bondAsset: usdtToken,
      duration: Durations.SixtyDays,
      icon: '/media/tokens/ICON/USDT/60.svg',
      token: bUSDT60,
      contract: bUSDT60.contract
    },
    {
      bondAsset: daiToken,
      duration: Durations.FiveDays,
      icon: '/media/tokens/ICON/DAI/5.svg',
      token: bDAI5,
      contract: bDAI5.contract
    },
    {
      bondAsset: daiToken,
      duration: Durations.TenDays,
      icon: '/media/tokens/ICON/DAI/10.svg',
      token: bDAI10,
      contract: bDAI10.contract
    },
    {
      bondAsset: daiToken,
      duration: Durations.FifteenDays,
      icon: '/media/tokens/ICON/DAI/15.svg',
      token: bDAI15,
      contract: bDAI15.contract
    },
    {
      bondAsset: daiToken,
      duration: Durations.ThirtyDays,
      icon: '/media/tokens/ICON/DAI/30.svg',
      token: bDAI30,
      contract: bDAI30.contract
    },
    {
      bondAsset: daiToken,
      duration: Durations.FortyFiveDays,
      icon: '/media/tokens/ICON/DAI/45.svg',
      token: bDAI45,
      contract: bDAI45.contract
    },
    {
      bondAsset: daiToken,
      duration: Durations.SixtyDays,
      icon: '/media/tokens/ICON/DAI/60.svg',
      token: bDAI60,
      contract: bDAI60.contract
    },
  ], [network])

  const BondAssets = useMemo(() => [wethToken, usdcToken, usdtToken, daiToken], [])
  const BondDurations = useMemo(() => [
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
  ], [])

  const getBondAssetBySymbol = useCallback(    
    (bondAssetSymbol) => {
      return BondAssets.find(asset => asset.symbol === bondAssetSymbol)
    }, [BondPools])

  const getBondPool = useCallback(
    (symbol, duration) => {
      return BondPools.find(pool => pool.bondAsset.symbol === symbol && pool.duration === duration)
    }, [BondPools])

  const value = {
    BondAssets,
    getBondAssetBySymbol,
    getBondPool,
    BondDurations
  }

  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  )
}

export default BondPoolsProvider