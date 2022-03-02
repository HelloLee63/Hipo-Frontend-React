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

  constructor(address) {
    super(DebtTokenABI, address, '')
    this.debtsByCollateralMap = new Map()
    this.debtsListMap = new Map()
    this.debtsCountMap = new Map()

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
    console.log(debtsList);
    this.debtsListMap.set(issuer, debtsList)
    console.log(this.debtsListMap);
    this.emit(Web3Contract.UPDATE_DATA)
  }

  async loadDelay() {
    const delay = await this.call('getDelayDuration', [])
    this.delay = delay
    console.log(delay)
    this.emit(Web3Contract.UPDATE_DATA)
  }

  async loadDebtsCount(issuer) {
    const debtsCount = await this.call('_getIssuerDebtsCount', [issuer])
    this.debtsCount = debtsCount
    this.debtsCountMap.set(issuer, debtsCount)
    console.log(this.debtsCountMap);
    this.emit(Web3Contract.UPDATE_DATA)
  }

  async loadDebtData(issuer, id) {
    const debtData = await this.call('getDebtData', [issuer, id])
    this.debtData = debtData
    console.log(this.debtData);
    this.emit(Web3Contract.UPDATE_DATA)
  }
}

export default DebtTokenContract