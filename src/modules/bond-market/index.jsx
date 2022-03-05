// import BondMarketProvider from "./providers/BondMarketProvider"
// // import Bonds from "./views/Bonds"
// // import Overview from "./views/Overview"

// import { Route, Routes } from "react-router-dom"

// // import BondMarket from "../modules/bond-market"
// // import BondDetails from "../modules/bond-market/views/BondDetails"
// import BondMarketView from "./views/market-view"
// import BondDetailsView from "./views/bond-details-view"
// import { usePools } from "../../components/providers/poolsProvider"
// import { MasterLayout } from "../../layout"
// import { PageTitle } from "../../layout/core"



// const BondMarket = () => {
//   return (
//     <BondMarketProvider>
//       <div className="d-flex flex-column">
//         <h3 className='pb-5'>Overview</h3>
//         <Overview />
//         <h3 className="pb-5">Bonds</h3>
//         <Bonds />
//       </div>
//     </BondMarketProvider>
//   )
// }

// export default BondMarket





// const BondMarketModule = () => {

//   const { bondPools } = usePools()

//   const dashboardBreadCrumbs = [
//     {
//       title: 'DASHBOARD',
//       path: '/',
//       isSeparator: false,
//       isActive: false,
//     },
//     {
//       title: '',
//       path: '',
//       isSeparator: true,
//       isActive: false,
//     },
//   ]

//   return (
//     <BondMarketProvider>
//       <Routes>
//         <Route path='/bondmarket' element={<MasterLayout><PageTitle breadcrumbs={dashboardBreadCrumbs}>Bonds Market</PageTitle><BondMarketView /></MasterLayout>} />
//         <Route path='/'  element={<MasterLayout><PageTitle breadcrumbs={dashboardBreadCrumbs}>Bonds Market</PageTitle><BondMarketView /></MasterLayout>} />
//         {bondPools.map(pool => (
//         <Route key={pool.bToken.symbol} path={`bondmarket/${pool.bondAsset.symbol.toLowerCase()}${pool.duration.duration}`} element={<MasterLayout><PageTitle>Bond Market</PageTitle><BondDetailsView pool={pool} /></MasterLayout>} />))}        
//       </Routes>
//     </BondMarketProvider>
//   )
// }

// export { BondMarketModule }