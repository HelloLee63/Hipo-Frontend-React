import Bonds from "./views/Bonds"
import Overview from "./views/Overview"

const BondMarket = () => {
  return (
    <div className="d-flex flex-column">
      <h1>Overview</h1>
      <Overview />
      <h1>Bonds</h1>
      <Bonds />
    </div>
  )
}

export default BondMarket