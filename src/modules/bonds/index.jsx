import DebtPoolProvider from "../issue/providers/debt-pool-provider"
import BondPoolProvider from "../purchase/providers/bond-pool-provider"
import BondsView from "./views"
import DebtsView from "./views/debts"

const BondsModule = () => {

  return (    
    <BondsView />
  )
}

export default BondsModule

const DebtsModule = () => {
  return(
    <DebtsView />
  )
}

export { DebtsModule }