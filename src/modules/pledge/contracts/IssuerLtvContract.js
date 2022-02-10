import Web3Contract, { createAbiItem } from "../../../web3/web3Contract";


const IssuerLtvABI = [createAbiItem('getIssuerLtv', ['address', 'address'], ['uint256'])]

class IssuerLtvContract extends Web3Contract {

    issuerLtvMap

    constructor(address) {
        super(IssuerLtvABI, address, '')
        this.issuerLtvMap = new Map()

        this.on(Web3Contract.UPDATE_ACCOUNT, () => {
            this.issuerLtvMap.clear()
            this.emit(Web3Contract.UPDATE_DATA)
        })
    }

    issuerLtv

    async loadIssuerLtv(issuer, collateralAssetAddress) {
        const issuerLtv = await this.call('getIssuerLtv', [issuer, collateralAssetAddress])
        if (issuerLtv) {
            this.issuerLtvMap.set(issuer, issuerLtv)
            this.issuerLtv = issuerLtv
            this.emit(Web3Contract.UPDATE_DATA)
        }        
    }
}

export default IssuerLtvContract