import { createContext, useContext } from "react";
import { useConfig } from "../../../components/providers/configProvider";
import { InvariantContext } from "../../../utils/context";
import FinancingPoolContract from "../../contracts/FinancingPoolContract";
import { useContract } from "../contractManagerProvider";

function useFinancingPoolContract(address) {
    return useContract(address, () => {
        return new FinancingPoolContract(address)
    })
}

const Context = createContext(InvariantContext('FinancingPoolProvider'))

export function useFinancingPool() {
    return useContext(Context)
}

const FinancingPoolProvider = props => {

    console.log('Financing Provider is rendered');
    const { children } = props
    const config = useConfig()

    const financingPoolContract = useFinancingPoolContract(config.contracts.financingPool.financingPool)

    const value = {
        financingPoolContract
    }

    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider> 
    )
}

export default FinancingPoolProvider