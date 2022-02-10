import { createContext, useContext, useEffect, useMemo } from "react";
import { useConfig } from "../../../components/providers/configProvider";
import { useKnownTokens } from "../../../components/providers/knownTokensProvider";
import { useReload } from "../../../hooks/useReload";
import { Durations } from "../../../modules/issue/providers/debt-pools-provider";
import { Collaterals } from "../../../modules/pledge/providers/colPools-provider";
import { useWallet } from "../../../wallets/walletProvider";
import ProtocolDataContract from "../../contracts/ProtocolDataProviderContract";
import { useContract, useErc20Contract } from "../contractManagerProvider";

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
  // const cuUSDCWETHContract = useErc20Contract(config.contracts.col?.cuUSDCWETH)
  // const cuWETHUSDTContract = useErc20Contract(config.contracts.col?.cuWETHUSDT)
  // const cuDAIWETHContract = useErc20Contract(config.contracts.col?.cuDAIWETH)
  const { usdcwethLpToken, wethusdtLpToken, daiwethLpToken } = useKnownTokens()
  const protocolDataContract = useProtocolDataContract(config.contracts.dataProvider.protocolDataProvider)
  const walletCtx = useWallet()
  const [reload] = useReload()

  const { 
    wethToken, 
    usdcToken, 
    usdtToken, 
    daiToken,
    cuUSDCWETH,
    cuWETHUSDT,
    cuDAIWETH 
  } = useKnownTokens()

  const Bonds = useMemo(() => [
    {
      asset: wethToken,
      duration: Durations.FiveDays,
      icon: '/media/tokens/ICON/WETH/5.svg',
      id: 1,
    },
    // {
    //   asset: wethToken,
    //   duration: Durations.TenDays,
    //   icon: '/media/tokens/ICON/WETH/10.svg',
    //   id: 2,
    // },
    // {
    //   asset: wethToken,
    //   duration: Durations.FifteenDays,
    //   icon: '/media/tokens/ICON/WETH/15.svg',
    //   id: 3,
    // },
    // {
    //   asset: wethToken,
    //   duration: Durations.ThirtyDays,
    //   icon: '/media/tokens/ICON/WETH/30.svg',
    //   id: 4,
    // },
    // {
    //   asset: wethToken,
    //   duration: Durations.FortyFiveDays,
    //   icon: '/media/tokens/ICON/WETH/45.svg',
    //   id: 5,
    // },
    // {
    //   asset: wethToken,
    //   duration: Durations.SixtyDays,
    //   icon: '/media/tokens/ICON/WETH/60.svg',
    //   id: 6,
    // },
    // {
    //   asset: usdcToken,
    //   duration: Durations.FiveDays,
    //   icon: '/media/tokens/ICON/USDC/5.svg',
    //   id: 7,
    // },
    // {
    //   asset: usdcToken,
    //   duration: Durations.TenDays,
    //   icon: '/media/tokens/ICON/USDC/10.svg',
    //   id: 8,
    // },
    // {
    //   asset: usdcToken,
    //   duration: Durations.FifteenDays,
    //   icon: '/media/tokens/ICON/USDC/15.svg',
    //   id: 9,
    // },
    // {
    //   asset: usdcToken,
    //   duration: Durations.ThirtyDays,
    //   icon: '/media/tokens/ICON/USDC/30.svg',
    //   id: 10,
    //   // token: dUSDC30,
    //   // contract: dUSDC30.Contract
    // },
    // {
    //   asset: usdcToken,
    //   duration: Durations.FortyFiveDays,
    //   icon: '/media/tokens/ICON/USDC/45.svg',
    //   id: 11,
    //   // token: dUSDC45,
    //   // contract: dUSDC45.Contract
    // },
    // {
    //   asset: usdcToken,
    //   duration: Durations.SixtyDays,
    //   icon: '/media/tokens/ICON/USDC/60.svg',
    //   id: 12,
    //   // token: dUSDC60,
    //   // contract: dUSDC60.Contract
    // },
    // {
    //   asset: usdtToken,
    //   duration: Durations.FiveDays,
    //   icon: '/media/tokens/ICON/USDT/5.svg',
    //   id: 13,
    //   // token: dUSDT5,
    //   // contract: dUSDT5.Contract
    // },
    // {
    //   asset: usdtToken,
    //   duration: Durations.TenDays,
    //   icon: '/media/tokens/ICON/USDT/10.svg',
    //   id: 14,
    //   // token: dUSDT10,
    //   // contract: dUSDT10.Contract
    // },
    // {
    //   asset: usdtToken,
    //   duration: Durations.FifteenDays,
    //   icon: '/media/tokens/ICON/USDT/15.svg',
    //   id: 15,
    //   // token: dUSDT15,
    //   // contract: dUSDT15.Contract
    // },
    // {
    //   asset: usdtToken,
    //   duration: Durations.ThirtyDays,
    //   icon: '/media/tokens/ICON/USDT/30.svg',
    //   id: 16,
    //   // token: dUSDT30,
    //   // contract: dUSDT30.Contract
    // },
    // {
    //   asset: usdtToken,
    //   duration: Durations.FortyFiveDays,
    //   icon: '/media/tokens/ICON/USDT/45.svg',
    //   id: 17,
    //   // token: dUSDT45,
    //   // contract: dUSDT45.Contract
    // },
    // {
    //   asset: usdtToken,
    //   duration: Durations.SixtyDays,
    //   icon: '/media/tokens/ICON/USDT/60.svg',
    //   id: 18,
    //   // token: dUSDT60,
    //   // contract: dUSDT60.Contract
    // },
    // {
    //   asset: daiToken,
    //   duration: Durations.FiveDays,
    //   icon: '/media/tokens/ICON/DAI/5.svg',
    //   id: 19,
    //   // token: dDAI5,
    //   // contract: dDAI5.Contract
    // },
    // {
    //   asset: daiToken,
    //   duration: Durations.TenDays,
    //   icon: '/media/tokens/ICON/DAI/10.svg',
    //   id: 20,
    //   // token: dDAI10,
    //   // contract: dDAI10.Contract
    // },
    // {
    //   asset: daiToken,
    //   duration: Durations.FifteenDays,
    //   icon: '/media/tokens/ICON/DAI/15.svg',
    //   id: 21,
    //   // token: dDAI15,
    //   // contract: dDAI15.Contract
    // },
    // {
    //   asset: daiToken,
    //   duration: Durations.ThirtyDays,
    //   icon: '/media/tokens/ICON/DAI/30.svg',
    //   id: 22,
    //   // token: dDAI30,
    //   // contract: dDAI30.Contract
    // },
    // {
    //   asset: daiToken,
    //   duration: Durations.FortyFiveDays,
    //   icon: '/media/tokens/ICON/DAI/45.svg',
    //   id: 23,
    //   // token: dDAI45,
    //   // contract: dDAI45.Contract
    // },
    // {
    //   asset: daiToken,
    //   duration: Durations.SixtyDays,
    //   icon: '/media/tokens/ICON/DAI/60.svg',
    //   id: 24,
    //   // token: dDAI60,
    //   // contract: dDAI60.Contract
    // },
  ])

  const colPools = useMemo(
    () => [
      {
        name: Collaterals.cuUSDCWETH,
        lable: 'USDC/WETH',
        desc: 'Uniswap V2',
        tokens: [usdcwethLpToken],
        contract: cuUSDCWETH.contract
      },
      {
        name: Collaterals.cuWETHUSDT,        
        lable: 'WETH/USDT',
        desc: 'Uniswap V2',
        tokens: [wethusdtLpToken],
        contract: cuWETHUSDT.contract
      },
      {
        name: Collaterals.cuDAIWETH,
        lable: 'DAI/WETH',
        desc: 'Uniswap V2',
        tokens: [daiwethLpToken],
        contract: cuDAIWETH.contract
      },
    ]
  )

  useEffect(() => {
    colPools.forEach(colPool => {
      protocolDataContract.loadCollateralConfigurationData(colPool?.tokens[0].address)  
    })
  }, [colPools])

  useEffect(() => {
    if (walletCtx.account) {
    colPools.forEach(colPool => {
      (colPool.tokens[0].contract).loadBalance().then(reload).catch(Error)
    })
  }
  }, [colPools, walletCtx.account])

  useEffect(() => {
    if (walletCtx.account) {
      colPools.forEach(colPool => {
        (colPool.tokens[0].contract).loadAllowance(config.contracts.financingPool.financingPool).then(reload).catch(Error)
      })
    }
  }, [colPools, walletCtx.account])

  useEffect(() => {
    Bonds.forEach(bond => {
      const bondDuration = Number(bond.duration)
      protocolDataContract?.loadBondPrice(bond.asset.address, bondDuration, config.contracts.hipoV1AMMfactory).catch(Error)
    })
  }, [Bonds, protocolDataContract])

  const value = {
    Bonds,
    colPools,
    protocolDataContract
  }

  return (
    <Context.Provider value={ value }>{children}</Context.Provider>
  )
}

export default ProtocolDataProvider