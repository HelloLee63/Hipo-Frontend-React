import { lazy } from "react";
import { useNetwork } from "../components/providers/networkProvider";
import { HeaderWrapper } from "./components/layout-header/HeaderWrapper";
import AsideDefault from "./components/layout-side-nav/index";


// const PledgeView = lazy(() => import('modules/pledge'))
// const IssueView = lazy(() => import ('modules/issue'))
// const PurchaseView = lazy(() => import ('modules/purchase'))
// const AddLiquidityView = lazy(() => import ('modules/add-liquidity'))
// const CollateralsView = lazy(() => import ('modules/collaterals'))
// const BondsView = lazy(() => import ('modules/bonds'))
// const PoolsView = lazy(() => import ('modules/pools'))

const LayoutView = () => {
    const { activeNetwork } = useNetwork();
    // const { features } = useConfig();

    return (
        <div className='page d-flex flex-row flex-column-fluid'>
            <AsideDefault />
            <HeaderWrapper />
        </div>
        
    )
}

export default LayoutView