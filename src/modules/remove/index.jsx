import LiquidityPoolProvider from "../add-liquidity/providers/liquidity-pool-provider"
import RemoveLiquidityView from "./views"

const RemoveLiquidityModule = () => {
    return (
      <LiquidityPoolProvider>
        <RemoveLiquidityView />
      </LiquidityPoolProvider>
    )
}

export default RemoveLiquidityModule