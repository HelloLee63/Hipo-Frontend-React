import { createContext, useContext } from "react";
import { InvariantContext } from "../../../../utils/context";


const Context = createContext(InvariantContext('BondPoolProvider'))

export function useBondPool() {
  return useContext(Context)
}

const BondPoolProvider = props => {
  const { children } = props

  
}