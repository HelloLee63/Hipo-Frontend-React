import GeneralProvider from './components/providers/generalProvider.jsx';
import { BrowserRouter as Router } from 'react-router-dom';
import LayoutView from './layout/index.jsx';
import WalletProvider from './wallets/walletProvider.jsx';
import NetworkProvider from './components/providers/networkProvider.jsx';

const App = () => {
  return (
    <div>
      <Router>
        <GeneralProvider>
          <NetworkProvider>
            {/* <WalletProvider> */}
              <LayoutView />
            {/* </WalletProvider> */}
          </NetworkProvider>
        </GeneralProvider>
      </Router>
    </div>
  )
}

export default App;
