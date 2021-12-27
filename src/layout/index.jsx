import { lazy } from "react";
import { useNetwork } from "../components/providers/networkProvider";
import { HeaderWrapper } from "./components/layout-header/HeaderWrapper";
import AsideDefault from "./components/layout-side-nav/index";
import { PageDataProvider } from './core/PageData';
import Toolbar from './components/layout-toolbar/Toolbar'


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
        <PageDataProvider>
            <div className='page d-flex flex-row flex-column-fluid'>
                <AsideDefault />
                <div className='wrapper d-flex flex-column flex-row-fluid' id='kt_wrapper'> 
                    <HeaderWrapper />
                    <div id='kt_content' className='content d-flex flex-column flex-column-fluid'>
                        {/* <Toolbar /> */}
                        <div className='post d-flex flex-column-fluid' id='kt_post'>
                            {/* <Content>{children}</Content> */}
                        </div>
                    </div>
                </div>               
            </div>
        </PageDataProvider>
        
    )
}

export default LayoutView