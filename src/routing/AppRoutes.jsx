import { Route, Routes } from "react-router-dom"
import { MasterLayout } from "../layout"
import { PageTitle } from "../layout/core"
import { MasterInit } from "../layout/MasterInit"
import AddLiquidityModule from "../modules/add-liquidity"
import BondMarket from "../modules/bond-market"
import IssueModule from "../modules/issue"
import PledgeModule from "../modules/pledge"
import PurchaseBondModule from "../modules/purchase"
import TestCss from "../testCss"
import TestUsePledge from "../testUsePledge"
import TestWeb3 from "../testWeb3"


const AppRoutes = () => {

  const accountBreadCrumbs = [
    {
      title: 'Account',
      path: '/crafted/account/overview',
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
        <Route path='/bondmarket' element={<MasterLayout><PageTitle breadcrumbs={accountBreadCrumbs}>Bond Market</PageTitle><BondMarket /></MasterLayout>} />
        <Route path='/' element={<MasterLayout><PageTitle breadcrumbs={accountBreadCrumbs}>Bond Market</PageTitle><BondMarket /></MasterLayout>} />
        <Route path='/error' element={<MasterLayout><TestUsePledge /></MasterLayout>} />
        {/* <>
          <MasterLayout>
            <PrivateRoutes />
          </MasterLayout>
        </> */}
        <Route path='/pledge' element={<MasterLayout><PageTitle breadcrumbs={accountBreadCrumbs}>Pledge</PageTitle><PledgeModule /></MasterLayout>} />
        <Route path='/issue' element={<MasterLayout><PageTitle breadcrumbs={accountBreadCrumbs}>Issue</PageTitle><IssueModule /></MasterLayout>} />
        <Route path='/purchase' element={<MasterLayout><PageTitle breadcrumbs={accountBreadCrumbs}>Purchase</PageTitle><PurchaseBondModule /></MasterLayout>} />
        <Route path='/addliquidity' element={<MasterLayout><PageTitle breadcrumbs={accountBreadCrumbs}>Add Liquidity</PageTitle><AddLiquidityModule /></MasterLayout>} />
        <Route path='/collaterals' element={<TestCss />} />
      </Routes>
      <MasterInit />
    </>
  )
}

export { AppRoutes }