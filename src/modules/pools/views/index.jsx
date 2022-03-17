import BigNumber from "bignumber.js"
import { useCallback, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import TransactionLink from "../../../components/button/transaction-link"
import NoTransaction from "../../../components/no-transaction"
import { usePools } from "../../../components/providers/poolsProvider"
import TokenIcon from "../../../components/token-icon"
import TransactionAssetDataItem from "../../../components/transaction-data-item/TransactionAssetDataItem"
import TransactionLtvDataItem from "../../../components/transaction-data-item/TransactionLtvDataItem"
import WalletUnconnected from "../../../components/wallet-unconnected"
import { useWallet } from "../../../wallets/walletProvider"
import { useLiquidityPool } from "../../add-liquidity/providers/liquidity-pool-provider"

const PoolsView = () => {

  const { bondPools } = usePools()
  const walletCtx = useWallet()
  const { setAssetSymbol, setDuration } = useLiquidityPool()

  const [conStatus, setConStatus] = useState(false)
  const [loading, setLoading] = useState(false)
  const [noTxsStatus, setNoTxsStatus] = useState(false)
  const [txsStatus, setTxsStatus] = useState(false)

  const [addedAmount, setAddedAmount] = useState()

  const getBalanceOfLpToken = async () => {
    
    let amount = new BigNumber(0)

    if (walletCtx.account) {
      await bondPools.map(pool => {
        const balance = new BigNumber(pool.lpToken.contract.balances?.get(walletCtx.account))
        amount = BigNumber.sum(amount, balance)
      })
    }
    return amount 
  }

  const poolShare = useCallback((pool) => {

    if (walletCtx.account) {
      const lpTokenTotalSupply = new BigNumber(pool.lpToken.contract.totalSupply)
      const balance = new BigNumber(pool.lpToken.contract.balances?.get(walletCtx.account))
      const shares = balance.dividedBy(lpTokenTotalSupply)
      return shares
    }    
  }, [walletCtx.account])

  useEffect(async () => {
    if (walletCtx.account) {
      const balance = await getBalanceOfLpToken()
      setAddedAmount(() => new BigNumber(balance))
    }  
  }, [walletCtx.account, 
    bondPools[0].lpToken.contract.balances?.get(walletCtx.account),
    bondPools[1].lpToken.contract.balances?.get(walletCtx.account),
    bondPools[2].lpToken.contract.balances?.get(walletCtx.account),
    bondPools[3].lpToken.contract.balances?.get(walletCtx.account),
    bondPools[4].lpToken.contract.balances?.get(walletCtx.account),
    bondPools[5].lpToken.contract.balances?.get(walletCtx.account),
    bondPools[6].lpToken.contract.balances?.get(walletCtx.account),
    bondPools[7].lpToken.contract.balances?.get(walletCtx.account),
    bondPools[8].lpToken.contract.balances?.get(walletCtx.account),
    bondPools[9].lpToken.contract.balances?.get(walletCtx.account),
    bondPools[10].lpToken.contract.balances?.get(walletCtx.account),
    bondPools[11].lpToken.contract.balances?.get(walletCtx.account),
    bondPools[12].lpToken.contract.balances?.get(walletCtx.account),
    bondPools[13].lpToken.contract.balances?.get(walletCtx.account),
    bondPools[14].lpToken.contract.balances?.get(walletCtx.account),
    bondPools[15].lpToken.contract.balances?.get(walletCtx.account),
    bondPools[16].lpToken.contract.balances?.get(walletCtx.account),
    bondPools[17].lpToken.contract.balances?.get(walletCtx.account),
    bondPools[18].lpToken.contract.balances?.get(walletCtx.account),
    bondPools[19].lpToken.contract.balances?.get(walletCtx.account),
    bondPools[20].lpToken.contract.balances?.get(walletCtx.account),
    bondPools[21].lpToken.contract.balances?.get(walletCtx.account),
    bondPools[22].lpToken.contract.balances?.get(walletCtx.account),
    bondPools[23].lpToken.contract.balances?.get(walletCtx.account),
  ])

  useEffect(() => {
    if (!walletCtx.account) {
      setConStatus(() => true)
      setLoading(() => false)
      setNoTxsStatus(() => false)
      setTxsStatus(() => false)
      return
    }

    if (walletCtx.account) {
      setConStatus(() => false)

      if (!addedAmount && !addedAmount?.eq(0)) {
        setLoading(() => true)

        setNoTxsStatus(() => false)
        setTxsStatus(() => false)
        return
      }

      if (addedAmount?.gt(0)) {
        setLoading(() => false)

        setNoTxsStatus(() => false)
        setTxsStatus(() => true)
        return
      }

      if (addedAmount?.eq(0)) {
        setLoading(() => false)

        setNoTxsStatus(() => true)
        setTxsStatus(() => false)
        return
      }
    }
  }, [walletCtx.account, addedAmount])

  function handleCurrentLiquidity(symbol, duration) {
    setAssetSymbol(() => symbol)
    setDuration(() => duration)
  }

  return (
    <>
      { loading &&
        <>
          <TransactionLink name='Add Liquidity' transaction='/addliquidity'/>        
          <div className=''>
            <div className="spinner-border text-primary" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        </>
      }

      {
        conStatus && <WalletUnconnected />
      }

      {
        noTxsStatus && 
        <>
          <TransactionLink name='Add Liquidity' transaction='/addliquidity'/>
          <NoTransaction />
        </>        
      }

      { txsStatus && 
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

                      <TransactionLtvDataItem
                        title='Pool Shares'
                        balance={poolShare(pool)}
                        decimals={0}
                      />
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
        </>}
    </>
  )
}

export default PoolsView