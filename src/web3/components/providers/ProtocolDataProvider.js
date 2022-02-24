import { createContext, useCallback, useContext, useEffect, useMemo } from "react";
import { useConfig } from "../../../components/providers/configProvider";
import { useKnownTokens } from "../../../components/providers/knownTokensProvider";
import { useReload } from "../../../hooks/useReload";
import { Durations } from "../../../modules/issue/providers/debt-pools-provider";

import { useWallet } from "../../../wallets/walletProvider";
import ProtocolDataContract from "../../contracts/ProtocolDataProviderContract";
import { calAPY, formatPercent, formatToken } from "../../utils";
import { useContract } from "../contractManagerProvider";


function useProtocolDataContract (address) {
  return useContract(address, () => {
    return new ProtocolDataContract(address)
  })
}

const Context = createContext('ProtocolDataProvider')

export function useProtocolData() {
  return useContext(Context)
}

const ProtocolDataProvider = ({ children }) => {
  const config = useConfig()

  const protocolDataContract = useProtocolDataContract(config.contracts.dataProvider.protocolDataProvider)
  const walletCtx = useWallet()
  const [reload] = useReload()

  console.log('Protocol Data Provider is rendered');

  const { 
    wethToken, 
    usdcToken, 
    usdtToken, 
    daiToken,
    cuUSDCWETH,
    cuWETHUSDT,
    cuDAIWETH,
    usdcwethLpToken, 
    wethusdtLpToken, 
    daiwethLpToken
  } = useKnownTokens()

  const colTokens = [usdcwethLpToken, wethusdtLpToken, daiwethLpToken]

  const Bonds = useMemo(() => [
    {
      asset: wethToken,
      duration: Durations.FiveDays,
      icon: '/media/tokens/ICON/WETH/5.svg',
      id: 1,
    },
    {
      asset: wethToken,
      duration: Durations.FiveDays,
      icon: '/media/tokens/ICON/WETH/10.svg',
      id: 2,
    },
    {
      asset: wethToken,
      duration: Durations.FiveDays,
      icon: '/media/tokens/ICON/WETH/15.svg',
      id: 3,
    },
    {
      asset: wethToken,
      duration: Durations.FiveDays,
      icon: '/media/tokens/ICON/WETH/30.svg',
      id: 4,
    },
    {
      asset: wethToken,
      duration: Durations.FiveDays,
      icon: '/media/tokens/ICON/WETH/45.svg',
      id: 5,
    },
    {
      asset: wethToken,
      duration: Durations.FiveDays,
      icon: '/media/tokens/ICON/WETH/60.svg',
      id: 6,
    },
    {
      asset: wethToken,
      duration: Durations.FiveDays,
      icon: '/media/tokens/ICON/USDC/5.svg',
      id: 7,
    },
    {
      asset: wethToken,
      duration: Durations.FiveDays,
      icon: '/media/tokens/ICON/USDC/10.svg',
      id: 8,
    },
    {
      asset: wethToken,
      duration: Durations.FiveDays,
      icon: '/media/tokens/ICON/USDC/15.svg',
      id: 9,
    },
    {
      asset: wethToken,
      duration: Durations.FiveDays,
      icon: '/media/tokens/ICON/USDC/30.svg',
      id: 10,
      // token: dUSDC30,
      // contract: dUSDC30.Contract
    },
    {
      asset: wethToken,
      duration: Durations.FiveDays,
      icon: '/media/tokens/ICON/USDC/45.svg',
      id: 11,
      // token: dUSDC45,
      // contract: dUSDC45.Contract
    },
    {
      asset: wethToken,
      duration: Durations.FiveDays,
      icon: '/media/tokens/ICON/USDC/60.svg',
      id: 12,
      // token: dUSDC60,
      // contract: dUSDC60.Contract
    },
    {
      asset: wethToken,
      duration: Durations.FiveDays,
      icon: '/media/tokens/ICON/USDT/5.svg',
      id: 13,
      // token: dUSDT5,
      // contract: dUSDT5.Contract
    },
    {
      asset: wethToken,
      duration: Durations.FiveDays,
      icon: '/media/tokens/ICON/USDT/10.svg',
      id: 14,
      // token: dUSDT10,
      // contract: dUSDT10.Contract
    },
    {
      asset: wethToken,
      duration: Durations.FiveDays,
      icon: '/media/tokens/ICON/USDT/15.svg',
      id: 15,
      // token: dUSDT15,
      // contract: dUSDT15.Contract
    },
    {
      asset: wethToken,
      duration: Durations.FiveDays,
      icon: '/media/tokens/ICON/USDT/30.svg',
      id: 16,
      // token: dUSDT30,
      // contract: dUSDT30.Contract
    },
    {
      asset: wethToken,
      duration: Durations.FiveDays,
      icon: '/media/tokens/ICON/USDT/45.svg',
      id: 17,
      // token: dUSDT45,
      // contract: dUSDT45.Contract
    },
    {
      asset: wethToken,
      duration: Durations.FiveDays,
      icon: '/media/tokens/ICON/USDT/60.svg',
      id: 18,
      // token: dUSDT60,
      // contract: dUSDT60.Contract
    },
    {
      asset: wethToken,
      duration: Durations.FiveDays,
      icon: '/media/tokens/ICON/DAI/5.svg',
      id: 19,
      // token: dDAI5,
      // contract: dDAI5.Contract
    },
    {
      asset: wethToken,
      duration: Durations.FiveDays,
      icon: '/media/tokens/ICON/DAI/10.svg',
      id: 20,
      // token: dDAI10,
      // contract: dDAI10.Contract
    },
    {
      asset: wethToken,
      duration: Durations.FiveDays,
      icon: '/media/tokens/ICON/DAI/15.svg',
      id: 21,
      // token: dDAI15,
      // contract: dDAI15.Contract
    },
    {
      asset: wethToken,
      duration: Durations.FiveDays,
      icon: '/media/tokens/ICON/DAI/30.svg',
      id: 22,
      // token: dDAI30,
      // contract: dDAI30.Contract
    },
    {
      asset: wethToken,
      duration: Durations.FiveDays,
      icon: '/media/tokens/ICON/DAI/45.svg',
      id: 23,
      // token: dDAI45,
      // contract: dDAI45.Contract
    },
    {
      asset: wethToken,
      duration: Durations.FiveDays,
      icon: '/media/tokens/ICON/DAI/60.svg',
      id: 24,
      // token: dDAI60,
      // contract: dDAI60.Contract
    },
  ], [])

  useEffect(() => {
    Bonds.forEach(bond => {
      const bondDuration = Number(bond.duration)
      protocolDataContract?.loadBondPrice(bond.asset.address, bondDuration, config.contracts.hipoV1AMMfactory).then(reload).catch(Error)
    })
  }, [Bonds, protocolDataContract])

  useEffect(() => {
    colTokens.forEach(token => {
      protocolDataContract.loadCollateralConfigurationData(token.address) 
    })
  }, [colTokens])

  const getBondPrice = useCallback((
    (bondAsset, duration) => {
      const priceData = protocolDataContract.bondPriceArray?.find((obj) => 
        obj.assetAddress === bondAsset && obj.duration === duration
      )

      // const price = formatToken(priceData?.price, { scale: 18, tokenName: symbol })
      // const apy = formatPercent(calAPY(priceData?.price, 18, Number(duration)))
      
      return priceData?.price
    }), [protocolDataContract.bondPriceArray])

  // const colPools = useMemo(
  //   () => [
  //     {
  //       name: ColTokens.cuUSDCWETH,
  //       lable: 'USDC/WETH',
  //       desc: 'Uniswap V2',
  //       tokens: [usdcwethLpToken],
  //       contract: cuUSDCWETH.contract
  //     },
  //     {
  //       name: ColTokens.cuWETHUSDT,        
  //       lable: 'WETH/USDT',
  //       desc: 'Uniswap V2',
  //       tokens: [wethusdtLpToken],
  //       contract: cuWETHUSDT.contract
  //     },
  //     {
  //       name: ColTokens.cuDAIWETH,
  //       lable: 'DAI/WETH',
  //       desc: 'Uniswap V2',
  //       tokens: [daiwethLpToken],
  //       contract: cuDAIWETH.contract
  //     },
  //   ]
  // )

  // useEffect(() => {
  //   if (walletCtx.account) {
  //     colPools.forEach(colPool => {
  //       (colPool.tokens[0].contract).loadAllowance(config.contracts.financingPool.financingPool).then(reload).catch(Error)
  //     })
  //   }
  // }, [colPools, walletCtx.account])

  const value = {
    // Bonds,
    // colPools,
    protocolDataContract,
    getBondPrice
  }

  return (
    <Context.Provider value={ value }>{children}</Context.Provider>
  )
}

export default ProtocolDataProvider