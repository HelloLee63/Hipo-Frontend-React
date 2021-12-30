import Web3 from 'web3';
import { Web3ReactProvider } from '@web3-react/core'


function getLibrary(provider) {
    return new Web3(provider)
  }

const WalletProvider = ({ children }) => {
    return (
        <Web3ReactProvider getLibrary={ getLibrary }>
            {children}
        </Web3ReactProvider>
    )
}
export default WalletProvider