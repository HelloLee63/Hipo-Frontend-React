import { lazy } from "react";
import { useNetwork } from "../components/providers/networkProvider";


const PledgeView = lazy(() => import('modules/pledge'))
const IssueView = lazy(() => import ('modules/issue'))
const PurchaseView = lazy(() => import ('modules/purchase'))
const AddLiquidityView = lazy(() => import ('modules/add-liquidity'))
const Collaterals = lazy(() => import ('modules/collaterals'))
const Bonds = lazy(() => import ('modules/bonds'))
const Pools = lazy(() => import ('modules/pools'))

const LayoutView = () => {
    const { activeNetwork } = useNetwork();
    const { features } = useConfig();
}