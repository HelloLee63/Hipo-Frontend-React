import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useConfig } from "../../../../components/providers/configProvider";
import { useReload } from "../../../../hooks/useReload";
import { InvariantContext } from "../../../../utils/context";
import { useWallet } from "../../../../wallets/walletProvider";
import { useProtocolData } from "../../../../web3/components/providers/ProtocolDataProvider";
import { useWalletData } from "../../../../web3/components/providers/WalletDataProvider";
import { useColPools } from "../colPools-provider";

const Context = createContext(InvariantContext('ColPoolProvider'))

export function useColPool() {
  return useContext(Context)
}

const ColPoolProvider = props => {
  const { children } = props
  const protocolData = useProtocolData()
  
  const [reload] = useReload()
  const colPoolsCtx = useColPools()
  const [poolLable, setPoolLable] = useState(protocolData.colPools[0].lable)
  const walletCtx = useWallet()
  const config = useConfig()
  const walletData = useWalletData()

  const colPool = useMemo(() => colPoolsCtx.getColPoolByToken(poolLable), [poolLable])
  const [pledgeAmount, setPledgeAmount] = useState(0)
  const [pledging, setPledging] = useState(false)
  
  useEffect(() => {
    colPool?.tokens.forEach(token => {
      token.contract.loadCommon().then(reload).catch(Error)
    })
  }, [colPool])

  useEffect(() => {
    colPool?.contract.loadCommon().then(reload).catch(Error)
  }, [colPool])
  
  useEffect(() => {
    if (walletCtx.account) {
      colPool?.tokens.forEach(token => {
        (token.contract).loadBalance().then(reload).catch(Error)
      })
    }
  }, [colPool, walletCtx.account])
  
  useEffect(() => {
    if (walletCtx.account) {
      colPool?.tokens.forEach(token => {
        (token.contract).loadAllowance(config.contracts.financingPool?.financingPool).then(reload).catch(Error)
      })
    }
  }, [colPool, walletCtx.account])

  useEffect(() => {
    if (walletCtx.account) {      
      colPool?.contract.loadBalance().then(reload).catch(Error)
    }
  }, [colPool, walletCtx.account])

  useEffect(() => {
    if (walletCtx.account) {
      walletData.walletDataContract.loadIssuerLtv(walletCtx.account, colPool.tokens[0].address).then(reload).catch(Error)
    }
  }, [colPool, walletCtx.account])

  useEffect(() => {
    if (walletCtx.account) {
      walletData.walletDataContract.loadIssuerTotalDebts(walletCtx.account, colPool.tokens[0].address).then(reload).catch(Error)
    }
  }, [colPool, walletCtx.account])

  const value = {
    poolLable,
    setPoolLable,
    colPool,
    pledgeAmount, 
    setPledgeAmount,
    pledging,
    setPledging
  }

  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  )    
}

export default ColPoolProvider