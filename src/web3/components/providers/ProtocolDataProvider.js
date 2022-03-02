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

  const { bondPools, collateralPools } = usePools()

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