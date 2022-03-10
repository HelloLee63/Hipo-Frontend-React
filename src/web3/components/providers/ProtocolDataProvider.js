import { createContext, useCallback, useContext, useEffect } from "react";
import { useConfig } from "../../../components/providers/configProvider";
import { usePools } from "../../../components/providers/poolsProvider";
import { useReload } from "../../../hooks/useReload";
import ProtocolDataContract from "../../contracts/ProtocolDataProviderContract";
import { useContract } from "../contractManagerProvider";

function useProtocolDataContract (address) {
  return useContract(address, () => {
    return new ProtocolDataContract(address)
  })
}

const Context = createContext('ProtocolDataProvider')

export function useProtocolData() {
  return useContext(Context)
}

const ProtocolDataProvider = ({ children }) => {
  
  const config = useConfig()
  const protocolDataContract = useProtocolDataContract(config.contracts.dataProvider.protocolDataProvider)
  const [reload] = useReload()

  // console.log('Protocol Data Provider is rendered');

  const { bondPools, collateralPools, assets } = usePools()

  useEffect(() => {
    bondPools.forEach(pool => {
      const bondDuration = Number(pool.duration.duration)
      protocolDataContract?.loadBondPrice(pool.bondAsset.address, bondDuration, config.contracts.hipoV1AMMfactory).then(reload).catch(Error)
    })
  }, [bondPools, protocolDataContract])

  useEffect(() => {
    collateralPools.forEach(pool => {
      protocolDataContract.loadCollateralConfigurationData(pool.collateralAsset.address) 
    })
  }, [collateralPools, protocolDataContract])

  // get common data of each dToken includes totalSupply, decimals and etc.

  useEffect(() => {
    bondPools.forEach(pool => {
      pool.dToken.contract.loadCommon().then(reload).catch(Error)
    })
  }, [bondPools])

  // get common data of each cuToken includes totalSupply, decimals and etc.

  useEffect(() => {
    collateralPools.forEach(pool => {
      pool.contract.loadCommon().then(reload).catch(Error)
    })
  }, [collateralPools])

  // get common data of each lpToken includes totalSupply, decimals and etc.

  useEffect(() => {
    bondPools.forEach(pool => {
      pool.lpToken.contract.loadCommon().then(reload).catch(Error)
    })
  }, [bondPools])

  // get common data of each bToken includes totalSupply, decimals and etc.

  useEffect(() => {
    bondPools.forEach(pool => {
      pool.bToken.contract.loadCommon().then(reload).catch(Error)
    })
  }, [bondPools])

  // get common data of each asset includes totalSupply, decimals and etc.

  useEffect(() => {
    assets.forEach(asset => {
      asset.contract.loadCommon().then(reload).catch(Error)
    })
  }, [assets])

  useEffect(() => {
    collateralPools.forEach(pool => {
      pool.collateralAsset.contract.loadCommon().then(reload).catch(Error)
    })
  }, [collateralPools])

  useEffect(() => {    
      assets[1].contract.loadBalance(collateralPools[0].collateralAsset.address)    
  }, [assets[1], collateralPools[0]])

  useEffect(() => {    
    assets[2].contract.loadBalance(collateralPools[1].collateralAsset.address)    
  }, [assets[2], collateralPools[1]])

  useEffect(() => {    
    assets[3].contract.loadBalance(collateralPools[2].collateralAsset.address)    
  }, [assets[3], collateralPools[2]])

  const getBondPrice = useCallback((
    (bondAsset, duration) => {
      const priceData = protocolDataContract.bondPriceArray?.find((obj) => 
        obj.assetAddress === bondAsset && obj.duration === duration
      )      
      return priceData?.price
    }), [protocolDataContract.bondPriceArray])

  const value = {
    protocolDataContract,
    getBondPrice
  }

  return (
    <Context.Provider value={ value }>{children}</Context.Provider>
  )
}

export default ProtocolDataProvider