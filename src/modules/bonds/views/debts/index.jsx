import { useEffect, useState } from "react"
import Web3 from "web3"
import { Link } from "../../../../components/button"
import TransactionLink from "../../../../components/button/transaction-link"
import { useConfig } from "../../../../components/providers/configProvider"
import { usePools } from "../../../../components/providers/poolsProvider"
import TokenIcon from "../../../../components/token-icon"
import TransactionAssetDataItem from "../../../../components/transaction-data-item/TransactionAssetDataItem"
import TransactionCollateralDataItem from "../../../../components/transaction-data-item/TransactionCollateralDataItem"
import TransactionDurationDataItem from "../../../../components/transaction-data-item/TransactionDurationDataItem"
import TransactionLtvDataItem from "../../../../components/transaction-data-item/TransactionLtvDataItem"
import { RPC_HTTPS_URL } from "../../../../networks/rinkeby-testnet"
import { useWallet } from "../../../../wallets/walletProvider"
import { useWalletData } from "../../../../web3/components/providers/WalletDataProvider"
import { FinancingPoolABI } from "../../../../web3/contracts/FinancingPoolContract"
import { useDebtPool } from "../../../issue/providers/debt-pool-provider"

const DebtsView = () => {

  const walletCtx = useWallet()

  const config = useConfig()
  
  const address = config.contracts.financingPool.financingPool
  const abi = FinancingPoolABI
  const web3 = new Web3(RPC_HTTPS_URL)
  const contract = new web3.eth.Contract(abi,address)

  const { setDebtAssetToken, setDebtDuration, setPoolSymbol, setDebtId } = useDebtPool()

  const { bondPools, getCollateralPoolByAddress, getBondPoolByBond } = usePools()

  const { getBalanceOfDToken, getDebtData, getIssuerLtv  } = useWalletData()

  const [isIssued, setIsIssued] = useState(false)

  const [issueTxs, setIssueTxs] = useState()
  const [loading, setLoading] = useState(false)


  const balance = getBalanceOfDToken()

  const getIssueTxs = async () => {
    let values
    await contract.getPastEvents('Issue', {
      fromBlock: 0,
      toBlock: 'latest'
      }, (error, events) => {
        console.log(events);
        values = events.filter(item => 
          item?.returnValues.issuer === walletCtx.account
        )
        console.log(values);
        setIssueTxs(() => values)
      })
  }

  useEffect(() => {    

    if(walletCtx.account) {
      if(balance?.gt(0)) {
        setIsIssued(() => true)
      }
  
      if(balance?.eq(0) || balance?.isNaN()) {
        setIsIssued(() => false)
      }
    }

  }, [walletCtx.account, balance])

  useEffect(() => {
    if(walletCtx.account && isIssued ) {
      setLoading(() => false)
      getIssueTxs()
      setLoading(() => true)
    }    
    
  }, [walletCtx, isIssued])

  if (walletCtx.account && !isIssued) {
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
        { issueTxs?.map(tx => (
            <div key={tx.transactionHash} className='col-xl-4'>
              <div className="card mb-2">
                <div className="card-body pt-3 pb-3">
                  <TokenIcon 
                    tokenIcon={getBondPoolByBond(tx.returnValues.bondAsset.toLowerCase(), tx.returnValues.bondDuration.toString()).icon} 
                    tokenName={getBondPoolByBond(tx.returnValues.bondAsset.toLowerCase(), tx.returnValues.bondDuration.toString()).bondAsset.symbol} 
                    tokenDesc={getBondPoolByBond(tx.returnValues.bondAsset.toLowerCase(), tx.returnValues.bondDuration.toString()).duration.description}                
                  />
                </div>
              </div>

              <div className="card">
                <div className="card-body">
                  <TransactionDurationDataItem
                    title='Purchase At'
                    duration={tx.returnValues.startTimestamp ?? '-'}
                  />

                  <TransactionDurationDataItem
                    title='Matured At'
                    duration={tx.returnValues.startTimestamp ?? '-'}
                  />

                  <TransactionDurationDataItem 
                    title='Duration'
                    duration={getBondPoolByBond(tx.returnValues.bondAsset.toLowerCase(), tx.returnValues.bondDuration.toString()).duration.description ?? '-'}
                  />

                  <TransactionDurationDataItem 
                    title='Deadline'
                    duration={tx.returnValues.startTimestamp ?? '-'}
                  />

                  <div className='separator my-7'></div>

                  <TransactionCollateralDataItem
                      title='Bonds Amount'
                      tokenIcon={getBondPoolByBond(tx.returnValues.bondAsset.toLowerCase(), tx.returnValues.bondDuration.toString()).icon ?? ''}
                      balance={tx.returnValues.bondAmount}
                      decimals={getBondPoolByBond(tx.returnValues.bondAsset.toLowerCase(), tx.returnValues.bondDuration.toString()).dToken.decimals}
                    />

                  <TransactionAssetDataItem 
                    title='Interest (paid)'
                    tokenIcon={getBondPoolByBond(tx.returnValues.bondAsset.toLowerCase(), tx.returnValues.bondDuration.toString()).bondAsset.icon}
                    balance={tx.returnValues.interestAmount}
                    decimals={getBondPoolByBond(tx.returnValues.bondAsset.toLowerCase(), tx.returnValues.bondDuration.toString()).bondAsset.decimals}
                  />

                  <TransactionAssetDataItem 
                    title='You Need Pay'
                    tokenIcon={getBondPoolByBond(tx.returnValues.bondAsset.toLowerCase(), tx.returnValues.bondDuration.toString()).bondAsset.icon}
                    balance={getBondPoolByBond(tx.returnValues.bondAsset.toLowerCase(), tx.returnValues.bondDuration.toString()).dToken.contract.balances?.get(walletCtx.account)}
                    decimals={getBondPoolByBond(tx.returnValues.bondAsset.toLowerCase(), tx.returnValues.bondDuration.toString()).bondAsset.decimals}
                  />

                  <div className='separator my-7'></div>

                  <TransactionCollateralDataItem
                    title='Collateral' 
                    tokenIcon = {tx.returnValues.collateralAsset ? getCollateralPoolByAddress(tx.returnValues.collateralAsset.toLowerCase()).collateralAsset.icon : undefined}
                    balance = {tx.returnValues.collateralAsset ? getCollateralPoolByAddress(tx.returnValues.collateralAsset.toLowerCase()).collateralAsset.contract.balances?.get(walletCtx.account): undefined }
                    decimals = {tx.returnValues.collateralAsset ? getCollateralPoolByAddress(tx.returnValues.collateralAsset.toLowerCase()).collateralAsset.decimals : undefined}
                  />

                  <TransactionLtvDataItem 
                    title='Your Collateral LTV'
                    balance={tx.returnValues.collateralAsset ? getIssuerLtv(getCollateralPoolByAddress(tx.returnValues.collateralAsset.toLowerCase()).collateralAsset.address)?.ltv : undefined}
                    decimals={18}
                  />
                </div>
              </div>
              <Link to='/repay'>
                <div className='d-grid pt-3'>
                {/* onClick={() => handleCurrentSymbol(id, pool)}                   */}
                  <button  className='btn btn-primary'>                                
                    Repay
                  </button>                 
                </div>
              </Link>                      
            </div>                      
        ))
        }
      </div>
    </>
  )
}

export default DebtsView