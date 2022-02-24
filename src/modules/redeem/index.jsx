import ColPoolProvider from "../pledge/providers/colPool-provider"
import ColPoolsProvider from "../pledge/providers/colPools-provider"
import RedeemView from "./views/redeem-view"

const RedeemModule = () => {

  return (    
    <ColPoolsProvider>
      <ColPoolProvider>        
        <RedeemView />    
      </ColPoolProvider>
    </ColPoolsProvider>  
  )
}

export default RedeemModule