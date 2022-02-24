import BondPoolProvider from "./providers/bond-pool-provider"
import PurchaseView from "./views/purchase-view"

const PurchaseBondModule = () => {
  return(
    <BondPoolProvider>
      <PurchaseView />
    </BondPoolProvider>
  )
}

export default PurchaseBondModule