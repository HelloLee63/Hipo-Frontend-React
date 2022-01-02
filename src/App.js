import GeneralProvider from './components/providers/generalProvider.jsx';
import { BrowserRouter as Router } from 'react-router-dom';
import LayoutView from './layout/index.jsx';
import WalletProvider from './wallets/walletProvider.jsx';
import NetworkProvider from './components/providers/networkProvider.jsx';
import Web3Provider from './components/providers/web3Provider.jsx';
import ConfigProvider from './components/providers/configProvider.jsx';
import CssTest from './cssTest.jsx';
import { PageDataProvider } from './layout/core/PageData.jsx';



const App = () => {
  return (
    <div>
      <Router>
        <GeneralProvider>
        <PageDataProvider>
          <NetworkProvider>
            <ConfigProvider>
              <WalletProvider>
                <Web3Provider>
                  <LayoutView />       
                  {/* <CssTest /> */}
                </Web3Provider>
              </WalletProvider>
            </ConfigProvider>
          </NetworkProvider>
          </PageDataProvider>
        </GeneralProvider>
      </Router>
    </div>
  )
}

export default App;
