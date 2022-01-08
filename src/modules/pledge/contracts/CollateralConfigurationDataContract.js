import Web3Contract, { createAbiItem } from "../../../web3/web3Contract";


const CollateralConfigurationDataABI = [
    createAbiItem('getCollateralConfigurationData', 
    ['address'], 
    ['uint256', 'uint256', 'uint256', 'uint256', 'bool', 'bool'])]

class CollateralConfigurationDataContract extends Web3Contract {
    constructor(address) {
        super(CollateralConfigurationDataABI, address, '')
    }

    collateralConfigurationData

    async loadCollateralConfigurationData(collateralAssetAddress) {
        const collateralConfigurationData = await this.call('getCollateralConfigurationData', [collateralAssetAddress])
        this.collateralConfigurationData = collateralConfigurationData
        this.emit(Web3Contract.UPDATE_ACCOUNT)
        console.log(collateralConfigurationData);
    }
}

export default CollateralConfigurationDataContract