import ColPoolProvider from "./providers/colPool-provider"
import ColPoolsProvider from "./providers/colPools-provider"
import PledgeView from "./views/pledge-view"

const PledgeModule = () => {

  return (    
    <ColPoolsProvider>
      <ColPoolProvider>        
        <PledgeView />        
      </ColPoolProvider>
    </ColPoolsProvider>  
  )
}

export default PledgeModule