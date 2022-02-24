import BigNumber from "bignumber.js"
import { useCallback } from "react"
import { Link } from "react-router-dom"
import { useKnownTokens } from "../../../../components/providers/knownTokensProvider"
import TokenIcon from "../../../../components/token-icon"
import { useWallet } from "../../../../wallets/walletProvider"
import { useProtocolData } from "../../../../web3/components/providers/ProtocolDataProvider"
import { useWalletData } from "../../../../web3/components/providers/WalletDataProvider"

import { formatPercent, formatToken } from "../../../../web3/utils"
import { KTSVG } from "../../../../_metronic/helpers/components/KTSVG"
import { useColPools } from "../../../pledge/providers/colPools-provider"

const CollateralsView = () => {

  const walletCtx = useWallet()

  const { colPools } = useColPools()

  const protocolData = useProtocolData()  
  const walletData = useWalletData()

  const { getTokenByAddress } = useKnownTokens()

  const balanceOfCollateral = useCallback(() => {
    
    if (walletCtx.account) {
      colPools.map(colPool => {
        let collaterals = new BigNumber(0)
        const balanceOfCollateral = new BigNumber(colPool.contract.balances?.get(walletCtx.account))
        collaterals += balanceOfCollateral
        return collaterals 
      })
    }
  }, [walletCtx.account, colPools])



  return (
    <>
      { !walletCtx.account && <div>Please Connect Your Wallet</div>}

      { walletCtx.account && !balanceOfCollateral() && <div> No Calleterals</div>}

      {/* { walletCtx.account && balanceOfCollateral() &&  */}
          
      <div className='row g-5 g-xl-8'>
      { 
        colPools.map(colPool =>  (
          colPool.contract.balances?.get(walletCtx.account)?.toString() > 0 &&
          <div key={colPool.underlyingAsset.symbol} className='col-xl-4'>
            <div className="card mb-2">
              <div className="card-body pt-3 pb-3">
                <TokenIcon 
                  tokenIcon={colPool.underlyingAsset.icon} 
                  tokenName={colPool.underlyingAsset.symbol} 
                  tokenDesc={colPool.underlyingAsset.name}                
                />
              </div>
            </div>

            <div className="card">
              <div className="card-body">

                <div className='d-flex align-items-sm-center mb-7'>
                    <div className='d-flex flex-row-fluid flex-wrap align-items-center'>
                      <div className='flex-grow-1 me-2'>
                        <a href='#' className='text-muted fw-bolder fs-6'>
                          Amount
                        </a>
                      </div>
                      <div className='symbol symbol-50px me-2'>
                        <KTSVG path={colPool.underlyingAsset.icon} className='svg-icon svg-icon-2x' />
                      </div>
                      {formatToken(colPool.token.contract.balances?.get(walletCtx.account), {scale: colPool.token.decimals}) ?? '-'}
                      <span className='fs-6 fw-bolder my-2'></span>
                    </div>
                </div>

                <div className='separator my-7'></div>

                <div className='d-flex align-items-sm-center mb-7'>
                  <div className='d-flex flex-row-fluid flex-wrap align-items-center'>
                    <div className='flex-grow-1 me-2'>
                      <a href='#' className='text-muted fw-bolder fs-6'>
                        Underlying Asset Amount
                      </a>
                    </div>
                    <div className='symbol symbol-50px me-2'>
                      {/* <KTSVG path={tokenIcon} className='svg-icon svg-icon-2x' /> */}
                    </div>
                    {/* {formatToken(pledgedBalance, {scale: colDecimals, tokenName: colPoolCtx.colPool.tokens[0].symbol}) ?? '-'} */}
                    <span className='fs-6 fw-bolder my-2'></span>
                  </div>
                </div>

                <div className='d-flex align-items-sm-center mb-7'>
                  <div className='d-flex flex-row-fluid flex-wrap align-items-center'>
                    <div className='flex-grow-1 me-2'>
                      <a href='#' className='text-muted fw-bolder fs-6'>
                          
                      </a>
                    </div>
                    <div className='symbol symbol-50px me-2'>
                      {/* <KTSVG path={tokenIcon} className='svg-icon svg-icon-2x' /> */}
                    </div>
                    {/* {formatToken(pledgedBalance, {scale: colDecimals, tokenName: colPoolCtx.colPool.tokens[0].symbol}) ?? '-'} */}
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
                      <KTSVG path={getTokenByAddress(walletData.getIssuerTotalDebts(colPool.underlyingAsset.address)?.debtBAddress?.toLowerCase()).icon} className='svg-icon svg-icon-1x' />
                    </div>
                    {formatToken(walletData.getIssuerTotalDebts(colPool.underlyingAsset.address)?.debtBAmount, {scale: getTokenByAddress(walletData.getIssuerTotalDebts(colPool.underlyingAsset.address)?.debtBAddress?.toLowerCase()).decimals}) ?? '-'}
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
                      <KTSVG path={getTokenByAddress(walletData.getIssuerTotalDebts(colPool.underlyingAsset.address)?.debtAAddress?.toLowerCase()).icon} className='svg-icon svg-icon-1x' />
                    </div>
                    {formatToken(walletData.getIssuerTotalDebts(colPool.underlyingAsset.address)?.debtAAmount, {scale: getTokenByAddress(walletData.getIssuerTotalDebts(colPool.underlyingAsset.address)?.debtAAddress?.toLowerCase()).decimals}) ?? '-'}
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
                    {formatPercent(formatToken(walletData.getIssuerLtv(colPool.underlyingAsset.address)?.ltv, 
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
                    <span className='fs-6 fw-bolder my-2'>{formatPercent(protocolData.protocolDataContract.maxLtvMap?.get(colPool.underlyingAsset.address) / 100)}</span>
                  </div>
                </div>

                <div className='d-flex align-items-sm-center mb-7'>
                  <div className='d-flex flex-row-fluid flex-wrap align-items-center'>
                    <div className='flex-grow-1 me-2'>
                      <a href='#' className='text-muted fw-bolder fs-6'>
                        Liquidation Threshold
                      </a>
                    </div>
                    <span className='fs-6 fw-bolder my-2'>{formatPercent(protocolData.protocolDataContract.thresholdMap.get(colPool.underlyingAsset.address) / 100)}</span>
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
      {/* } */}
    </>
  )
}

export default CollateralsView