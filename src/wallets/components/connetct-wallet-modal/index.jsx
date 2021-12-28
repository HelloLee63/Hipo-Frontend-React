import { Button, Modal } from "bootstrap";
import { Grid } from "react-bootstrap";
import { Text } from "react-bootstrap/lib/Navbar";
import { useGeneral } from "../../../components/providers/generalProvider";


const InitialState = {
    showLedgerModal: false,
};

const ConnectWalletModal = props => {
    const { ...modalProps } = props;
    const { theme } = useGeneral();

    const wallet = useWallet();
    const [state, setState] = useMergeState(InitialState);

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
                                src={Array.isArray(connctor.logo) ? connector.logo[theme === 'dark' ? 1 : 0]: connector.logo}
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