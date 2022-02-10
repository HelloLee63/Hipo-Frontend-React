import LiquidityPoolsProvider from "../add-liquidity/providers/liquidity-pools-provider"
import PoolsView from "./views"



const Pools = props => {

  return (
    <LiquidityPoolsProvider>
      <PoolsView />
    </LiquidityPoolsProvider>
  )
}

export default Pools