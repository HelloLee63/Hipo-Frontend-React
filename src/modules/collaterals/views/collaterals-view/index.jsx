import BigNumber from "bignumber.js"
import { useCallback, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import TransactionLink from "../../../../components/button/transaction-link"
import { useKnownTokens } from "../../../../components/providers/knownTokensProvider"
import { usePools } from "../../../../components/providers/poolsProvider"
import CollateralToken from "../../../../components/token-icon/CollateralToken"
import TransactionAssetDataItem from "../../../../components/transaction-data-item/TransactionAssetDataItem"
import TransactionCollateralDataItem from "../../../../components/transaction-data-item/TransactionCollateralDataItem"
import TransactionLtvDataItem from "../../../../components/transaction-data-item/TransactionLtvDataItem"
import { useWallet } from "../../../../wallets/walletProvider"
import { useProtocolData } from "../../../../web3/components/providers/ProtocolDataProvider"
import { useWalletData } from "../../../../web3/components/providers/WalletDataProvider"

import { useColPool } from "../../../pledge/providers/colPool-provider"

const CollateralsView = () => {

  const walletCtx = useWallet()

  const { collateralPools } = usePools()
  const { setPoolSymbol } = useColPool()

  const protocolData = useProtocolData()  
  const walletData = useWalletData()

  const { getTokenByAddress } = useKnownTokens()

  const [isPledged, setIsPledged] = useState(false)

  const getBalanceOfCollateral = useCallback(() => {
    
    let amount = new BigNumber(0)

    if (walletCtx.account) {
      collateralPools.map(pool => {
        const balance = new BigNumber(pool.contract.balances?.get(walletCtx.account))
        amount = BigNumber.sum(amount, balance)
      })
    }
    return amount 

  }, [walletCtx.account, collateralPools])

  const balance = getBalanceOfCollateral()

  useEffect(() => {
    if(walletCtx.account) {
      if(balance?.gt(0)) {
        setIsPledged(() => true)
      }
  
      if(balance?.eq(0) || balance?.isNaN()) {
        setIsPledged(() => false)
      }
    }
  }, [walletCtx.account, balance])

  if (walletCtx.account && !isPledged) {
    return (
      <div>NO Pledged</div>
    )
  }

  if (!walletCtx.account) {
    return (
      <div>Please Connect Your Wallet</div>
    )
  }

  function handleCurrenSymbol(symbol) {
    setPoolSymbol(() => symbol)
  }

  return (
    <>
      <TransactionLink name='Pledge' transaction='/pledge'/>
      <div className='row g-5 g-xl-8'>
    { 
      collateralPools.map(pool =>  (
        pool.contract.balances?.get(walletCtx.account)?.toString() > 0 &&
        <div key={pool.collateralAsset.symbol} className='col-xl-4'>
          <div className="card mb-2">
            <div className="card-body pt-3 pb-3">
              
              <CollateralToken 
                tokenIcon={pool.collateralAsset.icon} 
                tokenSymbol={pool.collateralAsset.symbol} 
                tokenName={pool.collateralAsset.name} 
              />
            </div>
          </div>

          <div className="card">
            <div className="card-body">

              <TransactionCollateralDataItem
                title='Amount'
                tokenIcon={pool.collateralAsset.icon}
                balance={pool.contract.balances?.get(walletCtx.account)}
                decimals={pool.collateralAsset.decimals}
              />

              <div className='separator my-5'></div>

              <TransactionAssetDataItem 
                title='Debts'
                tokenIcon={getTokenByAddress(walletData.getIssuerTotalDebts(pool.collateralAsset.address)?.debtAAddress?.toLowerCase())?.icon}
                balance={walletData.getIssuerTotalDebts(pool.collateralAsset.address)?.debtAAmount}
                decimals={getTokenByAddress(walletData.getIssuerTotalDebts(pool.collateralAsset.address)?.debtAAddress?.toLowerCase())?.decimals}
              />

              <TransactionAssetDataItem 
                title=''
                tokenIcon={getTokenByAddress(walletData.getIssuerTotalDebts(pool.collateralAsset.address)?.debtBAddress?.toLowerCase())?.icon}
                balance={walletData.getIssuerTotalDebts(pool.collateralAsset.address)?.debtBAmount}
                decimals={getTokenByAddress(walletData.getIssuerTotalDebts(pool.collateralAsset.address)?.debtBAddress?.toLowerCase())?.decimals}
              />              

              <div className='separator my-5'></div>

              <TransactionLtvDataItem 
                title='LTV'
                balance={walletData.getIssuerLtv(pool.collateralAsset.address)?.ltv}
                decimals={18}
              />

              <TransactionLtvDataItem 
                title='Max LTV'
                balance={protocolData.protocolDataContract.maxLtvMap?.get(pool.collateralAsset.address)}
                decimals={2}
              />

              <TransactionLtvDataItem 
                title='Liquidation Threshold'
                balance={protocolData.protocolDataContract.thresholdMap.get(pool.collateralAsset.address)}
                decimals={2}
              />
            </div>
          </div>

          <div className='d-flex flex-stack pt-3'>
            <Link to='/redeem'>
              <button onClick={() => handleCurrenSymbol(pool.collateralAsset.symbol)} className='btn btn-lg btn-primary me-0'>
                <span className='indicator-label'>  
                  Redeem                                   
                </span>
              </button>
            </Link>

            <Link to='/pledge'>
              <button className='btn btn-lg btn-primary me-0'>
                <span className='indicator-label'>              
                  Add
                </span>
              </button>
            </Link>
          </div>       
        </div>))            
    }        
      </div>
    </>
      
  )
}

export default CollateralsView