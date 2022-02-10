// import BigNumber from "bignumber.js";
import { createContext, useCallback, useContext, useEffect, useMemo } from "react";
import { useConfig } from "../../../components/providers/configProvider";
import { useKnownTokens } from "../../../components/providers/knownTokensProvider";
import { InvariantContext } from "../../../utils/context";

import { Durations } from "../../issue/providers/debt-pools-provider";


const Context = createContext(InvariantContext('BondMarketProvider'))

export function useBondMarket() {
  return useContext(Context)
}

const BondMarketProvider = props => {

  const { children } = props
  const config = useConfig()

  const { 
    wethToken, 
    usdcToken, 
    usdtToken, 
    daiToken, 
  } = useKnownTokens()
 
  const Bonds = useMemo(() => [
    {
      asset: wethToken,
      duration: Durations.FiveDays,
      icon: '/media/tokens/ICON/WETH/5.svg',
      id: 1,
      // token: dWETH5,
      // contract: dWETH5.Contract
    },
    {
      asset: wethToken,
      duration: Durations.TenDays,
      icon: '/media/tokens/ICON/WETH/10.svg',
      id: 2,
      // token: dWETH10,
      // contract: dWETH10.Contract
    },
    {
      asset: wethToken,
      duration: Durations.FifteenDays,
      icon: '/media/tokens/ICON/WETH/15.svg',
      id: 3,
      // token: dWETH15,
      // contract: dWETH15.Contract
    },
    {
      asset: wethToken,
      duration: Durations.ThirtyDays,
      icon: '/media/tokens/ICON/WETH/30.svg',
      id: 4,
      // token: dWETH30,
      // contract: dWETH30.Contract
    },
    {
      asset: wethToken,
      duration: Durations.FortyFiveDays,
      icon: '/media/tokens/ICON/WETH/45.svg',
      id: 5,
      // token: dWETH45,
      // contract: dWETH45.Contract
    },
    {
      asset: wethToken,
      duration: Durations.SixtyDays,
      icon: '/media/tokens/ICON/WETH/60.svg',
      id: 6,
      // token: dWETH60,
      // contract: dWETH60.Contract
    },
    {
      asset: usdcToken,
      duration: Durations.FiveDays,
      icon: '/media/tokens/ICON/USDC/5.svg',
      id: 7,
      // token: dUSDC5,
      // contract: dUSDC5.Contract
    },
    {
      asset: usdcToken,
      duration: Durations.TenDays,
      icon: '/media/tokens/ICON/USDC/10.svg',
      id: 8,
      // token: dUSDC10,
      // contract: dUSDC10.Contract
    },
    {
      asset: usdcToken,
      duration: Durations.FifteenDays,
      icon: '/media/tokens/ICON/USDC/15.svg',
      id: 9,
      // token: dUSDC15,
      // contract: dUSDC15.Contract
    },
    {
      asset: usdcToken,
      duration: Durations.ThirtyDays,
      icon: '/media/tokens/ICON/USDC/30.svg',
      id: 10,
      // token: dUSDC30,
      // contract: dUSDC30.Contract
    },
    {
      asset: usdcToken,
      duration: Durations.FortyFiveDays,
      icon: '/media/tokens/ICON/USDC/45.svg',
      id: 11,
      // token: dUSDC45,
      // contract: dUSDC45.Contract
    },
    {
      asset: usdcToken,
      duration: Durations.SixtyDays,
      icon: '/media/tokens/ICON/USDC/60.svg',
      id: 12,
      // token: dUSDC60,
      // contract: dUSDC60.Contract
    },
    {
      asset: usdtToken,
      duration: Durations.FiveDays,
      icon: '/media/tokens/ICON/USDT/5.svg',
      id: 13,
      // token: dUSDT5,
      // contract: dUSDT5.Contract
    },
    {
      asset: usdtToken,
      duration: Durations.TenDays,
      icon: '/media/tokens/ICON/USDT/10.svg',
      id: 14,
      // token: dUSDT10,
      // contract: dUSDT10.Contract
    },
    {
      asset: usdtToken,
      duration: Durations.FifteenDays,
      icon: '/media/tokens/ICON/USDT/15.svg',
      id: 15,
      // token: dUSDT15,
      // contract: dUSDT15.Contract
    },
    {
      asset: usdtToken,
      duration: Durations.ThirtyDays,
      icon: '/media/tokens/ICON/USDT/30.svg',
      id: 16,
      // token: dUSDT30,
      // contract: dUSDT30.Contract
    },
    {
      asset: usdtToken,
      duration: Durations.FortyFiveDays,
      icon: '/media/tokens/ICON/USDT/45.svg',
      id: 17,
      // token: dUSDT45,
      // contract: dUSDT45.Contract
    },
    {
      asset: usdtToken,
      duration: Durations.SixtyDays,
      icon: '/media/tokens/ICON/USDT/60.svg',
      id: 18,
      // token: dUSDT60,
      // contract: dUSDT60.Contract
    },
    {
      asset: daiToken,
      duration: Durations.FiveDays,
      icon: '/media/tokens/ICON/DAI/5.svg',
      id: 19,
      // token: dDAI5,
      // contract: dDAI5.Contract
    },
    {
      asset: daiToken,
      duration: Durations.TenDays,
      icon: '/media/tokens/ICON/DAI/10.svg',
      id: 20,
      // token: dDAI10,
      // contract: dDAI10.Contract
    },
    {
      asset: daiToken,
      duration: Durations.FifteenDays,
      icon: '/media/tokens/ICON/DAI/15.svg',
      id: 21,
      // token: dDAI15,
      // contract: dDAI15.Contract
    },
    {
      asset: daiToken,
      duration: Durations.ThirtyDays,
      icon: '/media/tokens/ICON/DAI/30.svg',
      id: 22,
      // token: dDAI30,
      // contract: dDAI30.Contract
    },
    {
      asset: daiToken,
      duration: Durations.FortyFiveDays,
      icon: '/media/tokens/ICON/DAI/45.svg',
      id: 23,
      // token: dDAI45,
      // contract: dDAI45.Contract
    },
    {
      asset: daiToken,
      duration: Durations.SixtyDays,
      icon: '/media/tokens/ICON/DAI/60.svg',
      id: 24,
      // token: dDAI60,
      // contract: dDAI60.Contract
    },
  ])

  const getTransactions = useCallback(() => {
    fetch('https://api-rinkeby.etherscan.io/api?module=account&action=txlist&address=0x3376B3f38B2F8DeAaA0FC71aeBc5A2845178d990&startblock=0&endblock=99999999&sort=asc&apikey=T66G8AXRHGVFJ1VWWPM39PDG59Y8V747E7')
      .then(res => res.json())
      .then(data => {return data})
  }, [])

  const value = {
    Bonds,
    getTransactions,
  }

  return (
    <Context.Provider value={value}>
      { children }
    </Context.Provider>
  )
}

export default BondMarketProvider