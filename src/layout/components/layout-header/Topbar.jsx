import { useLayout } from "../../core"


const toolbarButtonMarginClass = 'ms-1 ms-lg-3',
    toolbarButtonHeightClass = 'w-30px h-30px w-md-40px h-md-40px',
    toolbarUserAvatarHeightClass = 'symbol-30px symbol-md-40px',
    toolbarButtonIconSizeClass = 'svg-icon-1'

const Topbar = () => {
    const {config} = useLayout()

    return (
        <div className='d-flex align-items-stretch flex-shrink-0'>
            {/* begin::User */}
            <div
                className={clsx('d-flex align-items-center', toolbarButtonMarginClass)}
                id='kt_header_user_menu_toggle'
            >
                {/* begin::Toggle */}
                <div
                    className={clsx('cursor-pointer symbol', toolbarUserAvatarHeightClass)}
                    data-kt-menu-trigger='click'
                    data-kt-menu-attach='parent'
                    data-kt-menu-placement='bottom-end'
                    data-kt-menu-flip='bottom'
                >
                <img src={toAbsoluteUrl('/media/avatars/150-2.jpg')} alt='metronic' />
                </div>
                <HeaderUserMenu />
                {/* end::Toggle */}
            </div>
            {/* end::User */}
        </div>
    )
}