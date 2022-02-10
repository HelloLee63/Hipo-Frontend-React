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
import { KTSVG } from "../../../_metronic/helpers/components/KTSVG"
import { shortenAddr } from "../../../web3/utils"
import clsx from "clsx"
import toAbsoluteUrl from "../../../_metronic/helpers/AssetHelpers"

const toolbarButtonMarginClass = 'ms-1 ms-lg-3',
  toolbarUserAvatarHeightClass = 'symbol-30px symbol-md-40px'

const Header = () => {
    
  return (
    <div className="header align-items-stretch">
      <div className="container-fluid d-flex align-items-stretch justify-content-between flex-lg-grow-1">
        <div className="d-flex align-items-center flex-grow-1 flex-lg-grow-1">
          <div>
            <DefaultTitle />
          </div>
        </div>
        <div className="d-flex align-items-stretch justify-content-end flex-lg-grow-1">
          <div className="d-flex align-items-center justify-content-end">
            <div className="me-5">
              <NetworkAction />
            </div>
            <div className="align-items-center">
              <WalletAction />
            </div>              
          </div>
        </div>        
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
                <a type="button" variation="ghose" onClick={() => wallet.disconnect()}>
                  Disconnect
                </a>
              </div>
            {/* )} */}
          </div>
        }
        trigger="click">
        <a
            type="button"
            className='btn btn-sm btn-light-primary align-items-center'
            data-bs-toggle="modal"
            data-bs-target='#hipo_connect_wallet'
            // onClick={() => wallet.showWalletModal()}
            id='hipo_wallet_connect_button'
            width='300px'
            style={{
              backgroundImage: `url('/media/background/background-connectwallet.svg')`,
              backgroundRepeat: 'no-repeat',
              color: "white"
            }}
          >
            Connecting...
          </a>
        </Popover>
      )
    }

    if (!wallet.isActive) {
      return !isMobile ? (       
          <a
            // type="button"
            className='btn btn-sm btn-light-primary align-items-center'
            data-bs-toggle="modal"
            data-bs-target='#hipo_connect_wallet'
            // onClick={() => wallet.showWalletModal()}
            id='hipo_wallet_connect_button'
            width='300px'
            style={{
              backgroundImage: `url('/media/background/background-connectwallet.svg')`,
              backgroundRepeat: 'no-repeat',
              color: "white"
            }}
          >
            Connect Wallet
          </a>       
      ) : null
    }

    return (
      <div
        className={clsx('d-flex align-items-center', toolbarButtonMarginClass)}
        id='kt_header_user_menu_toggle'
      >
        <div
          className={clsx('cursor-pointer symbol', toolbarUserAvatarHeightClass)}
          data-kt-menu-trigger='click'
          data-kt-menu-attach='parent'
          data-kt-menu-placement='bottom-end'
          data-kt-menu-flip='bottom'
        >
          <a type="button" className="btn btn-sm btn-light-primary">
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
            { wallet.ens.name || shortenAddr(wallet.account, 4, 3) }
          </a>
          <div
            className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg menu-state-primary fw-bold py-4 fs-6 w-275px'
            data-kt-menu='true'
          >
            <div className='menu-item px-3'>
              <div className='menu-content d-flex align-items-center px-3'>
                <div className='symbol symbol-50px me-5'>
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
                    <Identicon address={ wallet.account } width={30} height={30} className="mr-16" />
                  )}
                  <ExplorerAddressLink address={wallet.account}>                
                    <span className='fw-bolder align-items-center m-5 fs-5'>
                      {wallet.ens.name || shortenAddr(wallet.account, 8, 8)}
                    </span>                                          
                  </ExplorerAddressLink>
                </div>
              </div>
            </div>

            <div className='separator my-2'></div>

            <div className='menu-item px-5'>
              <a href='#' className='menu-link px-5'>
                <KTSVG path={toAbsoluteUrl('/media/icons/walletconnection/status.svg')} className='svg-icon svg-icon-2x me-5' />
                Status
                <span className='badge badge-light-success fw-bolder fs-7 px-2 py-1 ms-2'>Connected</span>
              </a>  
            </div>

            <div className='menu-item px-5'>
              <a href='#' className='menu-link px-5'>
                <KTSVG path={toAbsoluteUrl('/media/icons/walletconnection/wallet.svg')} className='svg-icon svg-icon-2x me-5' />
                Wallet          
                <span className='badge badge-light-success fw-bolder fs-7 px-2 py-1 ms-2'>{wallet.meta?.name}</span>
              </a>
            </div>

            <div className='menu-item px-5'>
              <a href='#' className='menu-link px-5'>
                <KTSVG path={toAbsoluteUrl('/media/icons/walletconnection/network.svg')} className='svg-icon svg-icon-2x me-5' />
                Network         
                <span className='badge badge-light-success fw-bolder fs-7 px-2 py-1 ms-2'>{activeNetwork.meta?.name}</span>
              </a>
            </div>

            <div className='separator my-2'></div>
      
            <div className='menu-item px-5'>
              <button onClick={() => wallet.disconnect()} className='btn btn-outline-primary  px-5'>
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>   
    )
}

export {WalletAction}

const NetworkAction = () => {
    const { activeNetwork } = useNetwork()
    const { showNetworkSelect } = useWeb3()

    return (
      <a         
        data-bs-toggle="modal"
        data-bs-target='#hipo_connect_network'
        type="button" onClick={() => showNetworkSelect()} className="btn btn-sm btn-light-primary">
        <KTSVG path={activeNetwork.meta.logo} className='svg-icon-1' />
        {activeNetwork.meta.name}
      </a>
    )
}