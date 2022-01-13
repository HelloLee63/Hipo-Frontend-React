import GeneralProvider from './components/providers/generalProvider.jsx';
import { BrowserRouter } from 'react-router-dom';
import WalletProvider from './wallets/walletProvider.jsx';
import NetworkProvider from './components/providers/networkProvider.jsx';
import Web3Provider from './components/providers/web3Provider.jsx';
import ConfigProvider from './components/providers/configProvider.jsx';

import { AppRoutes } from './routing/AppRoutes.jsx';
import { LayoutProvider } from './layout/core/LayoutProvider.jsx';
import ContractManagerProvider from './web3/components/contractManagerProvider.jsx';
import ProtocolDataProvider from './web3/components/providers/ProtocolDataProvider.jsx';

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
                    <ContractManagerProvider>
                      <ProtocolDataProvider>               
                        <AppRoutes />
                      </ProtocolDataProvider> 
                    </ContractManagerProvider>
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