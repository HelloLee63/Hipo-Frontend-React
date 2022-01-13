import { createContext, useContext } from "react";
import { useConfig } from "../../../components/providers/configProvider";
import ReservesListContract from "../../contracts/ReservesListContract";
import { useContract } from "../contractManagerProvider";

const Context = createContext('ProtocolDataProvider')

export function useProtocolData() {
  return useContext(Context)
}

function useReservesListContract(address) {
  return useContract(address, () => {
    return new ReservesListContract(address)
  })
}

const ProtocolDataProvider = ({ children }) => {
  const config = useConfig()
  
  const reservesListContract = useReservesListContract(config.contracts.financingPool?.financingPool)
  // const reserves = reservesListContract.getReservesList()

  const value = {
    // reserves,
  }

  return (
    <Context.Provider value={ value }>{children}</Context.Provider>
  )
}

export default ProtocolDataProvider