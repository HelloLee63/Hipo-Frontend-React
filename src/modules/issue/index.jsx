import KnownTokensProvider from "../../components/providers/knownTokensProvider"
import TokensProvider from "../../components/providers/tokensProvider"
import ContractManagerProvider from "../../web3/components/contractManagerProvider"
import IssueWizards from "./views/issue-bond"

const IssueModule = () => {
  return (
    <ContractManagerProvider>
      <TokensProvider>
        <KnownTokensProvider>
          
            
              <IssueWizards />
            
        </KnownTokensProvider>
      </TokensProvider>
    </ContractManagerProvider>
  )
}

export default IssueModule