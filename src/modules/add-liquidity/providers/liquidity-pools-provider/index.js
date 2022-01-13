import { createContext, useCallback, useContext, useMemo, useState } from "react"
import { useConfig } from "../../../../components/providers/configProvider"
import { useKnownTokens } from "../../../../components/providers/knownTokensProvider"
import { InvariantContext } from "../../../../utils/context"
import { useContract } from "../../../../web3/components/contractManagerProvider"
import AddLiquidityContract from "../../contracts/addLiquidityContract"

export const liquidityPoolID = {
  bWETH5: 'bWETH5',
  bWETH10: 'bWETH10',
  bWETH15: 'bWETH15',
  bWETH30: 'bWETH30',
  bWETH45: 'bWETH45',
  bWETH60: 'bWETH60',
}

const Context = createContext(InvariantContext('LiquidityPoolsProvider'))

export function useLiquidityPools() {
  return useContext(Context)
}

function useAddLiquidityContract(address) {
  return useContract((address), () => {
    return new AddLiquidityContract(address)
  })
}

//TO-DO: pools array

const LiquidityPoolsProvider = props => {

  const { children } = props
  const {wethToken, usdcToken, daiToken, usdtToken} = useKnownTokens()
  const config = useConfig()

  const Pools = [
    {
      symbol: 'WETH',
      duration: 300,
      address: '',
      icon: '/media/tokens/WETH.svg'
    },
    {
      symbol: 'USDC',
      duration: 300,
      address: '',
      icon: '/media/tokens/USDC.svg'
    },
    {
      symbol: 'DAI',
      duration: 300,
      address: '',
      icon: '/media/tokens/DAI.svg'
    },
    {
      symbol: 'USDT',
      duration: 300,
      address: '',
      icon: '/media/tokens/USDT.svg'
    }
  ]
  
  const Assets = [
    'WETH', 'USDC', 'DAI', 'USDT'
  ]
  
  const Durations = [
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

  const addLiquidityContract = useAddLiquidityContract(config.contracts.financingPool?.financingPool)

  const liquidityPools = useMemo(() => [
    {
      name: liquidityPoolID.bWETH5,
      lable: '5 Days WETH Bond',
      asset: [wethToken],
      token: [wethToken],
      assetAddress: '0x232bB0bBf8274342fB044FF40e716bf887fb9214',
      bondDuration: 300,
      contract: addLiquidityContract
    },
  ], [],)

  const pools = useMemo(() => { return Pools})
  const durations = useMemo(() => { return Durations})
  const assets = useMemo(() => { return Assets})

  const [activeAsset, setActiveAsset] = useState(Assets[0])
  const [activeDuration, setActiveDuration] = useState(Durations[0])
  const [activePool, setActivePool] = useState()

  // function handlePoolSelect(bondPoolAddress, duration) {
  //   const poolAddress = getBondPool(bondPoolAddress, duration)
  //   setActivePool(poolAddress)  
  // }

  const getLiquidityPool = useCallback(
    (assetAddress, bondDuration) => {
      return liquidityPools.find(liquidityPool => liquidityPool.assetAddress === assetAddress && liquidityPool.bondDuration === bondDuration)
    },
    [liquidityPools]
  )

  const value = {
    liquidityPools,
    addLiquidityContract,
    getLiquidityPool,
    activePool,
    pools,
    durations,
    assets
  }

  return (
    <Context.Provider value={value}>{ children }</Context.Provider>
  )
}

export default LiquidityPoolsProvider