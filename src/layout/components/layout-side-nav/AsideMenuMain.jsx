import AsideMenuItem from './AsideMenuItem'

export function AsideMenuMain() {

  return (
    <>
      <div className='menu-item'>
        <div className='menu-content pt-2 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>dashboard</span>
        </div>
      </div>
      <AsideMenuItem
        to='/bondmarket'
        icon1='/media/sidemenu/home.svg'
        icon2='/media/sidemenu/home-active.svg'
        title = 'Bond Market'
      />
      <div className='menu-item'>
        <div className='menu-content pt-2 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>transaction</span>
        </div>
      </div>
      <AsideMenuItem
        to='/pledge'
        icon1='/media/sidemenu/Pledge.svg'
        icon2='/media/sidemenu/pledge-active.svg'
        title='Pledge'          
      />
      <AsideMenuItem
        to='/issue'
        icon1='/media/sidemenu/issue-bonds.svg'
        icon2='/media/sidemenu/issue-active.svg'
        title='Issue Bonds'
      /> 
      <AsideMenuItem
        to='/purchase'
        icon1='/media/sidemenu/purchase-bonds.svg'
        icon2='/media/sidemenu/purchase-active.svg'
        title='Purchase Bonds'
        fontIcon='bi-layers'
      /> 
      <AsideMenuItem
        to='/addliquidity'
        icon1='/media/sidemenu/add-liquidity.svg'
        icon2='/media/sidemenu/addliquidity-active.svg'
        title='Add Liquidity'
        fontIcon='bi-layers'
      />
      <div className='menu-item'>
        <div className='menu-content pt-2 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>my hipo</span>
        </div>
      </div> 
      <AsideMenuItem
        to='/collaterals'
        icon1='/media/sidemenu/collaterals.svg'
        icon2='/media/sidemenu/collaterals-active.svg'
        title='Collaterals'
        fontIcon='bi-layers'
      /> 
      <AsideMenuItem
        to='/bonds'
        icon1='/media/sidemenu/bonds.svg'
        icon2='/media/sidemenu/bonds-active.svg'
        title='Bonds'
      /> 
      <AsideMenuItem
        to='/pools'
        icon1='/media/sidemenu/pools.svg'
        icon2='/media/sidemenu/pools-active.svg'
        title='Pools'
      />        
    </>
  )
}