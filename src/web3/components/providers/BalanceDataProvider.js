import { createContext, useContext, useMemo } from "react";
import { usePools } from "../../../components/providers/poolsProvider";
import { InvariantContext } from "../../../utils/context";
import { useWallet } from "../../../wallets/walletProvider";

const Context = createContext(InvariantContext('BalanceDataProvider'))

export function useBalanceData() {
    return useContext(Context)
}

const BalanceDataProvider = ({ children }) => {

  const { assets, collateralPools } = usePools()
  const walletCtx = useWallet()

  const balanceOfWETHToken = assets[0].contract.balances?.get(walletCtx.account)
  const balanceOfUSDCToken = assets[1].contract.balances?.get(walletCtx.account)
  const balanceOfUSDTToken = assets[2].contract.balances?.get(walletCtx.account)
  const balanceOfDAIToken = assets[3].contract.balances?.get(walletCtx.account)
  const balanceOfUSDCWETHToken = collateralPools[0].collateralAsset.contract.balances?.get(walletCtx.account)
  const balanceOfWETHUSDTToken = collateralPools[1].collateralAsset.contract.balances?.get(walletCtx.account)
  const balanceOfDAIWETHToken = collateralPools[2].collateralAsset.contract.balances?.get(walletCtx.account)

  const balanceDatas = useMemo(() => [
    {
      token: assets[0],
      tokenBalance: balanceOfWETHToken
    },
    {
      token: assets[1],
      tokenBalance: balanceOfUSDCToken
    },
    {
      token: assets[2],
      tokenBalance: balanceOfUSDTToken
    },
    {
      token: assets[3],
      tokenBalance: balanceOfDAIToken
    },
    {
      token: collateralPools[0].collateralAsset,
      tokenBalance: balanceOfUSDCWETHToken
    },
    {
      token: collateralPools[1].collateralAsset,
      tokenBalance: balanceOfWETHUSDTToken
    },
    {
      token: collateralPools[2].collateralAsset,
      tokenBalance: balanceOfDAIWETHToken
    },
  ], [walletCtx.account, 
    balanceOfWETHToken, 
    balanceOfUSDCToken, 
    balanceOfUSDTToken, 
    balanceOfDAIToken,
    balanceOfUSDCWETHToken,
    balanceOfWETHUSDTToken,
    balanceOfDAIWETHToken
  ])

  const value = {
    balanceDatas,
  }
  
  return (
    <Context.Provider value={value}>
      { children }
    </Context.Provider>
  )
}

export default BalanceDataProvider