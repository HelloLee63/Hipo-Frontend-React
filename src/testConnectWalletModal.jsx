import { KTSVG } from "./_metronic/helpers/components/KTSVG"

const TestConnectWalletModal = () => {
    return (
        <div className='modal fade' id='kt_modal_create_app' aria-hidden='true'>
            <div className="modal-dialog modal-dialog-centered mw-900px">
                <div className="modal-content">
                    <div className="modal-header">
                        <h2>Connect Wallet 2</h2>
                    </div>

                    <div className='btn btn-sm btn-icon btn-active-color-primary' data-bs-dismiss='modal'>
                        <KTSVG path='/media/icons/duotune/arrows/arr061.svg' className='svg-icon-1' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TestConnectWalletModal