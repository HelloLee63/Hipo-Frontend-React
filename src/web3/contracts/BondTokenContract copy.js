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
  bonds
  bondData
  bondDatas

  constructor(address) {
    super(BondTokenContractABI, address, '')

    this.counts = new Map()
    this.lists = new Map()
    this.bondDatas = new Map()
    this.bonds = new Array()
    this.bondData = new Array()

    this.on(Web3Contract.UPDATE_ACCOUNT, () => {
      this.counts.clear()
      this.lists.clear()
      this.emit(Web3Contract.UPDATE_DATA)
    })
  }

  get count() {
    return this.getCountOf(this.account);
  }

  get list() {
    return this.getListOf(this.account)
  }

  // getBondData(address = this.account) {
  //   return address ? this.bondDatas.get(address) : undefined
  // }

  getCountOf(address = this.account) {
    return address ? this.counts.get(address) : undefined;
  }

  getListOf(address = this.account) {
    return address ? this.lists.get(address) : undefined
  }

  async loadInvestorBondsCount(investor = this.account) {

    if(!investor) {
      return Promise.reject(new Error('Invalid owner address!'));
    }
    const investorBondsCount = await this.call('getInvestorBondsCount', [investor])
    this.counts.set(investor, investorBondsCount)
    this.emit(Web3Contract.UPDATE_DATA)
  }
  
  async loadInvestorBondsList(investor = this.account) {
    if (!investor) {
      return Promise.reject(new Error('Invalid owner address!'))
    }

    const ids = await this.call('getInvestorBondsList', [investor])

    if(ids.length > 0) {
      this.lists.set(investor, ids)
      this.emit(Web3Contract.UPDATE_DATA)
    }
  }

  // async loadInvestorBondsData(investor = this.account) {

  //   if (!investor) {
  //     return Promise.reject(new Error('Invalid owner address!'))
  //   }

  //   let bondObj = new Object()
  //   const ids = await this.getListsOf(investor)

  //   for (let i = 0; i < ids?.length; i++) {

  //     bondObj = {}

  //     const data = await this.call('getInvestorBond', [investor, ids[i]])
  //     const bondData = Object.values(data)

  //     if (data) {
  //       bondObj.investor = investor
  //       bondObj.bondData = bondData
  //       bondObj.id = bondData[3]

  //       if(this.bonds.length === 0) {
  //         this.bonds.push(bondObj)
  //       }

  //       if (this.bonds.length > 0) {

  //         this.bonds.forEach(obj => {
  //           if (obj.id === bondData[3] && obj.investor === investor) {
              
  //             obj.id = bondData[3]
  //             obj.investor = investor
  //             obj.bondData = bondData              
  //           }

  //           if (obj.id !== bondData[3] || obj.investor.toString() !== investor.toString()) {
  //             this.bonds.push(bondObj)
  //           }
  //         })          
  //       }

  //       this.emit(Web3Contract.UPDATE_DATA)
  //     }
  //   }  
  // }

  // async loadBondsData(investor = this.account) {

  //   if (!investor) {
  //     return Promise.reject(new Error('Invalid owner address!'))
  //   }

  //   const ids = await this.getListsOf(investor)

  //   if (ids.length > 0) {

  //     let datas = {}
  //     for (let i = 0; i < ids.length; i++) {
  //       const data = await this.call('getInvestorBond', [investor, ids[i]])
  //       const bondData = Object.values(data)
  //       datas.investor = investor
  //       datas.bondData = bondData
  //       datas.id = bondData[3]
  //     } 


  //     console.log('datas is ', datas);
  //   } 
  // }

  async loadBondData(investor = this.account, id) {

    if (!investor) {
      return Promise.reject(new Error('Invalid owner address!'))
    }
    
    const data = await this.call('getInvestorBond', [investor, id])
    const bondData = Object.values(data)
    this.bondData = bondData

    if (bondData) {
      this.bondDatas.set(investor, bondData);
      this.emit(Web3Contract.UPDATE_DATA);
    } 
  }
}

export default BondTokenContract