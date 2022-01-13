import Web3Contract, { AbiTuple, AbiTupleArray, createAbiItem } from "../web3Contract";


const ReservesListABI = [createAbiItem('getReservesList', [], [new AbiTupleArray(['address', 'uint256'])])]

class ReservesListContract extends Web3Contract {
  constructor(address) {
    super(ReservesListABI, address, '')
  }

  reserves

  async getReservesList() {
    const reserves = await this.call('getReservesList', [])
    this.reserves = reserves
    this. emit(Web3Contract.UPDATE_DATA)
    console.log(reserves);
  }
}

export default ReservesListContract