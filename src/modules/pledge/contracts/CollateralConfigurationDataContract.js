import Web3Contract, { createAbiItem } from "../../../web3/web3Contract";

const CollateralConfigurationDataABI = [
    createAbiItem('getCollateralConfigurationData', 
    ['address'], 
    ['uint256', 'uint256', 'uint256', 'uint256', 'bool', 'bool'])]

class CollateralConfigurationDataContract extends Web3Contract {

  maxLtvMap
  thresholdMap

  constructor(address) {
      super(CollateralConfigurationDataABI, address, '')
      this.maxLtvMap = new Map()
      this.thresholdMap = new Map()

      this.on(Web3Contract.UPDATE_DATA, () => {
        this.maxLtvMap.clear()
        this.thresholdMap.clear()
        this.emit(Web3Contract.UPDATE_DATA)
      })
  }

  collateralConfigurationData

    async loadCollateralConfigurationData(collateralAssetAddress) {
        const collateralConfigurationData = await this.call('getCollateralConfigurationData', [collateralAssetAddress])
        this.collateralConfigurationData = collateralConfigurationData

        const configuration = Object.values(this.collateralConfigurationData)

        if(configuration) {
          this.maxLtvMap.set(collateralAssetAddress, configuration[1])
          this.thresholdMap.set(collateralAssetAddress, configuration[2])
          this.emit(Web3Contract.UPDATE_ACCOUNT)
        }        
    }
}

export default CollateralConfigurationDataContract