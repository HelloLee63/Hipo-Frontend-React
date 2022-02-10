import BondPoolProvider from "./providers/bond-pool-provider"
import BondPoolsProvider from "./providers/bond-pools-provider"
import PurchaseView from "./views/purchase-view"

const PurchaseBondModule = () => {
  return(
    <BondPoolsProvider>
      <BondPoolProvider>
        <PurchaseView />
      </BondPoolProvider>
    </BondPoolsProvider>
  )
}

export default PurchaseBondModule