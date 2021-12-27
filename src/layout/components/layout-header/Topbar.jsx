import { useLayout } from "../../core"
import clsx from "clsx"
import toAbsoluteUrl from '../../../_metronic/helpers/AssetHelpers.js'
import DefaultTitle from "./page-title/DefaultTile"
import { KTSVG } from '../../../_metronic/helpers/components/KTSVG.tsx'

const toolbarButtonMarginClass = 'ms-1 ms-lg-3',
    toolbarButtonHeightClass = 'w-30px h-30px w-md-40px h-md-40px',
    toolbarUserAvatarHeightClass = 'symbol-30px symbol-md-40px',
    toolbarButtonIconSizeClass = 'svg-icon-1'

const Topbar = () => {
    const {classes} = useLayout()

    return (
        <div className='d-flex align-items-stretch flex-shrink-0'>
            <div
                id='kt_toolbar_container'
                className={clsx(classes.toolbarContainer.join(' '), 'd-flex flex-stack')}
            >
                <DefaultTitle />
                <div className='d-flex align-items-center py-1'>
                    {/* begin::Wrapper */}
                    <div className='me-4'>
                        {/* begin::Menu */}
                        <a
                            href='#'
                            className='btn btn-sm btn-primary'
                            data-bs-toggle='modal'
                            data-bs-target='#kt_modal_create_app'
                            id='kt_toolbar_primary_button'
                        >
                            Create
                        </a>

                    {/* end::Menu */}
                    </div>
                </div>                   
            </div>
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
                {/* <HeaderUserMenu /> */}
                {/* end::Toggle */}
            </div>
            {/* end::User */}
        </div>
    )
}

export default Topbar