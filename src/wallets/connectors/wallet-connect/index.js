import { AbstractConnector } from '@web3-react/abstract-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';

import WalletConnectLogo from '../../svg/walletconnect-logo.svg'

const WalletConnectConfig = {
  id: 'walletconnect',
  logo: WalletConnectLogo,
  name: 'WalletConnect',
  factory(network) {
    return new WalletConnectConnector({
      rpc: {
        [network.meta.chainId]: network.rpc.httpsUrl,
      },
      pollingInterval: network.rpc.poolingInterval,
      bridge: network.config.wallets.walletConnectBridge,
      qrcode: true,
    });
  },
  onDisconnect(connector) {
    connector?.close();
  },
  onError(error) {
    return error;
  },
};

export default WalletConnectConfig;