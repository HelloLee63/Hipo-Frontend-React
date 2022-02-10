import BigNumber from "bignumber.js";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useConfig } from "../../../../components/providers/configProvider";
import { useReload } from "../../../../hooks/useReload";
import { InvariantContext } from "../../../../utils/context";
import { useWallet } from "../../../../wallets/walletProvider";
import { useProtocolData } from "../../../../web3/components/providers/ProtocolDataProvider";
import { useDebtPools } from "../debt-pools-provider";

const Context = createContext(InvariantContext('DebtPoolProvider'))

export function useDebtPool() {
  return useContext(Context) 
}

const DebtPoolProvider = props => {
  const { children } = props
  const [ poolSymbol, setPoolSymbol ] = useState('USDC/WETH')
  const [ debtAssetToken, setDebtAssetToken ] = useState('WETH')
  const [debtDuration, setDebtDuration ] = useState('300')
  const debtPoolsCtx = useDebtPools()
  const walletCtx = useWallet()
  const [reload] = useReload()
  const config = useConfig()
  const protocolData = useProtocolData()

  const debtPool = useMemo(() => debtPoolsCtx.getDebtAssetByLable(debtDuration, debtAssetToken), [debtDuration, debtAssetToken])
  const collateral = useMemo(() => debtPoolsCtx.getCollateralAssetBySymbol(poolSymbol),[poolSymbol])

  const getBondPrice = useCallback(
    (debtAssetAddress, duration, factory) => {    
      return protocolData.protocolDataContract.loadBondPrice(debtAssetAddress, duration, factory)    
  }, [debtPool])

  useEffect(() => {
    if (walletCtx.account) {
      debtPool.debtAsset.contract.loadBalance().then(reload).catch(Error)
    }
  }, [debtPool, walletCtx.account])

  useEffect(() => {
    if(walletCtx.account) {
      debtPool.debtAsset.contract.loadAllowance(config.contracts.financingPool?.financingPool).then(reload).catch(Error)
    }
  }, [debtPool, walletCtx.account])

  useEffect(() => {
    debtPool.debtAsset.contract.loadCommon().then(reload).catch(Error)
  }, [debtPool])

  const value = {
    debtPool,
    debtAssetToken,
    debtDuration,
    poolSymbol,
    collateral,
    setPoolSymbol,
    setDebtAssetToken,
    setDebtDuration,
    getBondPrice
  }

  return (
    <Context.Provider value={value} >
      { children }
    </Context.Provider>
  )
}

export default DebtPoolProvider