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
  const [ debtPoolSymbol, setDebtPoolSymbol ] = useState('USDC/WETH')
  const [ debtAssetToken, setDebtAssetToken ] = useState('WETH')
  const [debtDuration, setDebtDuration ] = useState('432000')
  const [issueAmount, setIssueAmount] = useState(0)

  const [repayAmount, setRepayAmount] = useState(0)

  const [debtId, setDebtId] = useState(0)

  const walletCtx = useWallet()
  const [reload] = useReload()
  const config = useConfig()

  const { getCollateralPoolBySymbol, getPoolByBond } = usePools()
  
  const collateral = useMemo(() => getCollateralPoolBySymbol(debtPoolSymbol),[debtPoolSymbol])

  const bondPool = useMemo(() => getPoolByBond(debtAssetToken, debtDuration), [debtDuration, debtAssetToken])

  useEffect(() => {
    if(walletCtx.account) {
      bondPool.bondAsset.contract.loadAllowance(config.contracts.financingPool?.financingPool).then(reload).catch(Error)
    }
  }, [bondPool, walletCtx.account])

  useEffect(() => {
    if(walletCtx.account) {
      bondPool.dToken.contract.loadIssuerDebtData(walletCtx.account, Number(debtId))
    }
  }, [walletCtx.account, debtId, bondPool])

  const value = {
    bondPool,
    collateral,

    debtAssetToken,
    debtDuration,
    debtPoolSymbol,
    
    setDebtPoolSymbol,
    setDebtAssetToken,
    setDebtDuration, 

    issueAmount, 
    setIssueAmount,

    debtId, 
    setDebtId,

    repayAmount, 
    setRepayAmount
  }

  return (
    <Context.Provider value={value} >
      { children }
    </Context.Provider>
  )
}

export default DebtPoolProvider