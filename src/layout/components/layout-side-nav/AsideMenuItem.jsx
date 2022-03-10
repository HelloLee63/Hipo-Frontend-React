import { Link, useLocation } from 'react-router-dom'
import { checkIsActive } from '../../../_metronic/helpers/RouterHelpers.ts'
import clsx from 'clsx'
import { useState } from 'react'

const AsideMenuItem = ({to, title, icon1, icon2}) => {
  const {pathname} = useLocation()
  let isActive = checkIsActive(pathname, to)

  const [isMouseOver, setIsMouseOver] = useState(false)

  function handleMouseOver() {
    setIsMouseOver(() => true)
  }

  function handleMouseLeave() {
    setIsMouseOver(() => false)
  }

  return (
    <div onMouseMove={handleMouseOver}  onMouseLeave={handleMouseLeave} className='menu-item' style={{fontfamily: 'YuKyokasho Yoko'}} >
      <Link className={clsx('menu-link without-sub', {active: isActive})} to={to}>
        <span className='pe-5'>
          {isMouseOver ? <img src={icon2} className='svg-icon-2' /> : <img src={isActive ? icon2: icon1} className='svg-icon-2' />}
        </span>               
        <span className='menu-title' style={{fontFamily: 'YuKyokasho Yoko'}}>{title}</span>
      </Link>        
    </div>
  )
}

export default AsideMenuItem