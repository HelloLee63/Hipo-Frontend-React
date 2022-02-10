import Web3Contract, { AbiTuple, AbiTupleArray, createAbiItem } from "../../../web3/web3Contract"

const ReservesListABI = [createAbiItem('getReservesList', [], [new AbiTupleArray(['address', 'uint256'])])]

class ReservesListContract extends Web3Contract {

  reservesMap

  constructor(address) {
    super(ReservesListABI, address, '')

    this.reservesMap = new Map()

    this.on(Web3Contract.UPDATE_DATA, () => {
      this.reservesMap.clear()
      this.emit(Web3Contract.UPDATE_DATA)
    })
  }

  reserves

  async loadReservesList() {
    const reserves = await this.call('getReservesList', [])

    // if(reserves) {
      this.reserves = reserves
      this. emit(Web3Contract.UPDATE_DATA)
      console.log(reserves);
    // }
  }
}

export default ReservesListContract