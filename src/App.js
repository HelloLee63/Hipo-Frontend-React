import GeneralProvider from './components/providers/generalProvider.jsx';
import { BrowserRouter } from 'react-router-dom';
import WalletProvider from './wallets/walletProvider.jsx';
import NetworkProvider from './components/providers/networkProvider.jsx';
import Web3Provider from './components/providers/web3Provider.jsx';
import ConfigProvider from './components/providers/configProvider.jsx';

import { AppRoutes } from './routing/AppRoutes.jsx';
import { LayoutProvider } from './layout/core/LayoutProvider.jsx';
import ContractManagerProvider from './web3/components/contractManagerProvider.jsx';

import TokensProvider from './components/providers/tokensProvider.jsx';
import KnownTokensProvider from './components/providers/knownTokensProvider.jsx';
import ProtocolDataProvider from './web3/components/providers/ProtocolDataProvider.js';
import WalletDataProvider from './web3/components/providers/WalletDataProvider.js';
import FinancingPoolProvider from './web3/components/providers/FinancingPoolProvider.js';
import BondMarketProvider from './modules/bond-market/providers/BondMarketProvider.js';

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
                      <TokensProvider>
                        <KnownTokensProvider>
                          <ProtocolDataProvider>
                            <WalletDataProvider>
                              <FinancingPoolProvider>                                  
                                <BondMarketProvider>      
                                  <AppRoutes />
                                </BondMarketProvider>                                    
                              </FinancingPoolProvider>
                            </WalletDataProvider>   
                          </ProtocolDataProvider>
                        </KnownTokensProvider>
                      </TokensProvider>                       
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