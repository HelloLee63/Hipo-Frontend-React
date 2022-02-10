import Web3Contract, { createAbiItem } from "../web3Contract"

const WalletDataProviderABI = [createAbiItem('getIssuerLtv', ['address', 'address'], ['uint256']),
                               createAbiItem('getIssuerTotalDebts', ['address', 'address'], ['address', 'uint256', 'address', 'uint256']) 

]

class WalletDataContract extends Web3Contract {

    issuerLtvMap
    issuerLtvArray
    issuerLtvObject

    constructor(address) {
        super(WalletDataProviderABI, address, '')
        this.issuerLtvMap = new Map()
        this.issuerLtvArray = new Array()
        this.issuerLtvObject = new Object()

        this.on(Web3Contract.UPDATE_ACCOUNT, () => {
            // this.issuerLtvMap.clear()
            // this.issuerLtvArray.clear()
            // this.issuerLtvObject.clear()
            this.emit(Web3Contract.UPDATE_DATA)
        })
    }

    issuerLtv
    issuerTotalDebts

    async loadIssuerLtv(issuer, collateralAssetAddress) {
        const issuerLtv = await this.call('getIssuerLtv', [issuer, collateralAssetAddress])
        if (issuerLtv) {
            this.issuerLtvMap.set(issuer, issuerLtv)
            this.issuerLtvObject.issuer = issuer
            this.issuerLtvObject.collateralAssetAddress = collateralAssetAddress
            this.issuerLtvObject.ltv = issuerLtv
            this.issuerLtvArray.push(this.issuerLtvObject)
            this.issuerLtv = issuerLtv
            this.emit(Web3Contract.UPDATE_DATA)
        }        
    }

    async loadIssuerTotalDebts(issuer, collateralAssetAddress) {
        const issuerTotalDebts = await this.call('getIssuerTotalDebts', [issuer, collateralAssetAddress])
        this.issuerTotalDebts = issuerTotalDebts
        this.emit(Web3Contract.UPDATE_DATA)        
    }    
}

export default WalletDataContract