import { Link } from "react-router-dom"
import clsx from "clsx"
import { useLayout } from '../../core'


const AsideDefault = () => {
    const {config, classes} = useLayout()

    return (
        <div 
            id='kt_aside'
            className={clsx('aside', classes.aside.join(' '))}
            className="aside"
            data-kt-drawer='true'
            data-kt-drawer-name='aside'
            data-kt-drawer-activate='{default: true, lg: false}'
            data-kt-drawer-overlay='true'
            data-kt-drawer-width="{default:'200px', '300px': '250px'}"
            data-kt-drawer-direction='start'
            data-kt-drawer-toggle='#kt_aside_mobile_toggle'
        >
            {/* begin::Brand */}
            <div className='aside-logo flex-column-auto' id='kt_aside_logo'>
                <Link to='#'>
                    <img 
                        alt='logo'
                        className="h-25px logo"
                        src='../../../media/logos/logo.svg'
                    />
                </Link>
            </div>
            <div className='aside-menu flex-column-fluid'>
                {/* <AsideMenu asideMenuCSSClasses={classes.asideMenu} /> */}
            </div>
        </div>
    )
}

export default AsideDefault