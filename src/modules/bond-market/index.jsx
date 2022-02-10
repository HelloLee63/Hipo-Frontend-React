import BondMarketProvider from "./providers/BondMarketProvider"
import Bonds from "./views/Bonds"
import Overview from "./views/Overview"

const BondMarket = () => {
  return (
    <BondMarketProvider>
      <div className="d-flex flex-column">
        <h3 className='pb-5'>Overview</h3>
        <Overview />
        <h3 className="pb-5">Bonds</h3>
        <Bonds />
      </div>
    </BondMarketProvider>
  )
}

export default BondMarket