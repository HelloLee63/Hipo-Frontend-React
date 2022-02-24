import Erc20Contract from "../../../web3/erc20Contract";
import Web3Contract, { createAbiItem } from "../../../web3/web3Contract";

const BondContractABI = [
  createAbiItem('getInvestorBond', ['address', 'uint256'], ['uint256', 'uint256', 'uint256', 'uint256']),
  createAbiItem('getInvestorBondsList', ['address'], ['uint256[]']),
  createAbiItem('getInvestorBondsCount', ['address'], ['uint256']),
]

class BondContract extends Erc20Contract {
  constructor(address) {
    super(BondContractABI, address, '')
  }

  investorBondsCount

  async loadInvestorBondsCount(investor) {
    const investorBondsCount = await this.call('getInvestorBondsCount', [investor])
    this.investorBondsCount = investorBondsCount
    this.emit(Web3Contract.UPDATE_ACCOUNT)
  } 
}

export default BondContract