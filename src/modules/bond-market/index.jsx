import Bonds from "./views/Bonds"
import Overview from "./views/Overview"

const BondMarket = () => {
  return (
    <div className="d-flex flex-column">
      <h2 className='pb-5'>Overview</h2>
      <Overview />
      <h2>Bonds</h2>
      <Bonds className='pt-5'/>
    </div>
  )
}

export default BondMarket