import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useConfig } from "../../../../components/providers/configProvider";
import { usePools } from "../../../../components/providers/poolsProvider";
import { useReload } from "../../../../hooks/useReload";
import { InvariantContext } from "../../../../utils/context";
import { useWallet } from "../../../../wallets/walletProvider";
import { useWalletData } from "../../../../web3/components/providers/WalletDataProvider";

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

  const { bondPools } = usePools()

  const walletCtx = useWallet()
  const [reload] = useReload()
  const config = useConfig()

  const { getCollateralPoolBySymbol, getPoolByBond } = usePools()
  // const { getDebtsList } = useWalletData()

  const collateral = useMemo(() => getCollateralPoolBySymbol(poolSymbol),[poolSymbol])

  const bondPool = useMemo(() => getPoolByBond(debtAssetToken, debtDuration), [debtDuration, debtAssetToken])

  useEffect(() => {
    if(walletCtx.account) {
      bondPool.bondAsset.contract.loadAllowance(config.contracts.financingPool?.financingPool).then(reload).catch(Error)
    }
  }, [bondPool, walletCtx.account])

  useEffect(() => {
    if (walletCtx.account) {
      bondPools.forEach(pool => {
        pool.dToken.contract.loadDebtData(walletCtx.account).then(reload).catch(Error)
        }      
      )
    }    
  }, [bondPools, walletCtx.account])

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
    setIssueAmount
  }

  return (
    <Context.Provider value={value} >
      { children }
    </Context.Provider>
  )
}

export default DebtPoolProvider