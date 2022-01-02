
import Button from "../../../components/button"
import ExplorerAddressLink from "../../../components/button/explorer-address-link"
import { Badge } from "../../../components/custom/badge"
import Identicon from "../../../components/custom/identicon"

import { Text } from "../../../components/custom/typography"
import Icon from "../../../components/icon"
import { useNetwork } from "../../../components/providers/networkProvider"
import { useWallet } from "../../../wallets/walletProvider"

import { isMobile } from 'react-device-detect'
import { shortenAddr } from 'web3-utils'
import Popover from "../../../components/antd/popover"

const WalletAction = () => {

    const { activeNetwork } = useNetwork()
    const wallet = useWallet()

    console.log("WalletAction");
    console.log(activeNetwork);
    console.log(wallet);

    // if (wallet.connecting) {
    //   return (
    //     <Popover 
    //     placement='bottomRight' 
    //     noPadding 
    //     content={
    //       <div className='card'>
    //         <div className='card-header flex align-center'>
    //           {wallet.ens.avatar ? (
    //             <img width={40}
    //             height={40}
    //             className='mr-16'
    //             style={{ borderRadius: '3px'}}
    //             src={ wallet.ens.avatar }
    //             alt={wallet.ens.avatar} />
    //           ) : (
    //             <Identicon address={wallet.account} width={40} height={40} className='mr-16' />
    //           )}
    //           <ExplorerAddressLink address={wallet.account}>
    //             <Text type="p1" weight="semibold" color="blue">
    //               {wallet.ens.name || shortenAddr(wallet.account, 8, 8)}
    //             </Text>
    //           </ExplorerAddressLink>
    //         </div>
    //         <div className="pv-24 ph-32">
    //           <div className="flex align-center mb-32">
    //             <Icon name="status" className="mr-16" color="secondary" />
    //             <Text type="p1" color="secondary" className="mr-16">
    //               Status
    //             </Text>
    //             <Badge color="green" className="ml-auto">
    //               Connecting
    //             </Badge>
    //           </div>
    //           <div className="felx align-center mb-32">
    //             <Icon name="wallet" className="mr-16" color="secondary" />
    //             <Text type="p1" color="secondary" className="mr-16">
    //               Wallet
    //             </Text>
    //             <Text type="p1" weight="semibold" color="primary" className="ml-auto">
    //               {wallet.connecting?.name}
    //             </Text>
    //           </div>
    //         </div>
    //         {/* {wallet.meta !== GnosisSafeConfig && ( */}
    //           <div className="card-footer grid">
    //             <Button type="button" variation="ghose" onClick={() => wallet.disconnect()}>
    //               Disconnect
    //             </Button>
    //           </div>
    //         {/* )} */}
    //       </div>
    //     }
    //     trigger="click">
    //     <Button variation="primary">Connection...</Button>
    //     </Popover>
    //   )
    // }

    if (!wallet.isActive) {
      console.log(wallet.isActive);
      return !isMobile ? (
        <button className="btn btn-primary" onClick={() => wallet.showWalletModal()}>
          Connect Wallet
        </button>
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
          <button type="button" className="">
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
          </button>
        <div>This is Test</div>
        </Popover>
    // )
    // return (
    //   <div>
    //     <Popover placement="bottomRight" noPadding content={<div><p>content</p> <p>content</p></div>}>
    //       <button>Test</button>
    //     </Popover>
        
    //   </div>

    )
}

export default WalletAction