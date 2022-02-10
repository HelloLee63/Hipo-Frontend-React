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
                icon='/media/sidemenu/home.svg'
                title = 'Bond Market'
                fontIcon='bi-app-indicator'
            />
            <div className='menu-item'>
                <div className='menu-content pt-2 pb-2'>
                    <span className='menu-section text-muted text-uppercase fs-8 ls-1'>transaction</span>
                </div>
            </div>
            <AsideMenuItem
                to='/pledge'
                icon='/media/sidemenu/Pledge.svg'
                title='Pledge'
                // fontIcon='bi-layers'
            />
            <AsideMenuItem
                to='/issue'
                icon='/media/sidemenu/issue-bonds.svg'
                title='Issue Bonds'
                fontIcon='bi-layers'
            /> 
            <AsideMenuItem
                to='/purchase'
                icon='/media/sidemenu/purchase-bonds.svg'
                title='Purchase Bonds'
                fontIcon='bi-layers'
            /> 
            <AsideMenuItem
                to='/addliquidity'
                icon='/media/sidemenu/add-liquidity.svg'
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
                icon='/media/sidemenu/collaterals.svg'
                title='Collaterals'
                fontIcon='bi-layers'
            /> 
            <AsideMenuItem
                to='/bonds'
                icon='/media/sidemenu/bonds.svg'
                title='Bonds'
                fontIcon='bi-layers'
            /> 
            <AsideMenuItem
                to='/pools'
                icon='/media/sidemenu/pools.svg'
                title='Pools'
                fontIcon='bi-layers'
            />        
        </>
    )
}