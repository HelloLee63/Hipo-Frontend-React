import DebtPoolProvider from "../issue/providers/debt-pool-provider"
import BondPoolProvider from "../purchase/providers/bond-pool-provider"
import BondsView from "./views"
import DebtsView from "./views/debts"

const BondsModule = () => {

  return (
    <BondPoolProvider>
      <BondsView />
    </BondPoolProvider>    
  )
}

export default BondsModule

const DebtsModule = () => {
  return(
    <DebtPoolProvider>
      <DebtsView />
    </DebtPoolProvider>
  )
}

export { DebtsModule }