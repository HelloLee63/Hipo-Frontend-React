import { useGeneral } from "../../../components/providers/generalProvider";
import { WalletConnectors, useWallet } from "../../walletProvider";
import useMergeState from '../../../hooks/useMergeState'
import { KTSVG } from "../../../_metronic/helpers/components/KTSVG";
import { useNetwork } from "../../../components/providers/networkProvider";

const InitialState = {
    showLedgerModal: false,
};

const ConnectWalletModal = props => {
  const { ...modalProps } = props;
  const { theme } = useGeneral();
  const networks = useNetwork()

  const wallet = useWallet();
  const [state, setState] = useMergeState(InitialState);

  const changeNetwork = async ({ networkName, setError }) => {
    try {
      if (!window.ethereum) throw new Error("No crypto wallet found")
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            ...networks[networkName]
          }
        ]
      });
    } catch (err) {
      setError(err.message)
    }
  }

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
              <KTSVG path='/media/icons/walletconnection/close.svg' className='svg-icon-1 svg-2x' />
            </div>
          </div>

          <div className='modal-body py-lg-5 px-lg-10'>
            <h6 className="py-lg-1 px-lg-1 text-muted">Please select the wallet of you liking</h6>
            {WalletConnectors.map(connector => (
            <button
              key = {connector.id}
              type = "select"
              style = {{ height: '96px' }}
              data-bs-dismiss='modal'
              onClick = {() => handleConnectorSelect(connector)}>                  
              <img
                src={Array.isArray(connector.logo) ? connector.logo[theme === 'dark' ? 1 : 0]: connector.logo}
                alt = {connector.name}
                height = {32} />
            </button>
            ))}
          </div>              
        </div>
      </div>
    </div>
  )
}

export default ConnectWalletModal;