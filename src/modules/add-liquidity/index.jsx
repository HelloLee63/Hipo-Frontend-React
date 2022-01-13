import KnownTokensProvider from "../../components/providers/knownTokensProvider"
import TokensProvider from "../../components/providers/tokensProvider"

import ContractManagerProvider from "../../web3/components/contractManagerProvider"
import LiquidityPoolProvider from "./providers/liquidity-pool-provider"
import LiquidityPoolsProvider from "./providers/liquidity-pools-provider"
import AddLiquidityView from "./views/add-liquidity"


const AddLiquidityModule = () => {
  return (
    <ContractManagerProvider>
      <TokensProvider>
        <KnownTokensProvider>
          <LiquidityPoolsProvider>
            <LiquidityPoolProvider assetAddress={'0x232bB0bBf8274342fB044FF40e716bf887fb9214'} duration={300}>
              <AddLiquidityView />
            </LiquidityPoolProvider>
          </LiquidityPoolsProvider>
        </KnownTokensProvider>
      </TokensProvider>
    </ContractManagerProvider>
  )
}

export default AddLiquidityModule