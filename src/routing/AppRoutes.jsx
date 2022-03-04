import { Route, Routes } from "react-router-dom"
import { usePools } from "../components/providers/poolsProvider"
import { MasterLayout } from "../layout"
import { PageTitle } from "../layout/core"
import { MasterInit } from "../layout/MasterInit"
import AddLiquidityModule from "../modules/add-liquidity"
import BondMarket from "../modules/bond-market"
import { useBondMarket } from "../modules/bond-market/providers/BondMarketProvider"
import BondDetails from "../modules/bond-market/views/BondDetails"
import BondsModule, { DebtsModule } from "../modules/bonds"
import DebtsView from "../modules/bonds/views/debts"
import Collaterals from "../modules/collaterals"
import IssueModule from "../modules/issue"
import PledgeModule from "../modules/pledge"
import Pools from "../modules/pools"
import PurchaseBondModule from "../modules/purchase"
import RedeemModule from "../modules/redeem"
import RemoveLiquidityModule from "../modules/remove"
import RepayModule from "../modules/repay"


const AppRoutes = () => {

  const bondMarkets = useBondMarket()
  const { bondPools } = usePools()

  const transactionBreadCrumbs = [
    {
      title: 'TRANSACTION',
      path: '/pledge',
      isSeparator: false,
      isActive: false,
    },
    {
      title: '',
      path: '',
      isSeparator: true,
      isActive: false,
    },
  ]

  const dashboardBreadCrumbs = [
    {
      title: 'DASHBOARD',
      path: '/',
      isSeparator: false,
      isActive: false,
    },
    {
      title: '',
      path: '',
      isSeparator: true,
      isActive: false,
    },
  ]

  const myHipoBreadCrumbs = [
    {
      title: 'MY HIPO',
      path: '/collaterals',
      isSeparator: false,
      isActive: false,
    },
    {
      title: '',
      path: '',
      isSeparator: true,
      isActive: false,
    },
  ]

  const bondsBreadCrumbs = [
    {
      title: 'MY HIPO',
      path: '/bonds',
      isSeparator: false,
      isActive: false,
    },
    {
      title: '',
      path: '',
      isSeparator: true,
      isActive: false,
    },
  ]

  const poolsBreadCrumbs = [
    {
      title: 'MY HIPO',
      path: '/pools',
      isSeparator: false,
      isActive: false,
    },
    {
      title: '',
      path: '',
      isSeparator: true,
      isActive: false,
    },
  ]

  const redeemBreadCrumbs = [
    {
      title: 'MY HIPO',
      path: 'collaterals/redeem',
      isSeparator: false,
      isActive: false,
    },
    {
      title: '',
      path: '',
      isSeparator: true,
      isActive: false,
    },
  ]

  return (
    <>
      <Routes>
        <Route path='/bondmarket' element={<MasterLayout><PageTitle breadcrumbs={dashboardBreadCrumbs}>Bonds Market</PageTitle><BondMarket /></MasterLayout>} />
        <Route path='/'  element={<MasterLayout><PageTitle breadcrumbs={dashboardBreadCrumbs}>Bonds Market</PageTitle><BondMarket /></MasterLayout>} />
        {bondPools.map(pool => (
        <Route key={pool.bToken.symbol} path={`bondmarket/${pool.bondAsset.symbol.toLowerCase()}${pool.duration.duration}`} element={<MasterLayout><PageTitle>Bond Market</PageTitle><BondDetails pool={pool} /></MasterLayout>} />))}
        <Route path='/pledge' element={<MasterLayout><PageTitle breadcrumbs={transactionBreadCrumbs}>Pledge</PageTitle><PledgeModule /></MasterLayout>} />
        <Route path='/issue' element={<MasterLayout><PageTitle breadcrumbs={transactionBreadCrumbs}>Issue</PageTitle><IssueModule /></MasterLayout>} />
        <Route path='/purchase' element={<MasterLayout><PageTitle breadcrumbs={transactionBreadCrumbs}>Purchase</PageTitle><PurchaseBondModule /></MasterLayout>} />
        <Route path='/addliquidity' element={<MasterLayout><PageTitle breadcrumbs={transactionBreadCrumbs}>Add Liquidity</PageTitle><AddLiquidityModule /></MasterLayout>} />
        <Route path='/collaterals' element={<MasterLayout><PageTitle breadcrumbs={myHipoBreadCrumbs}>Collaterals</PageTitle><Collaterals /></MasterLayout>} />
        <Route path='/bonds' element={<MasterLayout><PageTitle breadcrumbs={bondsBreadCrumbs}>Bonds</PageTitle><BondsModule /></MasterLayout>} />
        <Route path='/pools' element={<MasterLayout><PageTitle breadcrumbs={poolsBreadCrumbs}>Pools</PageTitle><Pools /></MasterLayout>} />
        <Route path='/redeem' element={<MasterLayout><PageTitle breadcrumbs={redeemBreadCrumbs}>Redeem</PageTitle><RedeemModule /></MasterLayout>} />
        <Route path='/debts' element={<MasterLayout><PageTitle breadcrumbs={redeemBreadCrumbs}>Withdraw</PageTitle><DebtsModule /></MasterLayout>} />
        <Route path='/repay' element={<MasterLayout><PageTitle breadcrumbs={redeemBreadCrumbs}>Repay</PageTitle><RepayModule /></MasterLayout>} />
        <Route path='/remove' element={<MasterLayout><PageTitle breadcrumbs={redeemBreadCrumbs}>Remove</PageTitle><RemoveLiquidityModule /></MasterLayout>} />
      </Routes>
      <MasterInit />
    </>
  )
}

export { AppRoutes }