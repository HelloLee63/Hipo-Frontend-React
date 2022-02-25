import { BigNumber } from "ethers";
import Erc20Contract from "../erc20Contract";
import Web3Contract, { createAbiItem } from "../web3Contract";

const BondTokenContractABI = [
  createAbiItem('getInvestorBond', ['address', 'uint256'], ['uint256', 'uint256', 'uint256', 'uint256']),
  createAbiItem('getInvestorBondsList', ['address'], ['uint256[]']),
  createAbiItem('getInvestorBondsCount', ['address'], ['uint256']),
]

class BondTokenContract extends Erc20Contract {

  counts

  constructor(address) {
    super(BondTokenContractABI, address, '')
  }

  get count() {
    return this.getCountOf(this.account);
  }

  getCountOf(address = this.account) {
    return address ? this.counts.get(address) : undefined;
  }

  async loadInvestorBondsCount(investor = this.account) {

    if(!investor) {
      return Promise.reject(new Error('Invalid owner address!'));
    }

    const investorBondsCount = await this.call('getInvestorBondsCount', [investor])
    const count = new BigNumber(investorBondsCount)

    this.counts.set(investor, count)

    this.emit(Web3Contract.UPDATE_DATA)
  } 
}

export default BondTokenContract