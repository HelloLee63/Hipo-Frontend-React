import BigNumber from "bignumber.js";
import { createContext, useCallback, useContext } from "react";
import Web3 from "web3";
import { useConfig } from "../../../components/providers/configProvider";
import { RPC_HTTPS_URL } from "../../../networks/rinkeby-testnet";
import { InvariantContext } from "../../../utils/context";
import { FinancingPoolABI } from "../../../web3/contracts/FinancingPoolContract";
import { formatToken } from "../../../web3/utils";

const Context = createContext(InvariantContext('BondMarketProvider'))

export function useBondMarket() {
  return useContext(Context)
}

const BondMarketProvider = ({ children }) => {

  const config = useConfig()
  
  const address = config.contracts.financingPool.financingPool
  const abi = FinancingPoolABI
  const web3 = new Web3(RPC_HTTPS_URL)
  const contract = new web3.eth.Contract(abi,address)

  const getMarketSize = useCallback((pool) => {
    const lpTotalValue = new BigNumber(pool.lpToken.contract.totalSupply)
    const bTotalValue = new BigNumber(pool.bToken.contract.totalSupply)
    const totalValue = BigNumber.sum(lpTotalValue, bTotalValue)
    return formatToken(totalValue.multipliedBy(pool.price), {scale: pool.bToken.decimals})
  })

  const value = {
    getMarketSize,
    contract,
  }

  return (
    <Context.Provider value={value}>
      { children }
    </Context.Provider>
  )
}

export default BondMarketProvider