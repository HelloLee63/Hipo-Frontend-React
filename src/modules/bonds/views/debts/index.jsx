import { useEffect, useState } from "react"
import { Link } from "../../../../components/button"
import TransactionLink from "../../../../components/button/transaction-link"
import { usePools } from "../../../../components/providers/poolsProvider"
import TokenIcon from "../../../../components/token-icon"
import TransactionAssetDataItem from "../../../../components/transaction-data-item/TransactionAssetDataItem"
import { useWallet } from "../../../../wallets/walletProvider"
import { useWalletData } from "../../../../web3/components/providers/WalletDataProvider"
import { useDebtPool } from "../../../issue/providers/debt-pool-provider"

const DebtsView = () => {

  const walletCtx = useWallet()
  const { setDebtAssetToken, setDebtDuration, setPoolSymbol } = useDebtPool()

  const { bondPools, getCollateralPoolByAddress } = usePools()

  const { getBalanceOfDToken, getDebtsList, getDebtData  } = useWalletData()

  const [isInvested, setIsInvested] = useState(false)

  const balance = getBalanceOfDToken()

  useEffect(() => {    

    if(walletCtx.account) {
      if(balance?.gt(0)) {
        setIsInvested(() => true)
      }
  
      if(balance?.eq(0) || balance?.isNaN()) {
        setIsInvested(() => false)
      }
    }

  }, [walletCtx.account, balance])

  if (walletCtx.account && !isInvested) {
    return (
      <div>No Debts</div>
    )
  }

  if (!walletCtx.account) {
    return (
      <div>Please Connect Your Wallet</div>
    )
  }

  function handleCurrenSymbol(id, pool) {

    const debtData = getDebtData(pool, id)
    const collateralPool = getCollateralPoolByAddress(debtData[2])
    
    setPoolSymbol(() => collateralPool.collateralAsset.symbol)
    setDebtAssetToken(() => pool.bondAsset.symbol)
    setDebtDuration(() => pool.duration.duration)
  }
  
  return (
    <>
      <TransactionLink name='Purchase Bond' transaction='/purchase'/>
      <div className='row g-5 g-xl-8'>
        { bondPools.map(pool => (
          getDebtsList(pool)?.map(id => (
            <div key={id} className='col-xl-4'>
                <div className="card mb-2">
                  <div className="card-body pt-3 pb-3">
                    <TokenIcon 
                      tokenIcon={pool.icon} 
                      tokenName={pool.bondAsset.symbol} 
                      tokenDesc={pool.duration.description}                
                    />
                  </div>
                </div>

                <div className="card">
                  <div className="card-body">
                    <TransactionAssetDataItem 
                      title={id}
                      balance={getDebtData(pool, id)}
                      decimals={0}
                    />


                    <div className='d-flex align-items-sm-center mb-7'>
                        <div className='d-flex flex-row-fluid flex-wrap align-items-center'>
                          <div className='flex-grow-1 me-2'>
                            <div className='text-muted fw-bolder fs-6'>
                              Matured at
                            </div>
                          </div>
                          {/* {getBondData(pool, obj)?.bondData[2] ?? '-'} */}
                          <span className='fs-6 fw-bolder my-2'></span>
                        </div>
                    </div>

                    <div className='d-flex align-items-sm-center mb-7'>
                        <div className='d-flex flex-row-fluid flex-wrap align-items-center'>
                          <div className='flex-grow-1 me-2'>
                            <div className='text-muted fw-bolder fs-6'>
                              Bond Duration
                            </div>
                          </div>
                          {/* {pool.duration.description ?? '-'} */}
                          <span className='fs-6 fw-bolder my-2'></span>
                        </div>
                    </div>

                    <div className='separator my-7'></div>

                    <div className='d-flex align-items-sm-center mb-7'>
                      <div className='d-flex flex-row-fluid flex-wrap align-items-center'>
                        <div className='flex-grow-1 me-2'>
                          <a href='#' className='text-muted fw-bolder fs-6'>
                            You can withdraw
                          </a>
                        </div>
                        <div className='symbol symbol-50px me-2'>
                          {/* <KTSVG path={pool.bondAsset.icon ?? ''} className='svg-icon svg-icon-1x' /> */}
                        </div>
                        {/* {formatToken(getBondData(pool, obj)?.bondData[0], {scale: pool.bToken.decimals, tokenName: pool.bondAsset.symbol}) ?? '-'} */}
                        
                        <span className='fs-6 fw-bolder my-2'></span>
                      </div>
                    </div>

                    <div className='d-flex align-items-sm-center mb-7'>
                      <div className='d-flex flex-row-fluid flex-wrap align-items-center'>
                        <div className='flex-grow-1 me-2'>
                          <a href='#' className='text-muted fw-bolder fs-6'>
                            Principal
                          </a>
                        </div>
                        <div className='symbol symbol-50px me-2'>
                          {/* <KTSVG path={pool.bondAsset.icon ?? ''} className='svg-icon svg-icon-1x' /> */}
                        </div>
                        {/* {formatToken(getBondData(pool, obj)?.bondData[1], {scale: pool.bToken.decimals, tokenName: pool.bondAsset.symbol}) ?? '-'} */}
                        
                        <span className='fs-6 fw-bolder my-2'></span>
                      </div>
                    </div>

                    <div className='d-flex align-items-sm-center mb-7'>
                      <div className='d-flex flex-row-fluid flex-wrap align-items-center'>
                        <div className='flex-grow-1 me-2'>
                          <a href='#' className='text-muted fw-bolder fs-6'>
                            Fixed Income
                          </a>
                        </div>
                        <div className='symbol symbol-50px me-2'>
                          {/* <KTSVG path={pool.bondAsset.icon ?? ''} className='svg-icon svg-icon-1x' /> */}
                        </div>
                        {/* {formatToken(getBondData(pool, obj)?.bondData[1], {scale: pool.bToken.decimals, tokenName: pool.bondAsset.symbol}) ?? '-'} */}
                        
                        <span className='fs-6 fw-bolder my-2'></span>
                      </div>
                    </div>

                    <div className='d-flex align-items-sm-center mb-7'>
                      <div className='d-flex flex-row-fluid flex-wrap align-items-center'>
                        <div className='flex-grow-1 me-2'>
                          <a href='#' className='text-muted fw-bolder fs-6'>
                            Fixed Income
                          </a>
                        </div>
                        <div className='symbol symbol-50px me-2'>
                          {/* <KTSVG path={pool.bondAsset.icon ?? ''} className='svg-icon svg-icon-1x' /> */}
                        </div>
                        {/* {formatToken(getBondData(pool, obj)?.bondData[1], {scale: pool.bToken.decimals, tokenName: pool.bondAsset.symbol}) ?? '-'} */}
                        
                        <span className='fs-6 fw-bolder my-2'></span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='d-flex flex-stack pt-3'>
                  <Link to='/repay'>
                    <button type='button'  onClick={() => {handleCurrenSymbol(id, pool)}} className='btn btn-lg btn-primary me-0'>
                      <span className='indicator-label'>                    
                        Repay                                   
                      </span>
                    </button>
                  </Link>
                </div>       
            </div>
          ))
        ))
        }
      </div>
    </>
  )
}

export default DebtsView