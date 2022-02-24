import Bonds from "./views/Bonds"
import Overview from "./views/Overview"

const BondMarket = () => {
  return (
    <>
      <div className="d-flex flex-column">
        <h3 className='pb-5'>Overview</h3>
        <Overview />
        <h3 className="pb-5">Bonds</h3>
        <Bonds />
      </div>
    </>
  )
}

export default BondMarket