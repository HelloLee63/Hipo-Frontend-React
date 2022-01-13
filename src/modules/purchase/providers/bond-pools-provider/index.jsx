import { createContext, useContext, useEffect, useMemo } from "react";
import { InvariantContext } from "../../../../utils/context";

const Context = createContext(InvariantContext('BondPoolsProvider'))

export function useBondPools() {
  return useContext(Context)
}

const BondPoolsProvider = props => {
  const { children } = props

  const bondPools = useMemo(
    {

    },
    {

    },
  )

  useEffect(() => {

  })


}

export default BondPoolsProvider