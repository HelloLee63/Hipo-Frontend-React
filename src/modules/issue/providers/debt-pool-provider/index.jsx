import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useConfig } from "../../../../components/providers/configProvider";
import { usePools } from "../../../../components/providers/poolsProvider";
import { useReload } from "../../../../hooks/useReload";
import { InvariantContext } from "../../../../utils/context";
import { useWallet } from "../../../../wallets/walletProvider";

const Context = createContext(InvariantContext('DebtPoolProvider'))

export function useDebtPool() {
  return useContext(Context) 
}

const DebtPoolProvider = props => {
  
  const { children } = props
  const [ poolSymbol, setPoolSymbol ] = useState('USDC/WETH')
  const [ debtAssetToken, setDebtAssetToken ] = useState('WETH')
  const [debtDuration, setDebtDuration ] = useState('300')
  const [issueAmount, setIssueAmount] = useState(0)

  const [debtId, setDebtId] = useState()

  const walletCtx = useWallet()
  const [reload] = useReload()
  const config = useConfig()

  const { getCollateralPoolBySymbol, getPoolByBond } = usePools()
  
  const collateral = useMemo(() => getCollateralPoolBySymbol(poolSymbol),[poolSymbol])

  const bondPool = useMemo(() => getPoolByBond(debtAssetToken, debtDuration), [debtDuration, debtAssetToken])

  useEffect(() => {
    if(walletCtx.account) {
      bondPool.bondAsset.contract.loadAllowance(config.contracts.financingPool?.financingPool).then(reload).catch(Error)
    }
  }, [bondPool, walletCtx.account])

  const value = {
    bondPool,
    collateral,

    debtAssetToken,
    debtDuration,
    poolSymbol,
    
    setPoolSymbol,
    setDebtAssetToken,
    setDebtDuration, 

    issueAmount, 
    setIssueAmount,

    debtId, 
    setDebtId,
  }

  return (
    <Context.Provider value={value} >
      { children }
    </Context.Provider>
  )
}

export default DebtPoolProvider