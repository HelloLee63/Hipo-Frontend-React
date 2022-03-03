import { useEffect, useState } from "react"
import { Link } from "../../../../components/button"
import TransactionLink from "../../../../components/button/transaction-link"
import { usePools } from "../../../../components/providers/poolsProvider"
import TokenIcon from "../../../../components/token-icon"
import TransactionAssetDataItem from "../../../../components/transaction-data-item/TransactionAssetDataItem"
import TransactionCollateralDataItem from "../../../../components/transaction-data-item/TransactionCollateralDataItem"
import TransactionDurationDataItem from "../../../../components/transaction-data-item/TransactionDurationDataItem"
import TransactionLtvDataItem from "../../../../components/transaction-data-item/TransactionLtvDataItem"
import { useWallet } from "../../../../wallets/walletProvider"
import { useWalletData } from "../../../../web3/components/providers/WalletDataProvider"
import { useDebtPool } from "../../../issue/providers/debt-pool-provider"

const DebtsView = () => {

  const walletCtx = useWallet()
  const { setDebtAssetToken, setDebtDuration, setPoolSymbol, setDebtId } = useDebtPool()

  const { bondPools, getCollateralPoolByAddress } = usePools()

  const { getBalanceOfDToken, getDebtsList, getDebtData, getIssuerLtv  } = useWalletData()

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

  function handleCurrentSymbol(id, pool) {

    const debtData = getDebtData(pool, id)
    const collateralPool = getCollateralPoolByAddress(debtData.data[2])
    
    setPoolSymbol(() => collateralPool.collateralAsset.symbol)
    // setDebtAssetToken(() => pool.bondAsset.symbol)
    // setDebtDuration(() => pool.duration.duration)

    setDebtAssetToken(() => bondPools[7].bondAsset.symbol)
    console.log();
    setDebtDuration(() => pool.duration.duration)
    setDebtId(() => id)
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
                    title='Purchase At'
                    balance={getDebtData(pool, id)?.data[0]}
                    decimals={0}
                  />

                  <TransactionAssetDataItem 
                    title='Matured At'
                    balance={getDebtData(pool, id)?.data[0]}
                    decimals={0}
                  />

                  <TransactionDurationDataItem 
                    title='Duration'
                    duration={pool.duration.description}
                  />

                  <TransactionAssetDataItem 
                    title='Deadline'
                    balance={getDebtData(pool, id)?.data[0]}
                    decimals={0}
                  />

                  <div className='separator my-7'></div>

                  <TransactionAssetDataItem 
                    title='You Need Pay'
                    tokenIcon={pool.bondAsset.icon}
                    balance={getDebtData(pool, id)?.data[1]}
                    decimals={pool.bondAsset.decimals}
                  />

                  <div className='separator my-7'></div>

                  <TransactionCollateralDataItem
                    title='Collateral' 
                    tokenIcon = {getDebtData(pool, id)?.data[2] ? getCollateralPoolByAddress(getDebtData(pool, id)?.data[2]).collateralAsset.icon : undefined}
                    balance = {getDebtData(pool, id)?.data[2] ? getCollateralPoolByAddress(getDebtData(pool, id)?.data[2]).collateralAsset.contract.balances?.get(walletCtx.account): undefined }
                    decimals = {getDebtData(pool, id)?.data[2] ? getCollateralPoolByAddress(getDebtData(pool, id)?.data[2]).collateralAsset.decimals : undefined}
                  />

                  <TransactionLtvDataItem 
                    title='Your Collateral LTV'
                    balance={getDebtData(pool, id)?.data[2] ? getIssuerLtv(getCollateralPoolByAddress(getDebtData(pool, id)?.data[2]).collateralAsset.address)?.ltv : undefined}
                    decimals={18}
                  />
                </div>
              </div>
              <Link to='/repay'>
                <div className='d-grid pt-3'>                  
                  <button onClick={() => handleCurrentSymbol(id, pool)} className='btn btn-primary'>                                
                    Repay
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

export default DebtsView