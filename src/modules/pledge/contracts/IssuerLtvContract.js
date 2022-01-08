import Web3Contract, { createAbiItem } from "../../../web3/web3Contract";


const IssuerLtvABI = [createAbiItem('getIssuerLtv', ['address', 'address'], ['uint256'])]

class IssuerLtvContract extends Web3Contract {
    constructor(address) {
        super(IssuerLtvABI, address, '')
    }

    issuerLtv

    async loadIssuerLtv(issuer, collateralAssetAddress) {
        const issuerLtv = await this.call('getIssuerLtv', [issuer, collateralAssetAddress])
        this.issuerLtv = issuerLtv
        this.emit(Web3Contract.UPDATE_DATA)
        console.log(issuerLtv);
    }
}

export default IssuerLtvContract