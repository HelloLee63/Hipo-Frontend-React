import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { checkIsActive } from '../../../_metronic/helpers/RouterHelpers.ts'
import { KTSVG } from '../../../_metronic/helpers/components/KTSVG.tsx'
import clsx from 'clsx'

const AsideMenuItem = ({
    chiildren,
    to,
    title,
    icon,
    fontIcon,
    hasBullet = false,
  }) => {
      const {pathname} = useLocation()
      const isActive = checkIsActive(pathname, to)
        return (
            // <div className='menu-item'>
            //     <Link className={clsx('menu-link without-sub', {active: isActive})} to={to}>
            //         {hasBullet && (
            //             <span className='menu-bullet'>
            //                 <span className='bullet bullet-dot'></span>
            //             </span>
            //         )}
            //         {icon && aside.menuIcon === 'svg' && (
            //             <span className='menu-icon'>
            //                 <KTSVG path={icon} className='svg-icon-2' />
            //             </span>
            //         )}
            //         {fontIcon && aside.menuIcon === 'font' && <i className={clsx('bi fs-3', fontIcon)}></i>}
            //         <span className='menu-title'>{title}</span>
            //     </Link>
            //     {chiildren}            
            // </div>

            <div className='menu-item'>
                <Link className={clsx('menu-link without-sub', {active: isActive})} to={to}>                    
                    {/* <span className='menu-bullet'>
                        <span className='bullet bullet-dot'></span>
                    </span>                    */}
                    <span className='menu-icon'>
                        <KTSVG path={icon} className='svg-icon-2' />
                    </span>               
                    <span className='menu-title' id='aside-item-title'>{title}</span>
                </Link>
                {chiildren}            
            </div>
    )
}

export default AsideMenuItem
