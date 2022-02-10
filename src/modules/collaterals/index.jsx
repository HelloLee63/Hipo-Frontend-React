import CollateralsProvider from "./providers/collateral-provider"
import CollateralsView from "./views"

const Collaterals = () => {

  return (
    <CollateralsProvider>
      <CollateralsView />
    </CollateralsProvider>
  )
}

export default Collaterals