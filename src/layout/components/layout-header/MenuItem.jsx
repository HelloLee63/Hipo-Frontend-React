import clsx from "clsx"
import { Link, useLocation } from "react-router-dom"
import { KTSVG } from '../../../_metronic/helpers/components/KTSVG.tsx'
import { checkIsActive } from '../../../_metronic/helpers/RouterHelpers.ts'


const MenuItem = ({ 
    to, 
    title, 
    icon, 
    fontIcon, 
    hasArrow = false,
    hasBullet = false,
}) => {
    const {pathname} = useLocation

    return (
        <div className='menu-item me-lg-1'>
            <Link
                className={clsx('menu-link py-3', {
                    active: checkIsActive(pathname, to),
                })}
                to={to}
            >
                {hasBullet && (
                    <span className='menu-bullet'>
                        <span className='bullet bullet-dot'></span>
                    </span>
                )}

                {icon && (
                    <span className='menu-icon'>
                        <KTSVG path={icon} className='svg-icon-2' />
                    </span>
                )}

                {fontIcon && (
                    <span className='menu-icon'>
                        <i className={clsx('bi fs-3', fontIcon)}></i>
                    </span>
                )}

                <span className='menu-title'>{title}</span>

                {hasArrow && <span className='menu-arrow'></span>}
            </Link>
        </div>
    )
}

export default MenuItem