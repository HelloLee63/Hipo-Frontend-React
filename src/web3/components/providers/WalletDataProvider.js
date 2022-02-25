import { createContext, useCallback, useContext, useEffect } from "react";
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

  useEffect(() => {
    if(walletCtx.account) {
      assets.forEach(asset => {
        asset.contract.loadBalance().then(reload).catch(Error)
      })
    }
  },[assets, walletCtx.account])

  useEffect(() => {
    if (walletCtx.account) {
      collateralPools.forEach(pool => {
        pool.collateralAsset.contract.loadBalance().then(reload).catch(Error)
      })
    }
  }, [collateralPools, walletCtx.account])

  useEffect(() => {
    if(walletCtx.account) {
      collateralPools.forEach(pool => {
        (pool.contract).loadBalance().then(reload).catch(Error)
      })
    }
  }, [collateralPools, walletCtx.account])

  useEffect(() => {
    if (walletCtx.account) {
      collateralPools.forEach(pool => {
        walletDataContract.loadIssuerLtv(
          walletCtx.account, pool.collateralAsset.address).then(reload).catch(Error)
      })
    }
  }, [collateralPools, walletCtx.account, walletDataContract])

  useEffect(() => {
    if (walletCtx.account) {
      collateralPools.forEach(pool => {
        walletDataContract.loadIssuerTotalDebts(
          walletCtx.account, pool.collateralAsset.address).then(reload).catch(Error)
      })      
    }
  }, [collateralPools, walletCtx.account])

  useEffect(() => {
    if (walletCtx.account) {
      bondPools.forEach(pool => {
        pool.bToken.contract.loadBalance().then(reload).catch(Error)
      })
    }
  }, [bondPools, walletCtx.account])

  useEffect(() => {
    if (walletCtx.account) {
      bondPools.forEach(pool => {
        pool.dToken.contract.loadBalance().then(reload).catch(Error)
      })
    }
  }, [bondPools, walletCtx.account])

  useEffect(() => {
    assets.forEach(asset => {
      asset.contract.loadCommon().then(reload).catch(Error)
    })
  }, [assets])

  const value = {
    walletDataContract,
    getIssuerLtv,
    getIssuerTotalDebts,
  }

  return (
    <Context.Provider value={value}>
      { children }
    </Context.Provider>
  )
}

export default WalletDataProvider