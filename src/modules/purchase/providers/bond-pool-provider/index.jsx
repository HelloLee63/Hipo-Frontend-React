import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useConfig } from "../../../../components/providers/configProvider";
import { usePools } from "../../../../components/providers/poolsProvider";
import { useReload } from "../../../../hooks/useReload";
import { InvariantContext } from "../../../../utils/context";
import { useWallet } from "../../../../wallets/walletProvider";

const Context = createContext(InvariantContext('BondPoolProvider'))

export function useBondPool() {
  return useContext(Context)
}

const BondPoolProvider = props => {

  const { children } = props
  const wallet = useWallet()
  const [reload] = useReload()
  const config = useConfig()

  const { getPoolByBond, bondPools } = usePools()

  const [bondAssetSymbol, setSymbol] = useState(bondPools[0].bondAsset.symbol)
  const [duration, setDuration] = useState(bondPools[0].duration.duration)
  const [purchaseAmount, setPurchaseAmount] = useState(0)
  const [bondId, setBondId] = useState(0)
  const [withdrawAmount, setWithdrawAmount] = useState(0)
  const [maturedTimeTs, setMaturedTimeTs] = useState(0)

  const pool = useMemo(() => {
    return getPoolByBond(bondAssetSymbol, duration)
  }, [bondAssetSymbol, duration])

  useEffect(() => {
    if(wallet.account) {
      pool.bondAsset.contract.loadAllowance(config.contracts.financingPool.financingPool).then(reload).catch(Error)
    }
  }, [pool, wallet.account])

  useEffect(() => {
    if(wallet.account) {
      pool.bToken.contract.loadBondData(wallet.account, Number(bondId))
    }
  }, [wallet.account, bondId, pool])
  
  const value = {
    pool,
    bondAssetSymbol,
    setSymbol,
    setBondId,
    duration,
    setDuration,
    purchaseAmount, 
    setPurchaseAmount,  
    withdrawAmount, 
    setWithdrawAmount,
    maturedTimeTs, 
    setMaturedTimeTs,
    bondId
  }

  return (
    <Context.Provider value={value}>
      { children }
    </Context.Provider>
  ) 
}

export default BondPoolProvider