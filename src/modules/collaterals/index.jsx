import ColPoolProvider from "../pledge/providers/colPool-provider"
import ColPoolsProvider from "../pledge/providers/colPools-provider"
import CollateralsView from "./views/collaterals-view"

const Collaterals = () => {

  return (
    <ColPoolsProvider>
      <ColPoolProvider>
        <CollateralsView />
      </ColPoolProvider>
    </ColPoolsProvider>
  )
}

export default Collaterals