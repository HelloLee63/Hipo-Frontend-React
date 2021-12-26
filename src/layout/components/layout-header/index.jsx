import s from './s.module.scss'
import classNames from 'classnames'
import { Route, Routes } from 'react-router-dom';
import { useGeneral } from '../../../components/providers/generalProvider';
import {  useNetwork } from '../../../components/providers/networkProvider';
import IconOld from '../../../components/custom/icon'
import { Icon } from '../../../components/icon'
import { Text } from '../../../components/custom/typography';

const LayoutHeader = () => {
    const { navOpen, setNavOpen }  = useGeneral();   
    const { activeNetwork } = useNetwork();

    return (
        <header>
            <button type="button" onClick={ () => setNavOpen(!navOpen) }>
                { navOpen ? "Good" : "Bad" }
                <IconOld />
                <Icon name="arrow" rotate={navOpen ? 180 : 0} size = {12} className = "hidden-mobile hidden-tablet" />
            </button>
            <IconOld name="bond-square-token" className={s.logo} />
            <Text type="h3" weight="semibold" color="primary" className={s.title}>
                <Routes>
                    <Route path="/pledge">Pledge</Route>
                    <Route path="/issue">Issue</Route>
                    <Route path="/phurchase">Purchase</Route>
                    <Route path="/add-liquidity">Add Liquidity</Route>
                    <Route path="/collaterals">Collaterals</Route>
                    <Route path="/bonds">Bonds</Route>
                    <Route path="/pools">Pools</Route>
                    <Route path="*">Hipo</Route>
                </Routes>
            </Text>
        </header>
    )

}

export default LayoutHeader