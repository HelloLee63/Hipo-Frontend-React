import { createContext, useCallback, useContext, useMemo } from "react";
import { useKnownTokens } from "../../../../components/providers/knownTokensProvider";
import { InvariantContext } from "../../../../utils/context";

export const Durations = {
  FiveDays: '300',
  TenDays: '600',
  FifteenDays: '900',
  ThirtyDays: '1800',
  FortyFiveDays: '2700',
  SixtyDays: '3600'
}

const Context = createContext(InvariantContext('DebtPoolsProvider'))

export function useDebtPools() {
  return useContext(Context)
}

const DebtPoolsProvider = props => {
  
  const { children } = props
  const { 
    usdcwethLpToken, 
    wethusdtLpToken, 
    daiwethLpToken, 
    wethToken, 
    usdcToken, 
    usdtToken, 
    daiToken,
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
    cuUSDCWETH,
    cuWETHUSDT,
    cuDAIWETH 
  } = useKnownTokens()

  const Collaterals = useMemo(() => [
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
  ])

  const DurationsMeta = useMemo(() => [
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
  ])

  const DebtPools = useMemo(() => [
    {
      debtAsset: wethToken,
      duration: Durations.FiveDays,
      token: dWETH5,
      contract: dWETH5.Contract
    },
    {
      debtAsset: wethToken,
      duration: Durations.TenDays,
      token: dWETH10,
      contract: dWETH10.Contract
    },
    {
      debtAsset: wethToken,
      duration: Durations.FifteenDays,
      token: dWETH15,
      contract: dWETH15.Contract
    },
    {
      debtAsset: wethToken,
      duration: Durations.ThirtyDays,
      token: dWETH30,
      contract: dWETH30.Contract
    },
    {
      debtAsset: wethToken,
      duration: Durations.FortyFiveDays,
      token: dWETH45,
      contract: dWETH45.Contract
    },
    {
      debtAsset: wethToken,
      duration: Durations.SixtyDays,
      token: dWETH60,
      contract: dWETH60.Contract
    },
    {
      debtAsset: usdcToken,
      duration: Durations.FiveDays,
      token: dUSDC5,
      contract: dUSDC5.Contract
    },
    {
      debtAsset: usdcToken,
      duration: Durations.TenDays,
      token: dUSDC10,
      contract: dUSDC10.Contract
    },
    {
      debtAsset: usdcToken,
      duration: Durations.FifteenDays,
      token: dUSDC15,
      contract: dUSDC15.Contract
    },
    {
      debtAsset: usdcToken,
      duration: Durations.ThirtyDays,
      token: dUSDC30,
      contract: dUSDC30.Contract
    },
    {
      debtAsset: usdcToken,
      duration: Durations.FortyFiveDays,
      token: dUSDC45,
      contract: dUSDC45.Contract
    },
    {
      debtAsset: usdcToken,
      duration: Durations.SixtyDays,
      token: dUSDC60,
      contract: dUSDC60.Contract
    },
    {
      debtAsset: usdtToken,
      duration: Durations.FiveDays,
      token: dUSDT5,
      contract: dUSDT5.Contract
    },
    {
      debtAsset: usdtToken,
      duration: Durations.TenDays,
      token: dUSDT10,
      contract: dUSDT10.Contract
    },
    {
      debtAsset: usdtToken,
      duration: Durations.FifteenDays,
      token: dUSDT15,
      contract: dUSDT15.Contract
    },
    {
      debtAsset: usdtToken,
      duration: Durations.ThirtyDays,
      token: dUSDT30,
      contract: dUSDT30.Contract
    },
    {
      debtAsset: usdtToken,
      duration: Durations.FortyFiveDays,
      token: dUSDT45,
      contract: dUSDT45.Contract
    },
    {
      debtAsset: usdtToken,
      duration: Durations.SixtyDays,
      token: dUSDT60,
      contract: dUSDT60.Contract
    },
    {
      debtAsset: daiToken,
      duration: Durations.FiveDays,
      token: dDAI5,
      contract: dDAI5.Contract
    },
    {
      debtAsset: daiToken,
      duration: Durations.TenDays,
      token: dDAI10,
      contract: dDAI10.Contract
    },
    {
      debtAsset: daiToken,
      duration: Durations.FifteenDays,
      token: dDAI15,
      contract: dDAI15.Contract
    },
    {
      debtAsset: daiToken,
      duration: Durations.ThirtyDays,
      token: dDAI30,
      contract: dDAI30.Contract
    },
    {
      debtAsset: daiToken,
      duration: Durations.FortyFiveDays,
      token: dDAI45,
      contract: dDAI45.Contract
    },
    {
      debtAsset: daiToken,
      duration: Durations.SixtyDays,
      token: dDAI60,
      contract: dDAI60.Contract
    },
  ])

  const getCollateralAssetBySymbol = useCallback(
    (collateralAssetSymbol) => {
      return Collaterals.find(collateral => collateral.collateralAsset.symbol === collateralAssetSymbol)
    }, [Collaterals]
  )

  const getDebtAssetByLable = useCallback(
    (debtDuration, debtAssetLable) => {
      return DebtPools.find(debtPool => debtPool.duration === debtDuration && debtPool.debtAsset.symbol === debtAssetLable)
    },[DebtPools]
  )
  
  const value = {
    Collaterals,
    DurationsMeta,
    DebtPools,
    getCollateralAssetBySymbol,
    getDebtAssetByLable
  }

  return (
    <Context.Provider value={value}>
      { children }
    </Context.Provider>
  )  
}

export default DebtPoolsProvider