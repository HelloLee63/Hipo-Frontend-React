import Web3Contract, { createAbiItem } from "../web3Contract"

const WalletDataProviderABI = [createAbiItem('getIssuerLtv', ['address', 'address'], ['uint256']),
                               createAbiItem('getIssuerTotalDebts', ['address', 'address'], ['address', 'uint256', 'address', 'uint256']),

]

class WalletDataContract extends Web3Contract {

    issuerLtvMap
    issuerLtvArray
    issuerLtvObject
    issuerTotalDebtsObject
    issuerTotalDebtsArray

    constructor(address) {
        super(WalletDataProviderABI, address, '')
        this.issuerLtvMap = new Map()
        this.issuerLtvArray = new Array()
        this.issuerLtvObject = new Object()
        this.issuerTotalDebtsObject = new Object()
        this.issuerTotalDebtsArray = new Array()

        this.on(Web3Contract.UPDATE_ACCOUNT, () => {
            this.issuerLtvArray = []
            this.issuerLtvObject = {}
            this.emit(Web3Contract.UPDATE_DATA)
        })
    }

    issuerLtv
    issuerTotalDebts

    getIssuerLtv(issuer = this.account, collateralAssetAddress) {
        const ltv = issuer ? this.issuerLtvArray.find(
            obj => obj.issuer === issuer &&
                obj.collateralAssetAddress === collateralAssetAddress
        ) : undefined

        return ltv
    }

    async loadIssuerLtv(issuer, collateralAssetAddress) {
        const issuerLtv = await this.call('getIssuerLtv', [issuer, collateralAssetAddress])
        this.issuerLtvObject = {}
        if (issuerLtv) {
            this.issuerLtvObject.issuer = issuer
            this.issuerLtvObject.collateralAssetAddress = collateralAssetAddress
            this.issuerLtvObject.ltv = issuerLtv
            console.log(issuer);
            console.log(collateralAssetAddress);
            console.log(issuerLtv);

            console.log(this.issuerLtvObject);
            console.log(this.issuerLtvArray);

            if(this.issuerLtvArray.length === 0) {

                console.log('lengthe is Zero');
                console.log(this.issuerLtvObject);
                this.issuerLtvArray.push(this.issuerLtvObject)
                console.log(this.issuerTotalDebtsArray);
            }

            this.issuerLtvArray.map((obj) => {

                if(obj.issuer !== issuer || obj.collateralAssetAddress !== collateralAssetAddress) {
                    console.log('push is execute');
                  this.issuerLtvArray.push(this.issuerLtvObject)
                }
    
                if(obj.issuer === issuer && obj.collateralAssetAddress === collateralAssetAddress) {
                    console.log('update is execute');
                  obj.ltv = issuerLtv
                }              
            })

            console.log(this.issuerLtvArray);

            this.issuerLtv = issuerLtv
            this.emit(Web3Contract.UPDATE_DATA)
        }
               
    }

    async loadIssuerTotalDebts(issuer, collateralAssetAddress) {
        const issuerTotalDebts = await this.call('getIssuerTotalDebts', [issuer, collateralAssetAddress])
        this.issuerTotalDebts = issuerTotalDebts
        this.issuerTotalDebtsObject = {}

        const data = Object.values(this.issuerTotalDebts)

        if(issuerTotalDebts) {
            this.issuerTotalDebtsObject.debtAAddress = data[0]
            this.issuerTotalDebtsObject.debtAAmount = data[1]
            this.issuerTotalDebtsObject.debtBAddress = data[2]
            this.issuerTotalDebtsObject.debtBAmount = data[3]
            this.issuerTotalDebtsObject.issuer = issuer
            this.issuerTotalDebtsObject.collateralAssetAddress = collateralAssetAddress

            console.log(this.issuerTotalDebtsObject);

            if (this.issuerTotalDebtsArray.length === 0) {
                this.issuerTotalDebtsArray.push(this.issuerTotalDebtsObject)
            }

            this.issuerTotalDebtsArray.forEach((obj) => {

                if(obj.issuer !== issuer || obj.collateralAssetAddress !== collateralAssetAddress) {
                  this.issuerTotalDebtsArray.push(this.issuerTotalDebtsObject)
                }
    
                if(obj.issuer === issuer && obj.collateralAssetAddress === collateralAssetAddress) {
                  obj.debtAAddress = data[0]
                  obj.debtAAmount = data[1]
                  obj.debtBAddress = data[2]
                  obj.debtBAmount = data[3]
                  obj.issuer = issuer
                  obj.collateralAssetAddress = collateralAssetAddress
                }              
            })

            console.log(this.issuerTotalDebtsArray);
        }

        this.emit(Web3Contract.UPDATE_DATA)      
    }    
}

export default WalletDataContract