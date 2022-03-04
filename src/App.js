import GeneralProvider from './components/providers/generalProvider.jsx';
import { BrowserRouter } from 'react-router-dom';
import WalletProvider from './wallets/walletProvider.jsx';
import NetworkProvider from './components/providers/networkProvider.jsx';
import Web3Provider from './components/providers/web3Provider.jsx';
import ConfigProvider from './components/providers/configProvider.jsx';

import { AppRoutes } from './routing/AppRoutes.jsx';
import { LayoutProvider } from './layout/core/LayoutProvider.jsx';
import ContractManagerProvider from './web3/components/contractManagerProvider.jsx';

import KnownTokensProvider from './components/providers/knownTokensProvider.jsx';
import ProtocolDataProvider from './web3/components/providers/ProtocolDataProvider.js';
import WalletDataProvider from './web3/components/providers/WalletDataProvider.js';
import FinancingPoolProvider from './web3/components/providers/FinancingPoolProvider.js';
import BondMarketProvider from './modules/bond-market/providers/BondMarketProvider.js';
import PoolsProvider from './components/providers/poolsProvider.jsx';
import BalanceDataProvider from './web3/components/providers/BalanceDataProvider.js';
import ColPoolProvider from './modules/pledge/providers/colPool-provider/index.jsx';
import DebtPoolProvider from './modules/issue/providers/debt-pool-provider/index.jsx';
import BondPoolProvider from './modules/purchase/providers/bond-pool-provider/index.jsx';
import LiquidityPoolProvider from './modules/add-liquidity/providers/liquidity-pool-provider/index.jsx';

const App = () => {

  console.log('App is rendered');
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
                      <KnownTokensProvider>
                        <PoolsProvider>
                          <ProtocolDataProvider>
                            <WalletDataProvider>
                              <BalanceDataProvider>
                                <FinancingPoolProvider>
                                  <BondMarketProvider>
                                    <LiquidityPoolProvider>
                                      <ColPoolProvider>
                                        <DebtPoolProvider>
                                          <BondPoolProvider>
                                            <AppRoutes />
                                          </BondPoolProvider>                                                                       
                                        </DebtPoolProvider>   
                                      </ColPoolProvider>
                                    </LiquidityPoolProvider>  
                                  </BondMarketProvider>                              
                                </FinancingPoolProvider>
                              </BalanceDataProvider>
                            </WalletDataProvider>   
                          </ProtocolDataProvider>
                        </PoolsProvider>
                      </KnownTokensProvider>
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