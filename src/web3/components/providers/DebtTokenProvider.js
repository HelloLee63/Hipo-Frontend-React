import { createContext, useContext, useEffect, useMemo } from "react";
import { useKnownTokens } from "../../../components/providers/knownTokensProvider";
import { useReload } from "../../../hooks/useReload";
import { InvariantContext } from "../../../utils/context";
import { useWallet } from "../../../wallets/walletProvider";

const Context = createContext(InvariantContext('DebtTokenProvider'))

export function useDebtToken() {
  return useContext(Context)
}

const DebtTokenProvider = props => {
  const { children } = props
  const walletCtx = useWallet()
  const [reload] = useReload()

  const { 
    dWETH5,
    dWETH10,
    dWETH15,
    dWETH30,
    dWETH45,
    dWETH60,
    dUSDC5,
    dUSDC10,
    dUSDC15,
    dUSDC30,
    dUSDC45,
    dUSDC60,
    dUSDT5,
    dUSDT10,
    dUSDT15,
    dUSDT30,
    dUSDT45,
    dUSDT60,
    dDAI5,
    dDAI10,
    dDAI15,
    dDAI30,
    dDAI45,
    dDAI60,
    
    usdcwethLpToken,
    wethusdtLpToken,
    daiwethLpToken,
  } = useKnownTokens()

  const dTokens = useMemo(() => [
    dWETH5,
    dWETH10,
    dWETH15,
    dWETH30,
    dWETH45,
    dWETH60,
    dUSDC5,
    dUSDC10,
    dUSDC15,
    dUSDC30,
    dUSDC45,
    dUSDC60,
    dUSDT5,
    dUSDT10,
    dUSDT15,
    dUSDT30,
    dUSDT45,
    dUSDT60,
    dDAI5,
    dDAI10,
    dDAI15,
    dDAI30,
    dDAI45,
    dDAI60,
  ])

  useEffect(() => {
    if(walletCtx.account) {
      dWETH5.contract.loadDebtsByCollateral(walletCtx.account, daiwethLpToken.address).then(reload).catch(Error)
    }
  }, [walletCtx.account])

  useEffect(() => {
    if(walletCtx.account) {
      dWETH5.contract.loadBalance().then(reload).catch(Error)
    }
  }, [walletCtx.account])

  useEffect(() => {
    if(walletCtx.account) {
      dWETH5.contract.loadDebtsList(walletCtx.account).then(reload).catch(Error)
    }
  }, [walletCtx.account])

  useEffect(() => {
    dWETH5.contract.loadDelay().then(reload).catch(Error)
  }, [])

  useEffect(() => {
    if(walletCtx.account) {
      dWETH5.contract.loadDebtsCount(walletCtx.account).then(reload).catch(Error)
    }    
  }, [walletCtx.account])

  const value = {
    dTokens,
  }

  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider> 
  )
}

export default DebtTokenProvider