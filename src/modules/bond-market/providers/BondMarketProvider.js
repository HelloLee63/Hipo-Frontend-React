import { createContext, useContext } from "react";
import { InvariantContext } from "../../../utils/context";

const Context = createContext(InvariantContext('BondMarketProvider'))

export function useBondMarket() {
  return useContext(Context)
}

const BondMarketProvider = ({ children }) => {  

  console.log('Bond Market Provider is rendered');

  const value = {

  }

  return (
    <Context.Provider value={value}>
      { children }
    </Context.Provider>
  )
}

export default BondMarketProvider