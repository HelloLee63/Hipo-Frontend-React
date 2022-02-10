import DebtPoolProvider from "./providers/debt-pool-provider"
import DebtPoolsProvider from "./providers/debt-pools-provider"
import IssueWizards from "./views/issue-bond"

const IssueModule = () => {
  return (    
    <DebtPoolsProvider>
      <DebtPoolProvider>           
        <IssueWizards />
      </DebtPoolProvider>
    </DebtPoolsProvider>       
  )
}

export default IssueModule