import BigNumber from "bignumber.js"
import { useCallback, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useKnownTokens } from "../../../../components/providers/knownTokensProvider"
import { usePools } from "../../../../components/providers/poolsProvider"
import TokenIcon from "../../../../components/token-icon"
import { useWallet } from "../../../../wallets/walletProvider"
import { useProtocolData } from "../../../../web3/components/providers/ProtocolDataProvider"
import { useWalletData } from "../../../../web3/components/providers/WalletDataProvider"

import { formatPercent, formatToken } from "../../../../web3/utils"
import { KTSVG } from "../../../../_metronic/helpers/components/KTSVG"

const CollateralsView = () => {

  const walletCtx = useWallet()

  const { collateralPools } = usePools()

  const protocolData = useProtocolData()  
  const walletData = useWalletData()

  const { getTokenByAddress } = useKnownTokens()

  const [isPledged, setIsPledged] = useState(false)

  const getBalanceOfCollateral = useCallback(() => {
    
    let amount = new BigNumber(0)

    if (walletCtx.account) {
      collateralPools.map(pool => {
        const balance = new BigNumber(pool.contract.balances?.get(walletCtx.account))
        console.log(balance);
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

  return (
    <div className='row g-5 g-xl-8'>
    { 
      collateralPools.map(pool =>  (
        pool.contract.balances?.get(walletCtx.account)?.toString() > 0 &&
        <div key={pool.collateralAsset.symbol} className='col-xl-4'>
          <div className="card mb-2">
            <div className="card-body pt-3 pb-3">
              <TokenIcon 
                tokenIcon={pool.collateralAsset.icon} 
                tokenName={pool.collateralAsset.symbol} 
                tokenDesc={pool.collateralAsset.name}                
              />
            </div>
          </div>

          <div className="card">
            <div className="card-body">

              <div className='d-flex align-items-sm-center mb-7'>
                  <div className='d-flex flex-row-fluid flex-wrap align-items-center'>
                    <div className='flex-grow-1 me-2'>
                      <div className='text-muted fw-bolder fs-6'>
                        Amount
                      </div>
                    </div>
                    <div className='symbol symbol-50px me-2'>
                      <KTSVG path={pool.collateralAsset.icon} className='svg-icon svg-icon-2x' />
                    </div>
                    {formatToken(pool.contract.balances?.get(walletCtx.account), {scale: pool.collateralAsset.decimals}) ?? '-'}
                    <span className='fs-6 fw-bolder my-2'></span>
                  </div>
              </div>

              <div className='separator my-7'></div>

              <div className='d-flex align-items-sm-center mb-7'>
                <div className='d-flex flex-row-fluid flex-wrap align-items-center'>
                  <div className='flex-grow-1 me-2'>
                    <a href='#' className='text-muted fw-bolder fs-6'>
                      Debts
                    </a>
                  </div>
                  <div className='symbol symbol-50px me-2'>
                    <KTSVG path={getTokenByAddress(walletData.getIssuerTotalDebts(pool.collateralAsset.address)?.debtBAddress?.toLowerCase())?.icon} className='svg-icon svg-icon-1x' />
                  </div>
                  {formatToken(walletData.getIssuerTotalDebts(pool.collateralAsset.address)?.debtBAmount, {scale: getTokenByAddress(walletData.getIssuerTotalDebts(pool.collateralAsset.address)?.debtBAddress?.toLowerCase())?.decimals}) ?? '-'}
                  <span className='fs-6 fw-bolder my-2'></span>
                </div>
              </div>

              <div className='d-flex align-items-sm-center mb-7'>
                <div className='d-flex flex-row-fluid flex-wrap align-items-center'>
                  <div className='flex-grow-1 me-2'>
                    <div className='text-muted fw-bolder fs-6'>
                          
                    </div>
                  </div>
                  <div className='symbol symbol-50px me-2'>
                    <KTSVG path={getTokenByAddress(walletData.getIssuerTotalDebts(pool.collateralAsset.address)?.debtAAddress?.toLowerCase())?.icon} className='svg-icon svg-icon-1x' />
                  </div>
                  {formatToken(walletData.getIssuerTotalDebts(pool.collateralAsset.address)?.debtAAmount, {scale: getTokenByAddress(walletData.getIssuerTotalDebts(pool.collateralAsset.address)?.debtAAddress?.toLowerCase())?.decimals}) ?? '-'}
                  <span className='fs-6 fw-bolder my-2'></span>
                </div>
              </div>

              <div className='separator my-7'></div>

              <div className='d-flex align-items-sm-center mb-7'>
                <div className='d-flex flex-row-fluid flex-wrap align-items-center'>
                  <div className='flex-grow-1 me-2'>
                    <a href='#' className='text-muted fw-bolder fs-6'>
                      LTV
                    </a>
                  </div>
                  {formatPercent(formatToken(walletData.getIssuerLtv(pool.collateralAsset.address)?.ltv, 
                    {scale: 18}), 4) ?? '-'}
                  <span className='fs-6 fw-bolder my-2'></span>
                </div>
              </div>

              <div className='d-flex align-items-sm-center mb-7'>
                <div className='d-flex flex-row-fluid flex-wrap align-items-center'>
                  <div className='flex-grow-1 me-2'>
                    <a href='#' className='text-muted fw-bolder fs-6'>
                      Max LTV
                    </a>
                  </div>
                  <span className='fs-6 fw-bolder my-2'>{formatPercent(protocolData.protocolDataContract.maxLtvMap?.get(pool.collateralAsset.address) / 100)}</span>
                </div>
              </div>

              <div className='d-flex align-items-sm-center mb-7'>
                <div className='d-flex flex-row-fluid flex-wrap align-items-center'>
                  <div className='flex-grow-1 me-2'>
                    <a href='#' className='text-muted fw-bolder fs-6'>
                      Liquidation Threshold
                    </a>
                  </div>
                  <span className='fs-6 fw-bolder my-2'>{formatPercent(protocolData.protocolDataContract.thresholdMap.get(pool.collateralAsset.address) / 100)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className='d-flex flex-stack pt-3'>
            <Link to='/redeem'>
              <button type='button' className='btn btn-lg btn-primary me-0'>
                <span className='indicator-label'>                    
                  Redeem                                   
                </span>
              </button>
            </Link>

            <div>
              <button type='button' className='btn btn-lg btn-primary me-0'>
                <span className='indicator-label'>              
                  Add
                </span>
              </button>
            </div>
          </div>       
        </div>))            
    }        
    </div>  
  )
}

export default CollateralsView