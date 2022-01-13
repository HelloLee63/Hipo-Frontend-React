import KnownTokensProvider from "../../components/providers/knownTokensProvider"
import TokensProvider from "../../components/providers/tokensProvider"
import ContractManagerProvider from "../../web3/components/contractManagerProvider"
import ColPoolsProvider from "./providers/colPools-provider"
import PledgeProvider from "./providers/PledgeProvider"
import PledgeWizards from "./views/pledge-view"

const PledgeModule = () => {
  return (
    <ContractManagerProvider>
      <TokensProvider>
        <KnownTokensProvider>
          <ColPoolsProvider>
            <PledgeProvider>
              <PledgeWizards />
            </PledgeProvider>
          </ColPoolsProvider>
        </KnownTokensProvider>
      </TokensProvider>
    </ContractManagerProvider>
  )
}

export default PledgeModule