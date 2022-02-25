import ColPoolProvider from "./providers/colPool-provider"

import PledgeView from "./views/pledge-view"

const PledgeModule = () => {

  return (        
    <ColPoolProvider>        
      <PledgeView />        
    </ColPoolProvider>    
  )
}

export default PledgeModule