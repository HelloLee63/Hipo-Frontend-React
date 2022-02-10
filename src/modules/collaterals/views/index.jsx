import { Link } from "react-router-dom"
import TokenIcon from "../../../components/token-icon"
import { useWallet } from "../../../wallets/walletProvider"
import { useProtocolData } from "../../../web3/components/providers/ProtocolDataProvider"
import { formatPercent } from "../../../web3/utils"

const CollateralsView = () => {

  const protocolData = useProtocolData()
  const walletCtx = useWallet()
  const liquidationThreshold = protocolData.protocolDataContract.thresholdMap
  // const issuerLtv = protocolData.protocolDataContract.issuerLtvMap?.get(wallet.account)  
  const maxLtv = protocolData.protocolDataContract.maxLtvMap

  return (
    <>      
      <div className='row g-5 g-xl-8'>
      { 
        protocolData.colPools.map(colPool =>  (
          colPool.contract.balances.get(walletCtx.account)?.toString() > 0 &&
          <div key={colPool.lable} className='col-xl-4'>
            <div className="card mb-2">
              <div className="card-body pt-3 pb-3">
                <TokenIcon 
                  tokenIcon={colPool.tokens[0].icon} 
                  tokenName={colPool.lable} 
                  tokenDesc={colPool.desc}                
                />
              </div>
            </div>

            <div className="card">
              <div className="card-body">
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
                        LTV
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
                        Max LTV
                      </a>
                    </div>
                    <span className='fs-6 fw-bolder my-2'>{formatPercent(maxLtv.get(colPool.tokens[0].address) / 100)}</span>
                  </div>
                </div>

                <div className='d-flex align-items-sm-center mb-7'>
                  <div className='d-flex flex-row-fluid flex-wrap align-items-center'>
                    <div className='flex-grow-1 me-2'>
                      <a href='#' className='text-muted fw-bolder fs-6'>
                        Liquidation Threshold
                      </a>
                    </div>
                    <span className='fs-6 fw-bolder my-2'>{formatPercent(liquidationThreshold.get(colPool.tokens[0].address) / 100)}</span>
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
    </>
  )
}

export default CollateralsView