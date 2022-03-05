import Erc20Contract from "../erc20Contract";
import Web3Contract, { createAbiItem } from "../web3Contract";

const DebtTokenABI = [
  createAbiItem('getIssuerDebtsOfCollateral', ['address', 'address'], ['uint256']),
  createAbiItem('getIssuerDebtsList', ['address'], ['uint256[]']),
  createAbiItem('getDelayDuration', [], []),
  createAbiItem('_getIssuerDebtsCount', ['address'], ['uint256']),
  createAbiItem('getDebtData', ['address', 'uint256'], ['uint256', 'uint256', 'address']),
]

class DebtTokenContract extends Erc20Contract {
  debtByCollateralMap
  debtsListMap
  debtsCountMap
  debtDataArray

  constructor(address) {
    super(DebtTokenABI, address, '')
    this.debtsByCollateralMap = new Map()
    this.debtsListMap = new Map()
    this.debtsCountMap = new Map()
    this.debtDataArray = new Array()

    this.on(Web3Contract.UPDATE_ACCOUNT, () => {
      this.debtsByCollateralMap.clear()
      this.debtsListMap.clear()
      this.debtsCountMap.clear()
      this.emit(Web3Contract.UPDATE_DATA)
    })    
  }

  debtsByCollateral
  debtsList
  delay
  debtsCount
  debtData

  getListsOf(address = this.account) {
    return address ? this.debtsListMap.get(address) : undefined
  }

  async loadDebtsByCollateral(issuer, collateralAsset) {
    const debtsByCollateral = await this.call('getIssuerDebtsOfCollateral', [issuer, collateralAsset])
    this.debtsByCollateral = debtsByCollateral
    this.emit(Web3Contract.UPDATE_DATA)
  }

  async loadDebtsList(issuer) {
    const debtsList = await this.call('getIssuerDebtsList', [issuer])
    this.debtsList = debtsList
    this.debtsListMap.set(issuer, debtsList)
    this.emit(Web3Contract.UPDATE_DATA)
  }

  async loadDelay() {
    const delay = await this.call('getDelayDuration', [])
    this.delay = delay
    // console.log(delay)
    this.emit(Web3Contract.UPDATE_DATA)
  }

  async loadDebtsCount(issuer) {
    const debtsCount = await this.call('_getIssuerDebtsCount', [issuer])
    this.debtsCount = debtsCount
    this.debtsCountMap.set(issuer, debtsCount)
    this.emit(Web3Contract.UPDATE_DATA)
  }

  async loadDebtData(issuer = this.account) {

    if (!issuer) {
      return Promise.reject(new Error('Invalid owner address!'))
    }
    
    let debtDataObj = new Object()
    // console.log(this.debtsListMap);

    const list = this.getListsOf(issuer)

    // console.log(list);

    if (list?.length > 0) {
      for (let j = 0; j < list.length; j++) {
        
        const debtData = await this.call('getDebtData', [issuer, list[j]])
        this.debtData = Object.values(debtData)

        debtDataObj = {}

        debtDataObj.id = list[j]
        debtDataObj.issuer = issuer
        debtDataObj.data = this.debtData

        // console.log(debtDataObj);

        // console.log(debtDataObj.id);
        // console.log(debtDataObj.issuer);
        // console.log(debtDataObj.data);
        // console.log(debtDataObj);

        // console.log(this.debtDataArray.length);


        if (this.debtDataArray.length === 0) {
          // console.log(debtDataObj);
          this.debtDataArray.push(debtDataObj)
          // console.log(this.debtDataArray);
        }

        if (this.debtDataArray.length > 0) {
          for (let i = 0; i < this.debtDataArray.length; i++) {
            if (this.debtDataArray[i].id === debtDataObj.id && this.debtDataArray[i].issuer === debtDataObj.issuer) {

              // console.log(this.debtDataArray[i].id === debtDataObj.id);
              // console.log(this.debtDataArray[i].issuer === debtDataObj.issuer);

              // console.log(this.debtDataArray[i]);
              // console.log(this.debtDataArray[i].id);

              this.debtDataArray[i].id = debtDataObj.id
              this.debtDataArray[i].issuer = issuer
              this.debtDataArray[i].data = this.debtData

              // console.log(this.debtDataArray);
            }
      
            if (this.debtDataArray[i].id !== debtDataObj.id || this.debtDataArray[i].issuer !== debtDataObj.issuer) {
              this.debtDataArray.push(debtDataObj)
            }
          }        
        }
      }    
    }    
    // console.log(this.debtDataArray);
    this.emit(Web3Contract.UPDATE_DATA)
  }
}

export default DebtTokenContract