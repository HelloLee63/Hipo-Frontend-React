import BigNumber from "bignumber.js";
import { createContext, useCallback, useContext, useEffect, useMemo } from "react";
import { useConfig } from "../../../components/providers/configProvider";
import { usePools } from "../../../components/providers/poolsProvider";
import { useReload } from "../../../hooks/useReload";
import { InvariantContext } from "../../../utils/context";
import { useWallet } from "../../../wallets/walletProvider";
import WalletDataContract from "../../contracts/WalletDataContract";
import { useContract } from "../contractManagerProvider";

function useWalletDataContract (address) {
  return useContract(address, () => {
    return new WalletDataContract(address)
  })
}

const Context = createContext(InvariantContext('WalletDataProvider'))

export function useWalletData() {
  return useContext(Context)
}

const WalletDataProvider = props => {
  const { children } = props

  const config = useConfig()
  const walletCtx = useWallet()
  const [reload] = useReload()
  const { assets, collateralPools, bondPools } = usePools()

  const walletDataContract = useWalletDataContract(config.contracts.dataProvider.walletDataProvider)

  const getBalanceOfBToken = useCallback(() => {
    
    let amount = new BigNumber(0)

    if (walletCtx.account) {
      bondPools.forEach(pool => {
        const balance = new BigNumber(pool.bToken.contract.balances?.get(walletCtx.account))
        amount = BigNumber.sum(amount, balance)
      })
    }
    return amount 

  }, [walletCtx.account, bondPools])
  
  const getBalanceOfDToken = useCallback(() => {
    
    let amount = new BigNumber(0)

    if (walletCtx.account) {
      bondPools.forEach(pool => {
        const balance = new BigNumber(pool.dToken.contract.balances?.get(walletCtx.account))
        amount = BigNumber.sum(amount, balance)
      })
    }
    return amount 

  }, [walletCtx.account, bondPools])

  const getIssuerLtv = useCallback(
    (collateralAssetAddress) => {
      if (walletCtx.account) {
        return walletDataContract.issuerLtvArray?.find(obj => 
          obj.issuer === walletCtx.account && obj.collateralAssetAddress === collateralAssetAddress
        )
      }      
    }, [walletCtx.account, walletDataContract.issuerLtvArray])

  const getIssuerTotalDebts = useCallback(
    (collateralAssetAddress) => {
      if (walletCtx.account) {
        return walletDataContract.issuerTotalDebtsArray?.find(obj => 
          obj.issuer === walletCtx.account && obj.collateralAssetAddress === collateralAssetAddress
        )
      }
    }, [walletCtx.account, walletDataContract.issuerTotalDebtsArray]
  )

  const getBondsList = (pool) => {
    if (walletCtx.account) {
      return pool.bToken.contract.getListsOf(walletCtx.account)
    }
  }

  const getDebtsList = (pool) => {
    if (walletCtx.account) {
      return pool.dToken.contract.debtsListMap?.get(walletCtx.account)
    }
  }

  const getBondData = (pool, id) => {
    if (walletCtx.account) {
      return pool.bToken.contract.bonds?.find(data => 
        data.id === id && data.investor === walletCtx.account
      )
    }    
  }

  const getDebtData = (pool, id) => {
    if (walletCtx.account) {
      return pool.dToken.contract.debtDataArray?.find(data => 
        data.issuer === walletCtx.account && data.id === id    
      )
    }
  }

  // get wallet balance of assets

  useEffect(() => {
    if(walletCtx.account) {
      assets.forEach(asset => {
        asset.contract.loadBalance().then(reload).catch(Error)
      })
    }
  },[assets, walletCtx.account])

  // get wallet balance of uniswap lp token

  useEffect(() => {
    if (walletCtx.account) {
      collateralPools.forEach(pool => {
        pool.collateralAsset.contract.loadBalance().then(reload).catch(Error)
      })
    }
  }, [collateralPools, walletCtx.account])

  // get amount of pledged

  useEffect(() => {
    if(walletCtx.account) {
      collateralPools.forEach(pool => {
        (pool.contract).loadBalance().then(reload).catch(Error)
      })
    }
  }, [collateralPools, walletCtx.account])

  //get issuer ltv of each collateral

  useEffect(() => {
    if (walletCtx.account) {
      collateralPools.forEach(pool => {
        walletDataContract.loadIssuerLtv(
          walletCtx.account, pool.collateralAsset.address).then(reload).catch(Error)
      })
    }
  }, [collateralPools, walletCtx.account, walletDataContract])

  //get issuer total debts of each collateral

  useEffect(() => {
    if (walletCtx.account) {
      collateralPools.forEach(pool => {
        walletDataContract.loadIssuerTotalDebts(
          walletCtx.account, pool.collateralAsset.address).then(reload).catch(Error)
      })      
    }
  }, [collateralPools, walletCtx.account])

  // get wallet balance of bToken

  useEffect(() => {
    if (walletCtx.account) {
      bondPools.forEach(pool => {
        pool.bToken.contract.loadBalance().then(reload).catch(Error)
      })
    }
  }, [bondPools, walletCtx.account])

  // get wallet balance of dToken

  useEffect(() => {
    if (walletCtx.account) {
      bondPools.forEach(pool => {
        pool.dToken.contract.loadBalance().then(reload).catch(Error)
      })
    }
  }, [bondPools, walletCtx.account])

  // get wallet balance of lpToken

  useEffect(() => {
    if (walletCtx.account) {
      bondPools.forEach(pool => {
        pool.lpToken.contract.loadBalance().then(reload).catch(Error)
      })
    }    
  }, [walletCtx.account, bondPools])

  // get bond count of investor on each bToken

  // useEffect(() => {
  //   if (walletCtx.account) {
  //     bondPools.forEach((pool) => {
  //       pool.bToken.contract.loadInvestorBondsList(walletCtx.account).then(reload).catch(Error)             
  //     })
  //   }
  // }, [walletCtx.account, bondPools])

  useEffect(() => {
    if (walletCtx.account) {
      bondPools.forEach((pool) => {
        pool.dToken.contract.loadDebtsList(walletCtx.account).then(reload).catch(Error)
      })
    }
  }, [walletCtx.account, bondPools])

  const value = {
    walletDataContract,

    getBalanceOfBToken,
    getIssuerLtv,
    getIssuerTotalDebts,

    getBalanceOfDToken,
    getBondsList,
    getBondData,

    getDebtsList,
    getDebtData,
  }

  return (
    <Context.Provider value={value}>
      { children }
    </Context.Provider>
  )
}

export default WalletDataProvider