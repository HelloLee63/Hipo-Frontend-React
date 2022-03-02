import BigNumber from "bignumber.js";
import Erc20Contract from "../erc20Contract";
import Web3Contract, { createAbiItem } from "../web3Contract";

const BondTokenContractABI = [
  createAbiItem('getInvestorBond', ['address', 'uint256'], ['uint256', 'uint256', 'uint256', 'uint256']),
  createAbiItem('getInvestorBondsList', ['address'], ['uint256[]']),
  createAbiItem('getInvestorBondsCount', ['address'], ['uint256']),
]

class BondTokenContract extends Erc20Contract {

  counts
  lists
  // bondObj
  bonds

  constructor(address) {
    super(BondTokenContractABI, address, '')

    this.counts = new Map()
    this.lists = new Map()
    this.bonds = new Array()
    // this.bondObj = new Object()


    this.on(Web3Contract.UPDATE_ACCOUNT, () => {
      this.counts.clear()
      this.lists.clear()
      this.emit(Web3Contract.UPDATE_DATA)
    })
  }

  get count() {
    return this.getCountOf(this.account);
  }

  getCountOf(address = this.account) {
    return address ? this.counts.get(address) : undefined;
  }

  getListsOf(address = this.account) {
    return address ? this.lists.get(address) : undefined
  }

  async loadInvestorBondsCount(investor = this.account) {

    if(!investor) {
      return Promise.reject(new Error('Invalid owner address!'));
    }

    const investorBondsCount = await this.call('getInvestorBondsCount', [investor])

    this.counts.set(investor, investorBondsCount)
    // console.log(this.counts);

    this.emit(Web3Contract.UPDATE_DATA)
  }
  
  async loadInvestorBondsList(investor = this.account) {
    if (!investor) {
      return Promise.reject(new Error('Invalid owner address!'))
    }

    const ids = await this.call('getInvestorBondsList', [investor])

    if(ids.length > 0) {
      this.lists.set(investor, ids)
      // console.log(this.lists);

      this.emit(Web3Contract.UPDATE_DATA)
    }
  }

  async loadInvestorBondsData(investor = this.account) {

    if (!investor) {
      return Promise.reject(new Error('Invalid owner address!'))
    }

    let bondObj = new Object()
    // console.log(bondObj);

    const ids = this.getListsOf(investor)
    // console.log(ids);

    for (let i = 0; i < ids?.length; i++) {

      // console.log(bondObj);
      bondObj = {}
      // console.log(bondObj);

      const data = await this.call('getInvestorBond', [investor, ids[i]])
      const bondData = Object.values(data)
      // console.log(bondObj);
      // console.log(this.bonds);

      if (data) {
        bondObj.investor = investor
        bondObj.bondData = bondData
        bondObj.id = bondData[3]

        if(this.bonds.length === 0) {

          // console.log('this is 000');
          // console.log(this.bonds.length);
          // console.log(ids[i]);
          this.bonds.push(bondObj)
        }

        if (this.bonds.length > 0) {
          // console.log(this.bonds.length);
          this.bonds.forEach(obj => {
            if (obj.id === bondData[3] && obj.investor === investor) {
              
              obj.id = bondData[3]
              obj.investor = investor
              obj.bondData = bondData
              // console.log(this.bonds.length);
              
            }

            if (obj.id !== bondData[3] || obj.investor.toString() !== investor.toString()) {
              // console.log(obj.id);
              // console.log(bondData[3]);
              // console.log(obj.id !== bondData[3]);

              // console.log(obj.investor);
              // console.log(investor);
              // console.log(obj.investor !== investor);
              this.bonds.push(bondObj)
              // console.log(this.bonds);
            }
          })
          
        }
        // console.log(this.bonds.length);
        // console.log(this.bonds);
        this.emit(Web3Contract.UPDATE_DATA)
      }
    }  
  }
}

export default BondTokenContract