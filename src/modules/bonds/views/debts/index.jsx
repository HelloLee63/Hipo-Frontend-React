import BigNumber from "bignumber.js"
import { useEffect, useState } from "react"
import Web3 from "web3"
import { Link } from "../../../../components/button"
import TransactionLink from "../../../../components/button/transaction-link"
import { BondNavTab } from "../../../../components/nav-tab"
import NoTransaction from "../../../../components/no-transaction"
import { useConfig } from "../../../../components/providers/configProvider"
import { usePools } from "../../../../components/providers/poolsProvider"
import TokenIcon from "../../../../components/token-icon"
import TransactionAssetDataItem from "../../../../components/transaction-data-item/TransactionAssetDataItem"
import TransactionCollateralDataItem from "../../../../components/transaction-data-item/TransactionCollateralDataItem"
import TransactionDurationDataItem from "../../../../components/transaction-data-item/TransactionDurationDataItem"
import TransactionLtvDataItem from "../../../../components/transaction-data-item/TransactionLtvDataItem"
import WalletUnconnected from "../../../../components/wallet-unconnected"
import { RPC_HTTPS_URL } from "../../../../networks/rinkeby-testnet"
import { useWallet } from "../../../../wallets/walletProvider"
import { useWalletData } from "../../../../web3/components/providers/WalletDataProvider"
import { FinancingPoolABI } from "../../../../web3/contracts/FinancingPoolContract"
import { useDebtPool } from "../../../issue/providers/debt-pool-provider"

const DebtsView = () => {

  const walletCtx = useWallet()
  const config = useConfig()
  const { bondPools, getCollateralPoolByAddress, getBondPoolByBond } = usePools()
  const { getDebtData, getIssuerLtv  } = useWalletData()
  const { setDebtAssetToken, setDebtDuration, setPoolSymbol, setDebtId } = useDebtPool()

  const [conStatus, setConStatus] = useState(false)
  const [loading, setLoading] = useState(false)
  const [noTxsStatus, setNoTxsStatus] = useState(false)
  const [txsStatus, setTxsStatus] = useState(false)
  
  const address = config.contracts.financingPool.financingPool
  const abi = FinancingPoolABI
  const web3 = new Web3(RPC_HTTPS_URL)
  const contract = new web3.eth.Contract(abi,address)

  const [issueTxs, setIssueTxs] = useState()

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
    if (!walletCtx.account) {
      setConStatus(() => true)
      setLoading(() => false)
      setNoTxsStatus(() => false)
      setTxsStatus(() => false)
      return
    }

    if (walletCtx.account) {
      setConStatus(() => false)

      if (!issueTxs && issueTxs?.length !== 0) {
        setLoading(() => true)

        setNoTxsStatus(() => false)
        setTxsStatus(() => false)
        return
      }

      if (issueTxs?.length > 0) {
        setLoading(() => false)

        setNoTxsStatus(() => false)
        setTxsStatus(() => true)
        return
      }

      if (issueTxs?.length === 0) {
        setLoading(() => false)

        setNoTxsStatus(() => true)
        setTxsStatus(() => false)
        return
      }
    }
  }, [walletCtx.account, issueTxs])

  useEffect(() => {
    if (walletCtx.account) {      
      getIssueTxs()      
    }        
  }, [walletCtx.account])  

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
      { loading &&
        <>
          <div className="d-flex justify-content-between">
            <BondNavTab title1='My Investments' title2='My Debts' className1='' className2='active'/>
            <TransactionLink name='Issue Bond' transaction='/issue'/>        
          </div>        
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
          <div className="d-flex justify-content-between">
            <BondNavTab title1='My Investments' title2='My Debts' className1='' className2='active'/>
            <TransactionLink name='Issue Bond' transaction='/issue'/>        
          </div>
          <NoTransaction />
        </>        
      }

      { txsStatus &&
        <>
          <div className="d-flex justify-content-between">
            <BondNavTab title1='My Investments' title2='My Debts' className1='' className2='active'/>
            <TransactionLink name='Issue Bond' transaction='/issue'/>        
          </div>
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
                      balance={new BigNumber(tx.returnValues.bondAmount).minus(new BigNumber(tx.returnValues.interestAmount))}
                      decimals={getBondPoolByBond(tx.returnValues.bondAsset.toLowerCase(), tx.returnValues.bondDuration.toString()).bondAsset.decimals}
                    />

                    <div className='separator my-7'></div>

                    <TransactionCollateralDataItem
                      title='Collateral' 
                      tokenIcon = {tx.returnValues.collateralAsset ? getCollateralPoolByAddress(tx.returnValues.collateralAsset.toLowerCase()).collateralAsset.icon : undefined}
                      balance = {tx.returnValues.collateralAsset ? getCollateralPoolByAddress(tx.returnValues.collateralAsset.toLowerCase()).contract.balances?.get(walletCtx.account): undefined }
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
            ))}
          </div>
        </>
      }      
    </>
  )
}

export default DebtsView