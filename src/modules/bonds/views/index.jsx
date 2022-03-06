import BigNumber from "bignumber.js"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Web3 from "web3"
import TransactionLink from "../../../components/button/transaction-link"
import { useConfig } from "../../../components/providers/configProvider"
import { usePools } from "../../../components/providers/poolsProvider"
import TokenIcon from "../../../components/token-icon"
import TransactionAssetDataItem from "../../../components/transaction-data-item/TransactionAssetDataItem"
import TransactionCollateralDataItem from "../../../components/transaction-data-item/TransactionCollateralDataItem"
import TransactionDurationDataItem from "../../../components/transaction-data-item/TransactionDurationDataItem"
import { RPC_HTTPS_URL } from "../../../networks/rinkeby-testnet"
import { useWallet } from "../../../wallets/walletProvider"
import { useWalletData } from "../../../web3/components/providers/WalletDataProvider"
import { FinancingPoolABI } from "../../../web3/contracts/FinancingPoolContract"

const BondsView = () => {

  const walletCtx = useWallet()

  const config = useConfig()
  
  const address = config.contracts.financingPool.financingPool
  const abi = FinancingPoolABI
  const web3 = new Web3(RPC_HTTPS_URL)
  const contract = new web3.eth.Contract(abi,address)

  const { getBondPoolByBond } = usePools()
  const { getBalanceOfBToken } = useWalletData()

  const [isInvested, setIsInvested] = useState(false)
  const [purchaseTxs, setPurchaseTxs] = useState()
  const [loading, setLoading] = useState(false)

  const balance = getBalanceOfBToken()

  const getWithdrawAmount = (bondAmount, fees) => BigNumber(bondAmount).minus(BigNumber(fees))

  const getPurchaseTxs = async () => {
    let values
    await contract.getPastEvents('Purchase', {
      fromBlock: 0,
      toBlock: 'latest'
      }, (error, events) => {
        console.log(events);
        values = events.filter(item => 
          item?.returnValues.investor === walletCtx.account
        )
        console.log(values);
        setPurchaseTxs(() => values)
      })
  }

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

  useEffect(() => {
    if(walletCtx.account && isInvested ) {
      setLoading(() => false)
      getPurchaseTxs()
      setLoading(() => true)
    }    
    
  }, [walletCtx, isInvested])

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

  console.log('Purchase Transactions are :', purchaseTxs);

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
          purchaseTxs?.map(tx => (              
              <div key={tx.transactionHash} className='col-xl-4'>
                <div className="card mb-2">
                  <div className="card-body pt-3 pb-3">
                    <TokenIcon 
                      tokenIcon={getBondPoolByBond(tx.returnValues.asset.toLowerCase(), tx.returnValues.duration.toString()).icon} 
                      tokenName={`${getBondPoolByBond(tx.returnValues.asset.toLowerCase(), tx.returnValues.duration.toString()).bondAsset.symbol} Bond`} 
                      tokenDesc={getBondPoolByBond(tx.returnValues.asset.toLowerCase(), tx.returnValues.duration.toString()).duration.description}                
                    />
                  </div>
                </div>

                <div className="card">
                  <div className="card-body">

                    <TransactionDurationDataItem 
                      title='Purchased At'
                      duration={tx.returnValues.startTimestamp ?? '-'}
                    />

                    <TransactionDurationDataItem 
                      title='Matured At'
                      duration={tx.returnValues.startTimestamp ?? '-'}
                    />

                    <TransactionDurationDataItem
                      title='Bond Duration'
                      duration={getBondPoolByBond(tx.returnValues.asset.toLowerCase(), tx.returnValues.duration.toString()).duration.description ?? '-'}
                    />

                    <TransactionCollateralDataItem
                      title='Bonds Amount'
                      tokenIcon={getBondPoolByBond(tx.returnValues.asset.toLowerCase(), tx.returnValues.duration.toString()).icon ?? ''}
                      balance={tx.returnValues.bondAmount}
                      decimals={getBondPoolByBond(tx.returnValues.asset.toLowerCase(), tx.returnValues.duration.toString()).bToken.decimals}
                    />

                    <div className='separator my-7'></div>

                    <TransactionAssetDataItem 
                      title='Principal'
                      tokenIcon={getBondPoolByBond(tx.returnValues.asset.toLowerCase(), tx.returnValues.duration.toString()).bondAsset.icon ?? ''}
                      balance={tx.returnValues.principalAmount}
                      decimals={getBondPoolByBond(tx.returnValues.asset.toLowerCase(), tx.returnValues.duration.toString()).bondAsset.decimals}
                    />

                    <TransactionAssetDataItem 
                      title='Interest Income'
                      tokenIcon={getBondPoolByBond(tx.returnValues.asset.toLowerCase(), tx.returnValues.duration.toString()).bondAsset.icon ?? ''}
                      balance={tx.returnValues.interestAmount}
                      decimals={getBondPoolByBond(tx.returnValues.asset.toLowerCase(), tx.returnValues.duration.toString()).bondAsset.decimals}
                    />

                    <TransactionAssetDataItem 
                      title='Transaction Fees'
                      tokenIcon={getBondPoolByBond(tx.returnValues.asset.toLowerCase(), tx.returnValues.duration.toString()).bondAsset.icon ?? ''}
                      balance={tx.returnValues.investorFee}
                      decimals={getBondPoolByBond(tx.returnValues.asset.toLowerCase(), tx.returnValues.duration.toString()).bondAsset.decimals}
                    />

                    <div className='separator my-7'></div>

                    <TransactionAssetDataItem 
                      title='You can withdraw'
                      tokenIcon={getBondPoolByBond(tx.returnValues.asset.toLowerCase(), tx.returnValues.duration.toString()).bondAsset.icon ?? ''}
                      balance={getWithdrawAmount(tx.returnValues.bondAmount, tx.returnValues.investorFee)}
                      decimals={getBondPoolByBond(tx.returnValues.asset.toLowerCase(), tx.returnValues.duration.toString()).bToken.decimals}
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
        }
      </div>
    </>
  )
}

export default BondsView