import { Route, Routes } from "react-router-dom"
import { MasterLayout } from "../layout"
import { MasterInit } from "../layout/MasterInit"
import BondMarket from "../modules/bond-market"
import PledgeModule from "../modules/pledge"
import TestText from "../testText"
import TestUsePledge from "../testUsePledge"
import TestWeb3 from "../testWeb3"

const AppRoutes = () => {

  return (
    <>
      <Routes>
        <Route path='/bondmarket' element={<MasterLayout><BondMarket /></MasterLayout>} /> 
        <Route path='/' element={<MasterLayout />} />
        <Route path='/error' element={<MasterLayout><TestUsePledge /></MasterLayout>} />
        {/* <>
          <MasterLayout>
            <PrivateRoutes />
          </MasterLayout>
        </> */}
        <Route path='/pledge' element={<MasterLayout><PledgeModule /></MasterLayout>} />
      </Routes>
      <MasterInit />
    </>
  )
}

export { AppRoutes }