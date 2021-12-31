
import WalletProvider from "../../../wallets/walletProvider"
import { useLayout } from "../../core"
import NetworkAction from "./networkAction"
import WalletAction from "./walletAction"
<WalletProvider></WalletProvider>

const toolbarButtonMarginClass = 'ms-1 ms-lg-3',
    toolbarButtonHeightClass = 'w-30px h-30px w-md-40px h-md-40px',
    toolbarUserAvatarHeightClass = 'symbol-30px symbol-md-40px',
    toolbarButtonIconSizeClass = 'svg-icon-1'

const Topbar = () => {
    const {classes} = useLayout()

    return (
        // <WalletProvider>

        <div className='d-flex align-items-stretch flex-shrink-0'>            
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
                            Connect Wallet
                        </a>

                    {/* end::Menu */}
                    </div>
                    <NetworkAction />
                    <WalletAction />
                </div>                   
        </div>
        // {/* </WalletProvider> */}
    )
}

export default Topbar