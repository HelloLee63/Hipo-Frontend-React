import { createContext, useCallback, useContext, useEffect, useMemo } from "react";
import { useKnownTokens } from "../../../components/providers/knownTokensProvider";
import { useReload } from "../../../hooks/useReload";
import { InvariantContext } from "../../../utils/context";
import { Durations } from "../../issue/providers/debt-pools-provider";



const Context = createContext(InvariantContext('BondMarketProvider'))

export function useBondMarket() {
  return useContext(Context)
}

const BondMarketProvider = ({ children }) => {
  
  const [reload] = useReload()

  console.log('Bond Market Provider is rendered');

  const { 
    wethToken, 
    usdcToken, 
    usdtToken, 
    daiToken, 
    cuUSDCWETH,
    cuWETHUSDT,
    cuDAIWETH,
    tokens,
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

  // const colTokens = useMemo(
  //   () => [ 
  //     cuUSDCWETH,
  //     cuWETHUSDT,
  //     cuDAIWETH,
  //   ]
  // )

  // const uniPools = [tokens[0], tokens[1], tokens[2]]

  // const Bonds = useMemo(() => [
  //   {
  //     asset: wethToken,
  //     duration: Durations.FiveDays,
  //     icon: '/media/tokens/ICON/WETH/5.svg',
  //     id: 1,
  //     bondToken:bWETH5,
  //     lpToken:lpWETH5, 
  //   },
  //   {
  //     asset: wethToken,
  //     duration: Durations.TenDays,
  //     icon: '/media/tokens/ICON/WETH/10.svg',
  //     id: 2,
  //     bondToken:bWETH10,
  //     lpToken:lpWETH10,
  //   },
  //   {
  //     asset: wethToken,
  //     duration: Durations.FifteenDays,
  //     icon: '/media/tokens/ICON/WETH/15.svg',
  //     id: 3,
  //     bondToken:bWETH15,
  //     lpToken:lpWETH15,
  //   },
  //   {
  //     asset: wethToken,
  //     duration: Durations.ThirtyDays,
  //     icon: '/media/tokens/ICON/WETH/30.svg',
  //     id: 4,
  //     bondToken:bWETH30,
  //     lpToken:lpWETH30,
  //   },
  //   {
  //     asset: wethToken,
  //     duration: Durations.FortyFiveDays,
  //     icon: '/media/tokens/ICON/WETH/45.svg',
  //     id: 5,
  //     bondToken:bWETH45,
  //     lpToken:lpWETH45,
  //   },
  //   {
  //     asset: wethToken,
  //     duration: Durations.SixtyDays,
  //     icon: '/media/tokens/ICON/WETH/60.svg',
  //     id: 6,
  //     bondToken:bWETH60,
  //     lpToken:lpWETH60,
  //   },
  //   {
  //     asset: usdcToken,
  //     duration: Durations.FiveDays,
  //     icon: '/media/tokens/ICON/USDC/5.svg',
  //     id: 7,
  //     bondToken:bUSDC5,
  //     lpToken:lpUSDC5,
  //   },
  //   {
  //     asset: usdcToken,
  //     duration: Durations.TenDays,
  //     icon: '/media/tokens/ICON/USDC/10.svg',
  //     id: 8,
  //     bondToken:bUSDC10,
  //     lpToken:lpUSDC10,
  //   },
  //   {
  //     asset: usdcToken,
  //     duration: Durations.FifteenDays,
  //     icon: '/media/tokens/ICON/USDC/15.svg',
  //     id: 9,
  //     bondToken:bUSDC15,
  //     lpToken:lpUSDC15,
  //   },
  //   {
  //     asset: usdcToken,
  //     duration: Durations.ThirtyDays,
  //     icon: '/media/tokens/ICON/USDC/30.svg',
  //     id: 10,
  //     bondToken:bUSDC30,
  //     lpToken:lpUSDC30,
  //   },
  //   {
  //     asset: usdcToken,
  //     duration: Durations.FortyFiveDays,
  //     icon: '/media/tokens/ICON/USDC/45.svg',
  //     id: 11,
  //     bondToken:bUSDC45,
  //     lpToken:lpUSDC45,
  //   },
  //   {
  //     asset: usdcToken,
  //     duration: Durations.SixtyDays,
  //     icon: '/media/tokens/ICON/USDC/60.svg',
  //     id: 12,
  //     bondToken:bUSDC60,
  //     lpToken:lpUSDC60,
  //   },
  //   {
  //     asset: usdtToken,
  //     duration: Durations.FiveDays,
  //     icon: '/media/tokens/ICON/USDT/5.svg',
  //     id: 13,
  //     bondToken:bUSDT5,
  //     lpToken:lpUSDT5,
  //   },
  //   {
  //     asset: usdtToken,
  //     duration: Durations.TenDays,
  //     icon: '/media/tokens/ICON/USDT/10.svg',
  //     id: 14,
  //     bondToken:bUSDT10,
  //     lpToken:lpUSDT10,
  //   },
  //   {
  //     asset: usdtToken,
  //     duration: Durations.FifteenDays,
  //     icon: '/media/tokens/ICON/USDT/15.svg',
  //     id: 15,
  //     bondToken:bUSDT15,
  //     lpToken:lpUSDT15,
  //   },
  //   {
  //     asset: usdtToken,
  //     duration: Durations.ThirtyDays,
  //     icon: '/media/tokens/ICON/USDT/30.svg',
  //     id: 16,
  //     bondToken:bUSDT30,
  //     lpToken:lpUSDT30,
  //   },
  //   {
  //     asset: usdtToken,
  //     duration: Durations.FortyFiveDays,
  //     icon: '/media/tokens/ICON/USDT/45.svg',
  //     id: 17,
  //     bondToken:bUSDT45,
  //     lpToken:lpUSDT45,
  //   },
  //   {
  //     asset: usdtToken,
  //     duration: Durations.SixtyDays,
  //     icon: '/media/tokens/ICON/USDT/60.svg',
  //     id: 18,
  //     bondToken:bUSDT60,
  //     lpToken:lpUSDT60,
  //   },
  //   {
  //     asset: daiToken,
  //     duration: Durations.FiveDays,
  //     icon: '/media/tokens/ICON/DAI/5.svg',
  //     id: 19,
  //     bondToken:bDAI5,
  //     lpToken:lpDAI5,
  //   },
  //   {
  //     asset: daiToken,
  //     duration: Durations.TenDays,
  //     icon: '/media/tokens/ICON/DAI/10.svg',
  //     id: 20,
  //     bondToken:bDAI10,
  //     lpToken:lpDAI10,
  //   },
  //   {
  //     asset: daiToken,
  //     duration: Durations.FifteenDays,
  //     icon: '/media/tokens/ICON/DAI/15.svg',
  //     id: 21,
  //     bondToken:bDAI15,
  //     lpToken:lpDAI15,
  //   },
  //   {
  //     asset: daiToken,
  //     duration: Durations.ThirtyDays,
  //     icon: '/media/tokens/ICON/DAI/30.svg',
  //     id: 22,
  //     bondToken:bDAI30,
  //     lpToken:lpDAI30,
  //   },
  //   {
  //     asset: daiToken,
  //     duration: Durations.FortyFiveDays,
  //     icon: '/media/tokens/ICON/DAI/45.svg',
  //     id: 23,
  //     bondToken:bDAI45,
  //     lpToken:lpDAI45,
  //   },
  //   {
  //     asset: daiToken,
  //     duration: Durations.SixtyDays,
  //     icon: '/media/tokens/ICON/DAI/60.svg',
  //     id: 24,
  //     bondToken:bDAI60,
  //     lpToken:lpDAI60,
  //   },
  // ])

  // useEffect(() => {
  //   Bonds.forEach(bond => {
  //     bond.lpToken.contract.loadCommon().then(reload).catch(Error)
  //   })
  // }, [Bonds])

  // useEffect(() => {
  //   colTokens.forEach(token => {
  //     token.contract.loadCommon().then(reload).catch(Error)
  //   })
  // }, [colTokens])

  // useEffect(() => {
  //   wethToken.contract.loadBalance(tokens[0].address).then(reload).catch(Error)
  // },[tokens[0]])

  // useEffect(() => {
  //   wethToken.contract.loadBalance(tokens[1].address).then(reload).catch(Error)
  // }, [tokens[1]])

  // useEffect(() => {
  //   wethToken.contract.loadBalance(tokens[2].address).then(reload).catch(Error)
  // }, [tokens[2]])

  // useEffect(() => {
  //   usdcToken.contract.loadBalance(tokens[0].address).then(reload).catch(Error)
  // }, [tokens[0]])

  // useEffect(() => {
  //   usdtToken.contract.loadBalance(tokens[0].address).then(reload).catch(Error)
  // }, [tokens[1]])

  // useEffect(() => {
  //   daiToken.contract.loadBalance(tokens[1].address).then(reload).catch(Error)
  // }, [tokens[2]])

  // useEffect(() => {
  //   uniPools.forEach(pool => {
  //     pool.contract.loadCommon().then(reload).catch(Error)
  //   })
  // }, [uniPools])

  // useEffect(() => {
  //   Bonds.forEach(bond => {
  //     bond.bondToken.contract.loadCommon().then(reload).catch(Error)
  //   }, [Bonds])
  // })

  const value = {
    // colTokens,
    // uniPools,
    // Bonds,
  }

  return (
    <Context.Provider value={value}>
      { children }
    </Context.Provider>
  )
}

export default BondMarketProvider