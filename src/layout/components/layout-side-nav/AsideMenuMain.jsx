import AsideMenuItem from './AsideMenuItem'

export function AsideMenuMain() {

    return (
        <>
            <AsideMenuItem
                to='/dashboard'
                icon='/media/icons/duotune/art/art002.svg'
                title = 'Dashboard'
                fontIcon='bi-app-indicator'
            />
            <AsideMenuItem
                to='/pledge'
                icon='/media/icons/duotune/general/gen019.svg'
                title='Pledge'
                fontIcon='bi-layers'
            />
            <AsideMenuItem
                to='/issue'
                icon='/media/icons/duotune/general/gen019.svg'
                title='Issue Bonds'
                fontIcon='bi-layers'
            /> 
            <AsideMenuItem
                to='/purchase'
                icon='/media/icons/duotune/general/gen019.svg'
                title='Purchase Bonds'
                fontIcon='bi-layers'
            /> 
            <AsideMenuItem
                to='/addliquidity'
                icon='/media/icons/duotune/general/gen019.svg'
                title='Add Liquidity'
                fontIcon='bi-layers'
            /> 
            <AsideMenuItem
                to='/collaterals'
                icon='/media/icons/duotune/general/gen019.svg'
                title='Collaterals'
                fontIcon='bi-layers'
            /> 
            <AsideMenuItem
                to='/bonds'
                icon='/media/icons/duotune/general/gen019.svg'
                title='Bonds'
                fontIcon='bi-layers'
            /> 
            <AsideMenuItem
                to='/pools'
                icon='/media/icons/duotune/general/gen019.svg'
                title='Pools'
                fontIcon='bi-layers'
            />        
        </>
    )
}