import Web3Contract, { createAbiItem } from "../../../web3/web3Contract";


const CollateralsListABI = [createAbiItem('getCollateralsList', [], ['address[]'])]

class CollateralsListContract extends Web3Contract {
    constructor(address) {
        super(CollateralsListABI, address, '')
    }
    
    collaterals

    async loadCollateralsList() {
        const collaterals = await this.call('getCollateralsList', [])
        this.collaterals = collaterals
        this.emit(Web3Contract.UPDATE_DATA)
        console.log(collaterals);
    }
}

export default CollateralsListContract