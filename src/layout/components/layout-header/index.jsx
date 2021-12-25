import s from './s.module.scss'
import classNames from 'classnames'
import { useGeneral } from '../../../components/providers/generalProvider';
import {  useNetwork } from '../../../components/providers/networkProvider';
import IconOld from '../../../components/custom/icon'
import { Icon } from '../../../components/icon'

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
        </header>
    )

}

export default LayoutHeader