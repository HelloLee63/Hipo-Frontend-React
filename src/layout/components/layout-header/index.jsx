import s from './s.module.scss'
import classNames from 'classnames'
import { useGeneral } from '../../../components/providers/generalProvider';

const LayoutHeader = () => {
    const { navOpen, setNavOpen } = useGeneral();
    const { activeNetwork } = useNetwork();

}