import { createContext, useCallback, useContext, useEffect, useMemo } from "react";
import { useConfig } from "../../../../components/providers/configProvider";
import { useKnownTokens } from "../../../../components/providers/knownTokensProvider";
import { InvariantContext } from "../../../../utils/context";
import { useWallet } from "../../../../wallets/walletProvider";
import { useErc20Contract } from "../../../../web3/components/contractManagerProvider";
import { usePledge } from "../PledgeProvider";


const Context = createContext(InvariantContext('ColPoolsProvider'))


export function useColPools() {
    return useContext(Context)
}

const ColPoolsProvider = props => {

  const { children } = props
  const config = useConfig()
  const walletCtx = useWallet()
  // const pledgeContract = usePledge()

  const { wethusdcLpToken, wethdaiLpToken, usdtwethLpToken} = useKnownTokens()

  const colWETHUSDCContract = useErc20Contract(config.contracts.col?.wethusdcLpToken)
  console.log(config.contracts);
  console.log(config.contracts.col);
  console.log(colWETHUSDCContract);
  const colWETHDAIContract = useErc20Contract(config.contracts.col?.wethdaiLpToken)
  const colUSDTWETHContract = useErc20Contract(config.contracts.col?.usdtwethLpToken)

  const colPools = useMemo(
    () => [
      {
        name: 'WETHUSDC',
        lable: 'WETH/USDC',
        tokens: [wethusdcLpToken],
        contract: colWETHUSDCContract
      },
      {
        name: 'WETHUSDC',
        lable: 'WETH/USDC',
        tokens: [wethdaiLpToken],
        contract: colWETHDAIContract
      },
      {
        name: 'WETHUSDC',
        lable: 'WETH/USDC',
        tokens: [usdtwethLpToken],
        contract: colUSDTWETHContract
      },
    ]
  )

  useEffect(() => {
    colPools.forEach(colPool => {

    })
  }, [colPools])

  const getColKonwnPoolByToken = useCallback(
    (token) => {
      return colPools.find(pool => pool.tokens[0] === token)
    },
    [colPools]
  )

  const value = {
    colPools,
    getColKonwnPoolByToken,
    
  }

  return (
    <Context.Provider value={value}>
      {props.children}
    </Context.Provider>
  )
}

export default ColPoolsProvider