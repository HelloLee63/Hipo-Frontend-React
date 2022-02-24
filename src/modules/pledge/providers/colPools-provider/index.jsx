import { createContext, useCallback, useContext, useEffect, useMemo } from "react";
import { useKnownTokens } from "../../../../components/providers/knownTokensProvider";
import { useReload } from "../../../../hooks/useReload";
import { InvariantContext } from "../../../../utils/context";
import { useWallet } from "../../../../wallets/walletProvider";
import { useWalletData } from "../../../../web3/components/providers/WalletDataProvider";

const Context = createContext(InvariantContext('ColPoolsProvider'))

export function useColPools() {
    return useContext(Context)
}

const ColPoolsProvider = props => {

  const { children } = props  

  const walletCtx = useWallet()
  const [reload] = useReload()
  const walletData = useWalletData()
  
  console.log('ColPoolsProvider is rendered');
  
  const { 
    usdcwethLpToken, 
    wethusdtLpToken, 
    daiwethLpToken,
    cuUSDCWETH,
    cuWETHUSDT,
    cuDAIWETH  
  } = useKnownTokens()
  
  const colPools = useMemo(
    () => [
      {
        token: cuUSDCWETH,
        underlyingAsset: usdcwethLpToken,
        contract: cuUSDCWETH.contract
      },
      {
        token: cuWETHUSDT,
        underlyingAsset: wethusdtLpToken,
        contract: cuWETHUSDT.contract
      },
      {
        token: cuDAIWETH,
        underlyingAsset: daiwethLpToken,
        contract: cuDAIWETH.contract
      },
    ], [])

  const getColPoolBySymbol = useCallback(
    (symbol) => {
      return colPools.find(colPool => colPool.underlyingAsset.symbol === symbol)
    }, [colPools])
  
  useEffect(() => {
    if(walletCtx.account) {
      colPools.forEach(colPool => {
        (colPool.contract).loadBalance().then(reload).catch(Error)
      })
    }
  }, [colPools, walletCtx.account])

  useEffect(() => {
    if (walletCtx.account) {
      colPools.forEach(colPool => {
        walletData.walletDataContract.loadIssuerLtv(
          walletCtx.account, colPool.underlyingAsset.address).then(reload).catch(Error)
      })
    }
  }, [colPools, walletCtx.account])

  useEffect(() => {
    if (walletCtx.account) {
      colPools.forEach(colPool => {
        walletData.walletDataContract.loadIssuerTotalDebts(
          walletCtx.account, colPool.underlyingAsset.address).then(reload).catch(Error)
      })      
    }
  }, [colPools, walletCtx.account])

  const value = {
    colPools,
    getColPoolBySymbol,
  }

  return (
    <Context.Provider value={value}>
      { children }
    </Context.Provider>
  )
}

export default ColPoolsProvider