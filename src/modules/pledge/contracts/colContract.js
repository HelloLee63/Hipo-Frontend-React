import Web3Contract, { createAbiItem } from "../../../web3/web3Contract";

const ABI = [
  createAbiItem('', [], []),
  createAbiItem('', [], []),
  createAbiItem('', [], []),
  createAbiItem('', [], []),
  createAbiItem('', [], []),
  createAbiItem('', [], []),
  createAbiItem('', [], []),
]

export class ColContract extends Web3Contract {
  constructor(colAddress) {
    super(ABI, colAddress, '')
  }

}