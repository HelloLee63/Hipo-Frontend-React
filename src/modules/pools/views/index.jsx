import { usePools } from "../../../components/providers/poolsProvider"
import TokenIcon from "../../../components/token-icon"
import { useWallet } from "../../../wallets/walletProvider"
import { KTSVG } from "../../../_metronic/helpers/components/KTSVG"

const PoolsView = () => {

  const { bondPools } = usePools()
  const walletCtx = useWallet()

  return (
    <>
      <div className="row g-5 g-xl-8">
        {
          bondPools.map(pool => (
            pool.lpToken.contract.balances.get(walletCtx.account)?.toString() > 0 &&
            <div key={pool.bondAsset.symbol} className="col-xl-4">
              <div className="card mb-2">
                <div className="card-body pt-3 pb-3">
                  <TokenIcon 
                    tokenIcon={pool.icon} 
                    tokenName={pool.bondAsset.symbol} 
                    tokenDesc={pool.duration.duration}               
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
                        <KTSVG path={pool.bondAsset.icon} className='svg-icon svg-icon-1x' />
                      </div>
                      {/* {formatToken(pledgedBalance, {scale: colDecimals, tokenName: colPoolCtx.colPool.tokens[0].symbol}) ?? '-'} */}
                      <span className='fs-6 fw-bolder my-2'></span>
                    </div>
                  </div>

                  <div className='d-flex align-items-sm-center mb-7'>
                    <div className='d-flex flex-row-fluid flex-wrap align-items-center'>
                      <div className='flex-grow-1 me-2'>
                        <div  className='text-muted fw-bolder fs-6'>
                          Interest Pool
                        </div>
                      </div>
                      <div className='symbol symbol-50px me-2'>
                        <KTSVG path={pool.bondAsset.icon} className='svg-icon svg-icon-1x' />
                      </div>
                      {/* {formatToken(pledgedBalance, {scale: colDecimals, tokenName: colPoolCtx.colPool.tokens[0].symbol}) ?? '-'} */}
                      <span className='fs-6 fw-bolder my-2'></span>
                    </div>
                  </div>

                  <div className='d-flex align-items-sm-center mb-7'>
                    <div className='d-flex flex-row-fluid flex-wrap align-items-center'>
                      <div className='flex-grow-1 me-2'>
                        <div href='#' className='text-muted fw-bolder fs-6'>
                          Lending Pool
                        </div>
                      </div>
                      <div className='symbol symbol-50px me-2'>
                        <KTSVG path={pool.bondAsset.icon} className='svg-icon svg-icon-1x' />
                      </div>
                      {/* {formatToken(pledgedBalance, {scale: colDecimals, tokenName: colPoolCtx.colPool.tokens[0].symbol}) ?? '-'} */}
                      <span className='fs-6 fw-bolder my-2'></span>
                    </div>
                  </div>

                  <div className='d-flex align-items-sm-center mb-7'>
                    <div className='d-flex flex-row-fluid flex-wrap align-items-center'>
                      <div className='flex-grow-1 me-2'>
                        <div className='text-muted fw-bolder fs-6'>
                          Pool Share
                        </div>
                      </div>
                      {/* {formatToken(pledgedBalance, {scale: colDecimals, tokenName: colPoolCtx.colPool.tokens[0].symbol}) ?? '-'} */}
                      <span className='fs-6 fw-bolder my-2'></span>
                    </div>
                  </div>
                </div>
              </div>

              <div className='d-flex flex-stack pt-3'>
              <div>
                <button type='button' className='btn btn-lg btn-primary me-0'>
                  <span className='indicator-label'>              
                    Remove
                  </span>
                </button>
              </div>

              <div>
                <button type='button' className='btn btn-lg btn-primary me-0'>
                  <span className='indicator-label'>              
                    Add
                  </span>
                </button>
              </div>
            </div>
            </div>
          ))
        }
      </div>
    </>
  )
}

export default PoolsView