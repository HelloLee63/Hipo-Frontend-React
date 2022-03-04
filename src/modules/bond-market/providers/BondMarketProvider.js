import BigNumber from "bignumber.js";
import { createContext, useCallback, useContext } from "react";
import { InvariantContext } from "../../../utils/context";
import { formatToken } from "../../../web3/utils";

const Context = createContext(InvariantContext('BondMarketProvider'))

export function useBondMarket() {
  return useContext(Context)
}

const BondMarketProvider = ({ children }) => {  

  const getMarketSize = useCallback((pool) => {
    const lpTotalValue = new BigNumber(pool.lpToken.contract.totalSupply)
    const bTotalValue = new BigNumber(pool.bToken.contract.totalSupply)
    const totalValue = BigNumber.sum(lpTotalValue, bTotalValue)
    return formatToken(totalValue, {scale: pool.bToken.decimals, tokenName: pool.bondAsset.symbol})
  })

  const value = {
    getMarketSize,
  }

  return (
    <Context.Provider value={value}>
      { children }
    </Context.Provider>
  )
}

export default BondMarketProvider