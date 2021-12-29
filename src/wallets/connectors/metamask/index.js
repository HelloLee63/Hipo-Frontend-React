import { notification } from "antd"
import MetamaskLogoDark from '../../svg/metamask-logo-dark.svg'
import MetamaskLogo from '../../svg/metamask-logo.svg'
import { InjectedConnector } from '@web3-react/injected-connector'

export class MetamaskConnector extends InjectedConnector {

    async addChain(...infos) {
        const provider = await this.getProvider()
        return provider.request({
            method: 'wallet_addEthereumChain',
            params: infos
        })
    }

    async switchChain(info) {
        const provider = await this.getProvider()
        return provider.request({
            method: 'wallet_switchEthereumChain',
            params: [info],
        })
    }

    async addToken(info) {
        const provider = await this.getProvider()
        return provider.request({
            method: 'wallet_watchAsset',
            params: info,
        })
    }
}

function handleErrors(error) {
    switch (error?.code) {
        case -32602:
            notification.error({
                message: error?.message,
            })
            break
        default:
            break
    }
        
}

const MetamaskWalletConfig = {
    id: 'metamask',
    logo: [MetamaskLogo, MetamaskLogoDark],
    name: 'MetaMask',
    factory (network) {
        return new MetamaskConnector({
            supportedChainIds: [network.meta.chainId],
        })

    },

    onConnect(connector, args) {
        connector?.getProvider().then(provider => {
            provider.addListener('send::error', handleErrors)
        })
    },

    onDisconnect(connector) {
        connector?.getProvider().then(provider => {
            provider.removeListener('send::error', handleErrors)
        })
    },

    onError(error) {
        switch (error?.code) {
            case -32002:
                return new Error('MetaMask is already processing. Please verify MetaMask extension.')
            default:
                break
        }

        return undefined
    },
}

export default MetamaskWalletConfig