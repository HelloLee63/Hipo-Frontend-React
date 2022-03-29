import BondsList from "../../components/bonds-list"
import MarketOverview from "../../components/market-overview"

const BondMarketView = () => {

  return (
    <>
      <div className="d-flex flex-column" style={{fontFamily: 'Montserrat-Bold', color: '#333333'}}>
        <h5  className='pb-5'>Overview</h5>
        <MarketOverview />
        <h5 className="pb-5">Bonds</h5>
        <BondsList />
      </div>
    </>
  )
}

export default BondMarketView