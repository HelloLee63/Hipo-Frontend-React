import { Link, useLocation } from 'react-router-dom'
import { checkIsActive } from '../../../_metronic/helpers/RouterHelpers.ts'
import { KTSVG } from '../../../_metronic/helpers/components/KTSVG.tsx'
import clsx from 'clsx'

const AsideMenuItem = ({
    to,
    title,
    icon
  }) => {
    const {pathname} = useLocation()
    const isActive = checkIsActive(pathname, to)
    return (
        <div className='menu-item'>
            <Link className={clsx('menu-link without-sub', {active: isActive})} to={to}>
                <span className='menu-icon'>
                    <KTSVG path={icon} className='svg-icon-2' />
                </span>               
                <span className='menu-title' >{title}</span>
            </Link>        
        </div>
    )
}

export default AsideMenuItem