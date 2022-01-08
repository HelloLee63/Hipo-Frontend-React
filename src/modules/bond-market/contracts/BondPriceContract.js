import Web3Contract, { createAbiItem } from "../../../web3/web3Contract";

const BondPriceABI = [createAbiItem('getBondPrice', ['address', 'uint256', 'address'], ['uint256'])]

class BondPriceContract extends Web3Contract {
    constructor(address) {
        super(BondPriceABI, address, '')
    }

    bondPrice

    async loadBondPrice(assetAddress, duration, hipoV1AMMfactory) {
        const bondPrice = await this.call('getBondPrice', [assetAddress, duration, hipoV1AMMfactory])
        this.bondPrice = bondPrice
        this.emit(Web3Contract.UPDATE_DATA)
        console.log(bondPrice);
    }
}

export default BondPriceContract