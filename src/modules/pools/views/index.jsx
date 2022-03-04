import BigNumber from "bignumber.js"
import { useCallback, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import TransactionLink from "../../../components/button/transaction-link"
import { usePools } from "../../../components/providers/poolsProvider"
import TokenIcon from "../../../components/token-icon"
import TransactionAssetDataItem from "../../../components/transaction-data-item/TransactionAssetDataItem"
import { useWallet } from "../../../wallets/walletProvider"
import { useLiquidityPool } from "../../add-liquidity/providers/liquidity-pool-provider"

const PoolsView = () => {

  const { bondPools } = usePools()
  const walletCtx = useWallet()
  const { setAssetSymbol, setDuration } = useLiquidityPool()

  const [isAdded, setIsAdded] = useState(false)

  const getBalanceOfLpToken = useCallback(() => {
    
    let amount = new BigNumber(0)

    if (walletCtx.account) {
      bondPools.map(pool => {
        const balance = new BigNumber(pool.lpToken.contract.balances?.get(walletCtx.account))
        amount = BigNumber.sum(amount, balance)
      })
    }
    return amount 

  }, [walletCtx.account, bondPools])

  const balance = getBalanceOfLpToken()

  useEffect(() => {
    if(walletCtx.account) {
      if(balance?.gt(0)) {
        setIsAdded(() => true)
      }
  
      if(balance?.eq(0) || balance?.isNaN()) {
        setIsAdded(() => false)
      }
    }
  }, [walletCtx.account, balance])

  if (walletCtx.account && !isAdded) {
    return (
      <div>No Liquidity</div>
    )
  }

  if (!walletCtx.account) {
    return (
      <div>Please Connect Your Wallet</div>
    )
  }

  function handleCurrentLiquidity(symbol, duration) {
    setAssetSymbol(() => symbol)
    setDuration(() => duration)
  }

  return (
    <>
      <TransactionLink name='Add Liquidity' transaction='/addliquidity'/>
      <div className="row g-5 g-xl-8">      
        {
          bondPools.map(pool => (
            pool.lpToken.contract.balances.get(walletCtx.account)?.toString() > 0 &&
            <div key={pool.bondAsset.symbol} className="col-xl-4">
              <div className="card mb-2">
                <div className="card-body pt-3 pb-3">
                  <TokenIcon 
                    tokenIcon={pool.icon} 
                    tokenName={`${pool.bondAsset.symbol} Bond Pool`} 
                    tokenDesc={pool.duration.duration}               
                  />
                </div>
              </div>

              <div className="card">
                <div className="card-body">
                  <TransactionAssetDataItem 
                    title='Added Amount'
                    tokenIcon={pool.bondAsset.icon}
                    balance={pool.lpToken.contract.balances.get(walletCtx.account)}
                    decimals={pool.lpToken.decimals}
                  />

                <div className='separator my-5'></div>

                  <div className='d-flex align-items-sm-center mb-7'>
                    <div className='d-flex flex-row-fluid flex-wrap align-items-center'>
                      <div className='flex-grow-1 me-2'>
                        <div className='text-muted fw-bolder fs-6'>
                          Pool Share
                        </div>
                      </div>
                      <span className='fs-6 fw-bolder my-2'></span>
                    </div>
                  </div>
                </div>
              </div>

              <div className='d-flex flex-stack pt-3'>
              <Link to='/remove'>
                <button onClick={() => handleCurrentLiquidity(pool.bondAsset.symbol, pool.duration.duration)} className='btn btn-lg btn-primary me-0'>
                  <span className='indicator-label'>              
                    Remove
                  </span>
                </button>
              </Link>

              <Link to='/addliquidity'>
                <button type='button' className='btn btn-lg btn-primary me-0'>
                  <span className='indicator-label'>              
                    Add
                  </span>
                </button>
              </Link>
            </div>
            </div>
          ))
        }
      </div>
    </>
  )
}

export default PoolsView