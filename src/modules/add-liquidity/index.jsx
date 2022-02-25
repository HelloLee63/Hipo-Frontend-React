import LiquidityPoolProvider from "./providers/liquidity-pool-provider"
import AddLiquidityView from "./views/add-liquidity"

const AddLiquidityModule = () => {
  return (   
    <LiquidityPoolProvider>
      <AddLiquidityView />
    </LiquidityPoolProvider>
  )
}

export default AddLiquidityModule