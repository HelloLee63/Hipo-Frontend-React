import BondPoolProvider from "../purchase/providers/bond-pool-provider"
import BondsView from "./views"

const BondsModule = () => {

  return (
    <BondPoolProvider>
      <BondsView />
    </BondPoolProvider>    
  )
}

export default BondsModule