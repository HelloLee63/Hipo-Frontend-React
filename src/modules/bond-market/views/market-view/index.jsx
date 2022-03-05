import BondsList from "../../components/bonds-list"
import MarketOverview from "../../components/market-overview"

const BondMarketView = () => {
  return (
    <>
      <div className="d-flex flex-column">
        <h3 className='pb-5'>Overview</h3>
        <MarketOverview />
        <h3 className="pb-5">Bonds</h3>
        <BondsList />
      </div>
    </>
  )
}

export default BondMarketView