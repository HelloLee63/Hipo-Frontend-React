import Web3Contract, { createAbiItem } from "../web3Contract"

const ProtocolDataABI = [
    createAbiItem('getCollateralConfigurationData', 
      ['address'], 
      ['uint256', 'uint256', 'uint256', 'uint256', 'bool', 'bool']),
    createAbiItem('getBondPrice', ['address', 'uint256', 'address'], ['uint256']),
]

class ProtocolDataContract extends Web3Contract {

  maxLtvMap
  thresholdMap
  bondPriceObject
  bondPriceArray

  constructor(address) {
      super(ProtocolDataABI, address, '')
      this.maxLtvMap = new Map()
      this.thresholdMap = new Map()
      this.bondPriceObject = new Object()
      this.bondPriceArray = new Array()

      this.on(Web3Contract.UPDATE_DATA, () => {
        // this.maxLtvMap.clear()
        // this.thresholdMap.clear()
        // this.bondPriceArray = []
        this.emit(Web3Contract.UPDATE_DATA)
      })
  }

  collateralConfigurationData
  bondPrice

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

    async loadBondPrice(assetAddress, duration, hipoV1AMMfactory) {
        const bondPrice = await this.call('getBondPrice', [assetAddress, duration, hipoV1AMMfactory])
        this.bondPriceObject = {}
  
        if (bondPrice) {
          this.bondPrice = bondPrice

          this.bondPriceObject.assetAddress = assetAddress
          this.bondPriceObject.duration = duration.toString()
          this.bondPriceObject.price = bondPrice

          if (this.bondPriceArray.length === 0) {
            this.bondPriceArray.push(this.bondPriceObject)
          }
            
          this.bondPriceArray.forEach((data) => {

            if(data.assetAddress !== assetAddress && data.duration !== duration) {
              this.bondPriceArray.push(this.bondPriceObject)
            }

            if(data.assetAddress === assetAddress && data.duration === duration) {
              data.price = bondPrice
            }              
          })

          console.log(this.bondPriceArray);
          
          this.emit(Web3Contract.UPDATE_DATA)
        }        
      }
}

export default ProtocolDataContract