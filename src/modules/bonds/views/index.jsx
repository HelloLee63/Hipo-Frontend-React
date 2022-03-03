import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import TransactionLink from "../../../components/button/transaction-link"
import { usePools } from "../../../components/providers/poolsProvider"
import TokenIcon from "../../../components/token-icon"
import TransactionAssetDataItem from "../../../components/transaction-data-item/TransactionAssetDataItem"
import TransactionDurationDataItem from "../../../components/transaction-data-item/TransactionDurationDataItem"
import { useWallet } from "../../../wallets/walletProvider"
import { useWalletData } from "../../../web3/components/providers/WalletDataProvider"

const BondsView = () => {

  const walletCtx = useWallet()

  const { bondPools } = usePools()
  const { getBondsList, getBondData, getBalanceOfBToken } = useWalletData()

  const [isInvested, setIsInvested] = useState(false)

  const balance = getBalanceOfBToken()

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
      <div>No Pledged</div>
    )
  }

  if (!walletCtx.account) {
    return (
      <div>Please Connect Your Wallet</div>
    )
  }

  return (
    <>
      <div className="d-flex justify-content-between">
        <div>
          <Link to='/investments'>
            <button>My Investments</button>
          </Link>
          <Link to='/debts'>
            <button>My Debts</button>
          </Link>
        </div>        
        <TransactionLink name='Issue Bond' transaction='/issue'/>        
      </div>
        
      <div className='row g-5 g-xl-8'>
        { 
          bondPools.map(pool => (
            getBondsList(pool)?.map((obj) => (
              
              <div key={obj} className='col-xl-4'>
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

                    <TransactionDurationDataItem 
                      title='Purchased At'
                      duration={getBondData(pool, obj)?.bondData[2] ?? '-'}
                    />

                    <TransactionDurationDataItem 
                      title='Matured At'
                      duration={getBondData(pool, obj)?.bondData[2] ?? '-'}
                    />

                    <TransactionDurationDataItem
                      title='Bond Duration'
                      duration={pool.duration.description ?? '-'}
                    />

                    <div className='separator my-7'></div>

                    <TransactionAssetDataItem 
                      title='You can withdraw'
                      tokenIcon={pool.bondAsset.icon ?? ''}
                      balance={getBondData(pool, obj)?.bondData[0]}
                      decimals={pool.bToken.decimals}
                    />

                    <TransactionAssetDataItem 
                      title='Principal'
                      tokenIcon={pool.bondAsset.icon ?? ''}
                      balance={getBondData(pool, obj)?.bondData[1]}
                      decimals={pool.bToken.decimals}
                    />
                  </div>
                </div>
                
                <Link to='/redeem'>
                  <div className='d-grid pt-3'>

                  <button type='button' className='btn btn-primary'>
                    <span className='indicator-label'>                    
                      Withdraw                                   
                    </span>
                  </button>
                  </div> 
                </Link>                      
              </div>
            ))
          ))                       
        }
      </div>
    </>
  )
}

export default BondsView