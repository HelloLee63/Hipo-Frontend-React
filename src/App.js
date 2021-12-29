import React, { Children } from 'react';
import LayoutHeader from './layout/components/layout-header/index.jsx';
import GeneralProvider from './components/providers/generalProvider.jsx';
import { BrowserRouter as Router } from 'react-router-dom';

import LayoutView from './layout/index.jsx';
import { Web3ReactProvider } from '@web3-react/core';
// import { useWeb3React, Web3ReactProvider } from '@web3-react/core';
import Web3 from 'web3';
// import { walletConnector } from './walletConnector.js';
// import WalletProvider from './wallets/walletProvider.jsx';
// import ConnectWalletModal from './wallets/components/connetct-wallet-modal/index.jsx';

function getlibrary(provider) {
  return new Web3(provider)
}

function App ({ Component, pageProps })  {

  return (
    <Web3ReactProvider>
      <Component {...pageProps} />
    </Web3ReactProvider>

  )
}

export default App;
