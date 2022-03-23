import Popover from "../../../components/antd/popover"
import Identicon from "../../../components/custom/identicon"
import { useNetwork } from "../../../components/providers/networkProvider"
import { useWallet } from "../../../wallets/walletProvider"
import DefaultTitle from "./page-title/DefaultTile"
import { ExplorerAddressLink }from "../../../components/button"
import { useWeb3 } from "../../../components/providers/web3Provider"
import { isMobile } from "react-device-detect"
import { KTSVG } from "../../../_metronic/helpers/components/KTSVG"
import { shortenAddr } from "../../../web3/utils"
import toAbsoluteUrl from "../../../_metronic/helpers/AssetHelpers"

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
            <div className="me-15">
              <NetworkAction />
            </div>
            <div className="align-items-center pe-10">
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
  const walletConnPop = (
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
        <button onClick={() => wallet.disconnect()} className='btn btn-outline-primary px-5'>
          Sign Out
        </button>
      </div>
    </div>
  )

  if (wallet.connecting) {
    return (
      <Popover
        placement='bottomRight' 
        noPadding 
        content={walletConnPop}
        trigger="click">
        <a
          type="button"
          className='btn btn-sm btn-light-primary align-items-center'
          data-bs-toggle="modal"
          data-bs-target='#hipo_connect_wallet'
          id='hipo_wallet_connect_button'
          width='300px'
          style={{
            backgroundImage: `url('/media/background/background-connectwallet.png')`,
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
        type="button"
        className='btn btn-lg btn-light-primary align-items-center fs-6 fw-bolder'
        data-bs-toggle="modal"
        data-bs-target='#hipo_connect_wallet'
        id='hipo_wallet_connect_button'
        style={{
          backgroundImage: `url('/media/background/background-connectwallet.png')`,
          backgroundRepeat: 'no-repeat',
          color: "white",
          fontFamily: 'PingFangSC-Medium'
        }}
      >        
        Connect Wallet
      </a>       
    ) : null
  }

  return (
    <>
      <a type="button" className="d-flex align-items-center pe-8"
        data-kt-menu-trigger='click'
        data-kt-menu-placement='bottom-end'
      >
        { wallet.ens.avatar ? (
          <img
            width={36}
            height={36}
            className="mr-8"
            style={{ borderRadius: '3px' }}
            src={ wallet.ens.avatar }
            alt={ wallet.ens.avatar }
          />
        ) : (
          <Identicon address={wallet.account} width={30} height={30} className="mr-8" />
        )}
        <span className="ps-3 fs-5" style={{fontFamily: 'PingFangSC-Medium', color: '#333333'}}>{ wallet.ens.name || shortenAddr(wallet.account, 4, 3) }</span>
        
      </a>
      {walletConnPop}
    </>  
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
      type="button" 
      onClick={() => showNetworkSelect()} 
      className="d-flex align-items-center pe-1">      
      <KTSVG path={activeNetwork.meta.logo} className='svg-icon svg-icon-2x' />
      <span className="fs-5 fw-bolder ps-3" style={{fontFamily: 'PingFangSC-Medium', color: '#333333'}}>{activeNetwork.meta.name}</span>
    </a>
  )
}