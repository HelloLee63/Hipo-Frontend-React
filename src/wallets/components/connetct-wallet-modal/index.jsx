import { Button, Modal } from "bootstrap";
import Grid from "../../../components/custom/grid";

import { Text } from "../../../components/custom/typography";
import { useGeneral } from "../../../components/providers/generalProvider";
import { WalletConnectors, useWallet } from "../../walletProvider";
import useMergeState from '../../../hooks/useMergeState'


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
        <Modal>
            <Grid>
                <Grid>
                    <Text>
                        Connect Wallet
                    </Text>
                    <Text>
                        Please select the wallet of you liking
                    </Text>
                </Grid>

                <Grid>
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
                </Grid>
            </Grid>
        </Modal>
    );
};

export default ConnectWalletModal;