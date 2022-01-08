import GeneralProvider from './components/providers/generalProvider.jsx';
import { BrowserRouter } from 'react-router-dom';
import WalletProvider from './wallets/walletProvider.jsx';
import NetworkProvider from './components/providers/networkProvider.jsx';
import Web3Provider from './components/providers/web3Provider.jsx';
import ConfigProvider from './components/providers/configProvider.jsx';

import { AppRoutes } from './routing/AppRoutes.jsx';
import { LayoutProvider } from './layout/core/LayoutProvider.jsx';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <GeneralProvider>
        <LayoutProvider>
          <NetworkProvider>
            <ConfigProvider>
              <WalletProvider>
                <Web3Provider>                
                  <AppRoutes />
                </Web3Provider>
              </WalletProvider>
            </ConfigProvider>
          </NetworkProvider>
          </LayoutProvider>
        </GeneralProvider>
      </BrowserRouter>
    </div>
  )
}

export default App;