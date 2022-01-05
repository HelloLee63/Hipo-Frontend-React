import { Link } from "react-router-dom"
import { useLayout } from '../../core'
import AsideMenu from "./AsideMenu"
import clsx from "clsx"
import toAbsoluteUrl from "../../../_metronic/helpers/AssetHelpers"
import { KTSVG } from "../../../_metronic/helpers/components/KTSVG"


const AsideDefault = () => {
    const {config, classes} = useLayout()
    const { aside } = config

    // return (
    //     <div className={cn("aside", s.asideImg)}>
    //         {/* begin::Brand */}
    //         <div className={ s.logo }>
    //             <Link to='#'>
    //                 <img 
    //                     alt='logo'
    //                     className="h-40px logo"
    //                     src='../../../media/logos/logo.svg'
    //                 />
    //             </Link>
    //         </div>
    //         <div className='aside-menu flex-column-fluid'>
    //             <AsideMenu asideMenuCSSClasses={classes.asideMenu} />
    //         </div>
    //     </div>
    // )
    // return (
    //     <div className="aside d-flex flex-column">
    //         {/* begin::Brand */}
    //         <div className={s.logo}>
    //             <Link to='#'>
    //                 <img alt='logo' className="h-40px" src='../../../media/logos/logo.svg'/>
    //             </Link>
    //         </div>
    //         <div>
    //             <AsideMenu />
    //         </div>
    //     </div>
    // )
    return (
        <div
          id='kt_aside'
          className={clsx('aside', classes.aside.join(' '))}
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
            {/* begin::Logo */}
            {aside.theme === 'dark' && (
              <Link to='/bondmarket'>
                <img
                  alt='Logo'
                  className='h-35px logo'
                  src={toAbsoluteUrl('/media/logos/logo.svg')}
                />
              </Link>
            )}
            {aside.theme === 'light' && (
              <Link to='/bondmarket'>
                <img
                  alt='Logo'
                  className='h-25px logo'
                  src={toAbsoluteUrl('/media/logos/logo.svg')}
                />
              </Link>
            )}
            {/* end::Logo */}
    
            {/* begin::Aside toggler */}
            {aside.minimize && (
              <div
                id='kt_aside_toggle'
                className='btn btn-icon w-auto px-0 btn-active-color-primary aside-toggle'
                data-kt-toggle='true'
                data-kt-toggle-state='active'
                data-kt-toggle-target='body'
                data-kt-toggle-name='aside-minimize'
              >
                <KTSVG
                  path={'/media/icons/duotune/arrows/arr079.svg'}
                  className={'svg-icon-1 rotate-180'}
                />
              </div>
            )}
            {/* end::Aside toggler */}
          </div>
          {/* end::Brand */}
    
          {/* begin::Aside menu */}
          <div className='aside-menu flex-column-fluid'>
            <AsideMenu asideMenuCSSClasses={classes.asideMenu} />
          </div>
          {/* end::Aside menu */}
    
          {/* begin::Footer */}
          <div className='aside-footer flex-column-auto pt-5 pb-7 px-5' id='kt_aside_footer'>
            <a
              target='_blank'
              className='btn btn-custom btn-primary w-100'
              href={process.env.REACT_APP_PREVIEW_DOCS_URL}
              data-bs-toggle='tooltip'
              data-bs-trigger='hover'
              data-bs-dismiss-='click'
              title='Check out the complete documentation with over 100 components'
            >
              <span className='btn-label'>Docs & Components</span>
              <span className='svg-icon btn-icon svg-icon-2'>
                <KTSVG path='/media/icons/duotune/general/gen005.svg' />
              </span>
            </a>
          </div>
          {/* end::Footer */}
        </div>
    )
}

export default AsideDefault
