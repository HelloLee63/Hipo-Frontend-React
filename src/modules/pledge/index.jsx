import TokensProvider from "../../components/providers/tokensProvider"
import PledgeProvider from "./providers/PledgeProvider"
import PledgeWizards from "./views/pledge-view"

const PledgeModule = () => {
  return (
    <TokensProvider>
      <PledgeProvider>
        <PledgeWizards />
      </PledgeProvider>
    </TokensProvider>
  )
}

export default PledgeModule