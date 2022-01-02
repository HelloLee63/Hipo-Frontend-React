import { useWeb3React } from '@web3-react/core';
import React from 'react'
import { walletConnector } from './walletConnector';
import { useWallet } from './wallets/walletProvider';

const TestButton = () => {
    
    const { walletConnect, walletDisconnect } = useWallet()
    console.log(walletConnect);
    console.log(walletDisconnect);

    const { active, account, library, connector, activate, deactivate } = useWeb3React()

    console.log(active);
    console.log(account);
    console.log(library)
    console.log(connector);
  
    async function connect() {
      try {
        await activate(walletConnector)
      } catch (ex) {
        console.log(ex)
      }
    }
  
    async function disconnect() {
      try {
        deactivate()
      } catch (ex) {
        console.log(ex)
      }
    }

    return (
        <div>
          <div>
            <button onClick={connect}>Connect to MetaMask</button>
                {active ? <span>Connected with <b>{account}</b></span> : <span>Not connected</span>}
            <button onClick={disconnect}>Disconnect</button>
          </div>
        </div>
      );
}

export default TestButton
