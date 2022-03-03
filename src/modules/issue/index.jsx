import DebtPoolProvider from "./providers/debt-pool-provider"
import IssueWizards from "./views/issue-bond"

const IssueModule = () => {
  return (        
    // <DebtPoolProvider>           
      <IssueWizards />
    // </DebtPoolProvider>
  )
}

export default IssueModule