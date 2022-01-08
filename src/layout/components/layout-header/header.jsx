import Popover from "../../../components/antd/popover"
import Identicon from "../../../components/custom/identicon"
import { Text } from "../../../components/custom/typography"
import { useNetwork } from "../../../components/providers/networkProvider"
import { useWallet } from "../../../wallets/walletProvider"
import DefaultTitle from "./page-title/DefaultTile"



import Icon from "../../../components/icon"
import { Badge } from "../../../components/custom/badge"
import { ExplorerAddressLink }from "../../../components/button"

import { useWeb3 } from "../../../components/providers/web3Provider"
import { isMobile } from "react-device-detect"
import toAbsoluteUrl from "../../../_metronic/helpers/AssetHelpers"
import clsx from "clsx"
import { Button } from "react-bootstrap"
import { KTSVG } from "../../../_metronic/helpers/components/KTSVG"
import { shortenAddr } from "../../../web3/utils"


const toolbarButtonMarginClass = 'ms-1 ms-lg-3',
  toolbarButtonHeightClass = 'w-30px h-30px w-md-40px h-md-40px',
  toolbarUserAvatarHeightClass = 'symbol-30px symbol-md-40px',
  toolbarButtonIconSizeClass = 'svg-icon-1'

const Header = () => {
    return (
        <div className='d-flex  align-items-stretch flex-shrink-0 justify-between' id='kt_toolbar'>                            
            <div className="d-flex align-items-center">
                <DefaultTitle />                
            </div >
            <div className="d-flex flex-row align-items-center page-title">
                <NetworkAction />                
            </div>
            <div className={clsx('d-flex flex-row align-items-center justify-content-md-end', toolbarButtonMarginClass)}>
                <WalletAction />
            </div>                          
        </div>
    )
}

export default Header


const WalletAction = () => {

    const { activeNetwork } = useNetwork()
    const wallet = useWallet()

    if (wallet.connecting) {
      return (
        <Popover 
        placement='bottomRight' 
        noPadding 
        content={
          <div className='card'>
            <div className='card-header flex align-center'>
              {wallet.ens.avatar ? (
                <img width={40}
                height={40}
                className='mr-16'
                style={{ borderRadius: '3px'}}
                src={ wallet.ens.avatar }
                alt={wallet.ens.avatar} />
              ) : (
                <Identicon address={wallet.account} width={40} height={40} className='mr-16' />
              )}
              <ExplorerAddressLink address={wallet.account}>
                <Text type="p1" weight="semibold" color="blue">
                  {wallet.ens.name || shortenAddr(wallet.account, 8, 8)}
                </Text>
              </ExplorerAddressLink>
            </div>
            <div className="pv-24 ph-32">
              <div className="flex align-center mb-32">
                <Icon name="status" className="mr-16" color="secondary" />
                <Text type="p1" color="secondary" className="mr-16">
                  Status
                </Text>
                <Badge color="green" className="ml-auto">
                  Connecting
                </Badge>
              </div>
              <div className="felx align-center mb-32">
                <Icon name="wallet" className="mr-16" color="secondary" />
                <Text type="p1" color="secondary" className="mr-16">
                  Wallet
                </Text>
                <Text type="p1" weight="semibold" color="primary" className="ml-auto">
                  {wallet.connecting?.name}
                </Text>
              </div>
            </div>
            {/* {wallet.meta !== GnosisSafeConfig && ( */}
              <div className="card-footer grid">
                <Button type="button" variation="ghose" onClick={() => wallet.disconnect()}>
                  Disconnect
                </Button>
              </div>
            {/* )} */}
          </div>
        }
        trigger="click">
        <Button variation="primary">Connecting...</Button>
        </Popover>
      )
    }

    if (!wallet.isActive) {
      return !isMobile ? (
       
          <div
            className='btn align-items-center'
            data-bs-toggle="modal"
            data-bs-target='#hipo_connect_wallet'
            onClick={() => wallet.showWalletModal()}
            id='hipo_wallet_connect_button'
            style={{
              backgroundImage: `url('/media/background/background-connectwallet.svg')`,
              backgroundRepeat: 'no-repeat'
            }}
          >
            <div className="align-items-center">Connect Wallet</div>
          </div>
       
      ) : null
    }

    return (
      <Popover
        placement="bottomRight"
        trigger="click"
        noPadding
        className=""
        content={
          <div className="card">
            <div className="card-header flex align-center">
              {wallet.ens.avatar ? (
                <img
                  width={40}
                  height={40}
                  className="mr-16"
                  style={{ borderRadius: '3px' }}
                  src={ wallet.ens.avatar }
                  alt={ wallet.ens.avatar }
                />
              ) : (
                <Identicon address={ wallet.account } width={40} height={40} className="mr-16" />
              )}
              <ExplorerAddressLink address={wallet.account}>
                <Text type="p1" weight="semibold" color="blue">
                  {wallet.ens.name || shortenAddr(wallet.account, 8, 8)}
                </Text>
              </ExplorerAddressLink>
            </div>
            <div className="pv-24 ph-32">
              <div className="flex align-center mb-32">
                <Icon name="status" className="mr-16" color="secondary" />
                <Text type="p1" color="secondary" className="mr-16">
                  Status
                </Text>
                <Badge color="green" className="ml-auto">
                  Connected
                </Badge>
              </div>
              <div className="flex align-center mb-32">
                <Icon name="wallet" className='mr-16' color="secondary" />
                <Text type='p1' color="secondary" className='mr-16'>
                  Wallet
                </Text>
                <Text type="p1" weight='semibold' color='primary' className='ml-auto'>
                  {wallet.meta?.name}
                </Text>
              </div>
              <div className="flex align-center">
                <Icon name='network' className='mr-16' color='secondary' />
                <Text type="p1" color="secondary" className="mr-16">
                  Network
                </Text>
                <Text type="p1" color="secondary" className="mr-16">
                  { activeNetwork.meta.name }
                </Text>
              </div>
            </div>
            {/* {wallet.meta !== GnosisSafeConfig && ( */}
              <div className="card-footer grid">
                <Button type="button" variation="ghost" onClick={() => wallet.disconnect()}>
                  Disconnect
                </Button>
              </div>
            {/* )} */}
          </div>
        }>
          <Button type="button" className="btn btn-outline-primary">
            { wallet.ens.avatar ? (
              <img
                width={24}
                height={24}
                className="mr-8"
                style={{ borderRadius: '3px' }}
                src={ wallet.ens.avatar }
                alt={ wallet.ens.avatar }
              />
            ) : (
                
              <Identicon address={wallet.account} width={24} className="mr-8" />
            )}
            {wallet.ens.name || shortenAddr(wallet.account, 4, 3)}
          </Button>
        </Popover>
    )
}

const NetworkAction = () => {
    const { activeNetwork } = useNetwork()
    const { showNetworkSelect } = useWeb3()

    return (
        <Button type="button" onClick={() => showNetworkSelect()} className="d-flex flex-row align-items-center">
            {/* <IconOld name={ toAbsoluteUrl(activeNetwork.meta.logo) } width={24} height={24} className="mr-8" /> */}
            {/* <img alt='Logo' src={toAbsoluteUrl(activeNetwork.meta.logo)} className='h-30px' /> */}
            <Text type="p2" weight='semibold' color='secondary'>
                {activeNetwork.meta.name}
            </Text>
        </Button>
    )
}