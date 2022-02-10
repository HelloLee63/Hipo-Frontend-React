import DebtTokenProvider from "../../web3/components/providers/DebtTokenProvider"
import BondsView from "./views"


const BondsModule = props => {

  return (
    <DebtTokenProvider>
      <BondsView />
    </DebtTokenProvider>
  )
}

export default BondsModule