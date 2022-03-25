import { KTSVG } from "../../../_metronic/helpers/components/KTSVG";

const METAMASK_CHROME_EXT_URL = 'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn';

const InstallMetaMaskModal = props => {
  const { ...modalProps } = props;
  return (
    <div className="modal fade" id='install_wallet_modal' aria-hidden='true' {...modalProps}>
      <div className="modal-dialog modal-dialog-centered mw-568px">
        <div className="modal-content">
          <div className="modal-header">
            <h3>
              <span className='card-label fw-bolder fs-3 mb-1'>Install MetaMask</span>
            </h3>
            
            <div className='btn btn-sm btn-icon btn-active-color-primary' data-bs-dismiss='modal'>
              <KTSVG path='/media/icons/walletconnection/close.svg' className='svg-icon-1 svg-2x' />
            </div>
          </div>

          <div className='modal-body py-lg-5 px-lg-10'>
            <h6 className="py-lg-1 px-lg-1 text-muted">You need to have{' '}
              <span>MetaMask</span>
              installed to continue.
              <br />
              Once you have installed it, please refresh the page
            </h6>            
          </div>
          <div>
            <buton type='button' href={METAMASK_CHROME_EXT_URL} rel="noopener noreferrer" target="_blank">
              Install MetaMask
            </buton>
              
            <button data-bs-dismiss='modal'>
              Cancel
            </button>
          </div>
                        
        </div>
      </div>
    </div>
  );
};

export default InstallMetaMaskModal;