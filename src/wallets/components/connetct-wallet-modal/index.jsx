import { useGeneral } from "../../../components/providers/generalProvider";
import { WalletConnectors, useWallet } from "../../walletProvider";
import useMergeState from '../../../hooks/useMergeState'

import Button from "../../../components/antd/button";

import { KTSVG } from "../../../_metronic/helpers/components/KTSVG";

const InitialState = {
    showLedgerModal: false,
};

const ConnectWalletModal = props => {
    const { ...modalProps } = props;
    const { theme } = useGeneral();

    const wallet = useWallet();
    const [state, setState] = useMergeState(InitialState);

    function handleConnectorSelect(connector) {
        if (wallet.isActive) {
          return;
        }
    
        if (connector.id === 'ledger') {
          setState({
            showLedgerModal: true,
          });
          return;
        }
    
        wallet.connect(connector).catch(Error);
      }

    return (
      <div className="modal fade" id='hipo_connect_wallet' aria-hidden='true' {...modalProps}>
        <div className="modal-dialog modal-dialog-centered mw-568px">
          <div className="modal-content">
            <div className="modal-header">
              <h3>
                <span className='card-label fw-bolder fs-3 mb-1'>Connect Wallet</span>
              </h3>
              
              <div className='btn btn-sm btn-icon btn-active-color-primary' data-bs-dismiss='modal'>
                  <KTSVG path='/media/icons/duotune/arrows/arr061.svg' className='svg-icon-1' />
              </div>
            </div>

            <div className='modal-body py-lg-5 px-lg-10'>
              <h6 className="py-lg-1 px-lg-1 text-muted">Please select the wallet of you liking</h6>
              {WalletConnectors.map(connector => (
              <Button
                key = {connector.id}
                type = "select"
                style = {{ height: '96px' }}
                onClick = {() => handleConnectorSelect(connector)}>
                <img
                  src={Array.isArray(connector.logo) ? connector.logo[theme === 'dark' ? 1 : 0]: connector.logo}
                  alt = {connector.name}
                  height = {32} />
              </Button>
              ))}
            </div>

              
          </div>
        </div>
      </div>



        // <Modal width={568} {...modalProps}>
        //     <Grid flow="row" gap={32}>
        //         <Grid flow='row' gap={4}>
        //             <Text type="h2" weight="bold" color="primary">
        //                 Connect Wallet
        //             </Text>
        //             <Text type='p1' color="secondary">
        //                 Please select the wallet of you liking
        //             </Text>
        //         </Grid>

        //         <Grid gap={24} colsTemplate="repeat(auto-fit, minmax(120px, 240px))">
        //             {WalletConnectors.map(connector => (
        //                 <Button
        //                     key = {connector.id}
        //                     type = "select"
        //                     style = {{ height: '96px' }}
        //                     onClick = {() => handleConnectorSelect(connector)}>
        //                     <img
        //                         // src={Array.isArray(connector.logo) ? connector.logo[theme === 'dark' ? 1 : 0]: connector.logo}
        //                         src={Array.isArray(connector.logo) ? connector.logo[0]: connector.logo}
        //                         alt = {connector.name}
        //                         height = {32} />
        //                 </Button>
        //             ))}
        //         </Grid>
        //     </Grid>
        // </Modal>
    )
}

export default ConnectWalletModal;