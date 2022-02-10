import { createContext, useCallback, useContext, useEffect, useMemo } from "react";
import { useConfig } from "../../../../components/providers/configProvider";
import { useKnownTokens } from "../../../../components/providers/knownTokensProvider";
import { InvariantContext } from "../../../../utils/context";
import { useErc20Contract } from "../../../../web3/components/contractManagerProvider";
import { useProtocolData } from "../../../../web3/components/providers/ProtocolDataProvider";

export const Collaterals = {
  cuUSDCWETH: 'cuUSDCWETH',
  cuWETHUSDT: 'cuWETHUSDT',
  cuDAIWETH: 'cuDAIWETH',
}

const Context = createContext(InvariantContext('ColPoolsProvider'))

export function useColPools() {
    return useContext(Context)
}

const ColPoolsProvider = props => {
  
  const { children } = props  
  const { 
    usdcwethLpToken, 
    wethusdtLpToken, 
    daiwethLpToken,
    cuUSDCWETH,
    cuWETHUSDT,
    cuDAIWETH

  
  } = useKnownTokens()
  const config = useConfig()
  const protocolData = useProtocolData()
  // const cuUSDCWETHContract = useErc20Contract(config.contracts.col?.cuUSDCWETH)
  // const cuWETHUSDTContract = useErc20Contract(config.contracts.col?.cuWETHUSDT)
  // const cuDAIWETHContract = useErc20Contract(config.contracts.col?.cuDAIWETH)
  

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

  const getColPoolByToken = useCallback(
    (lable) => {
      return protocolData.colPools.find(colPool => colPool.lable === lable)
    },
    [protocolData.colPools]
  )

  const value = {
    colPools,
    getColPoolByToken,
  }

  return (
    <Context.Provider value={value}>
      { children }
    </Context.Provider>
  )
}

export default ColPoolsProvider