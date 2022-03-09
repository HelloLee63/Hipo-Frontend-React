import BigNumber from "bignumber.js"
import { useCallback, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import TransactionLink from "../../../../components/button/transaction-link"
import NoTransaction from "../../../../components/no-transaction"
import { useKnownTokens } from "../../../../components/providers/knownTokensProvider"
import { usePools } from "../../../../components/providers/poolsProvider"
import CollateralToken from "../../../../components/token-icon/CollateralToken"
import TransactionAssetDataItem from "../../../../components/transaction-data-item/TransactionAssetDataItem"
import TransactionCollateralDataItem from "../../../../components/transaction-data-item/TransactionCollateralDataItem"
import TransactionLtvDataItem from "../../../../components/transaction-data-item/TransactionLtvDataItem"
import WalletUnconnected from "../../../../components/wallet-unconnected"
import { useWallet } from "../../../../wallets/walletProvider"
import { useProtocolData } from "../../../../web3/components/providers/ProtocolDataProvider"
import { useWalletData } from "../../../../web3/components/providers/WalletDataProvider"
import { useColPool } from "../../../pledge/providers/colPool-provider"

const CollateralsView = () => {

  const walletCtx = useWallet()

  const { collateralPools } = usePools()
  const { setPoolSymbol } = useColPool()

  const protocolData = useProtocolData()  
  const walletData = useWalletData()

  const { getTokenByAddress } = useKnownTokens()

  const [pledgedAmount, setPledgeAmount] = useState()
  
  const [conStatus, setConStatus] = useState(false)
  const [loading, setLoading] = useState(false)
  const [noTxsStatus, setNoTxsStatus] = useState(false)
  const [txsStatus, setTxsStatus] = useState(false)

  const getBalanceOfCollateral = async () => {
    
    let amount = new BigNumber(0)

    if (walletCtx.account) {
      await collateralPools.map(async pool => {
        const value = await pool.contract.balances?.get(walletCtx.account)
        const balance = new BigNumber(value)
        amount = BigNumber.sum(amount, balance)
        console.log(amount);
      })

      console.log(amount);

      return amount
    }    
  }

  useEffect(async () => {
    if (walletCtx.account) {
      const balance = await getBalanceOfCollateral()

      console.log(balance);
      setPledgeAmount(() => new BigNumber(balance))
    }  
  }, [walletCtx.account, 
    collateralPools[0].contract.balances?.get(walletCtx.account),
    collateralPools[1].contract.balances?.get(walletCtx.account),
    collateralPools[2].contract.balances?.get(walletCtx.account)
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

      if (!pledgedAmount && !pledgedAmount?.eq(0)) {
        setLoading(() => true)

        setNoTxsStatus(() => false)
        setTxsStatus(() => false)
        return
      }

      if (pledgedAmount?.gt(0)) {
        setLoading(() => false)

        setNoTxsStatus(() => false)
        setTxsStatus(() => true)
        return
      }

      if (pledgedAmount?.eq(0)) {
        setLoading(() => false)

        setNoTxsStatus(() => true)
        setTxsStatus(() => false)
        return
      }
    }
  }, [walletCtx.account, pledgedAmount])

  function handleCurrenSymbol(symbol) {
    setPoolSymbol(() => symbol)
  }

  return (
    <>
      { loading &&
        <>
          <TransactionLink name='Pledge' transaction='/pledge'/>        
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
          <TransactionLink name='Pledge' transaction='/pledge'/>
          <NoTransaction />
        </>        
      }

      { txsStatus && 
        <>
          <TransactionLink name='Pledge' transaction='/pledge'/>
          <div className='row g-5 g-xl-8'>
            { 
              collateralPools.map(pool =>  (
                pool.contract.balances?.get(walletCtx.account)?.toString() > 0 &&
                <div key={pool.collateralAsset.symbol} className='col-xl-4'>
                  <div className="card mb-2">
                    <div className="card-body pt-3 pb-3">
                      
                      <CollateralToken 
                        tokenIcon={pool.collateralAsset.icon} 
                        tokenSymbol={pool.collateralAsset.symbol} 
                        tokenName={pool.collateralAsset.name} 
                      />
                    </div>
                  </div>
    
                  <div className="card">
                    <div className="card-body">
    
                      <TransactionCollateralDataItem
                        title='Amount'
                        tokenIcon={pool.collateralAsset.icon}
                        balance={pool.contract.balances?.get(walletCtx.account)}
                        decimals={pool.collateralAsset.decimals}
                      />
    
                      <div className='separator my-5'></div>
    
                      <TransactionAssetDataItem 
                        title='Debts'
                        tokenIcon={getTokenByAddress(walletData.getIssuerTotalDebts(pool.collateralAsset.address)?.debtAAddress?.toLowerCase())?.icon}
                        balance={walletData.getIssuerTotalDebts(pool.collateralAsset.address)?.debtAAmount}
                        decimals={getTokenByAddress(walletData.getIssuerTotalDebts(pool.collateralAsset.address)?.debtAAddress?.toLowerCase())?.decimals}
                      />
    
                      <TransactionAssetDataItem 
                        title=''
                        tokenIcon={getTokenByAddress(walletData.getIssuerTotalDebts(pool.collateralAsset.address)?.debtBAddress?.toLowerCase())?.icon}
                        balance={walletData.getIssuerTotalDebts(pool.collateralAsset.address)?.debtBAmount}
                        decimals={getTokenByAddress(walletData.getIssuerTotalDebts(pool.collateralAsset.address)?.debtBAddress?.toLowerCase())?.decimals}
                      />              
    
                      <div className='separator my-5'></div>
    
                      <TransactionLtvDataItem 
                        title='LTV'
                        balance={walletData.getIssuerLtv(pool.collateralAsset.address)?.ltv}
                        decimals={18}
                      />
    
                      <TransactionLtvDataItem 
                        title='Max LTV'
                        balance={protocolData.protocolDataContract.maxLtvMap?.get(pool.collateralAsset.address)}
                        decimals={2}
                      />
    
                      <TransactionLtvDataItem 
                        title='Liquidation Threshold'
                        balance={protocolData.protocolDataContract.thresholdMap.get(pool.collateralAsset.address)}
                        decimals={2}
                      />
                    </div>
                  </div>
    
                  <div className='d-flex flex-stack pt-3'>
                    <Link to='/redeem'>
                      <button onClick={() => handleCurrenSymbol(pool.collateralAsset.symbol)} className='btn btn-lg btn-primary me-0'>
                        <span className='indicator-label'>  
                          Redeem                                   
                        </span>
                      </button>
                    </Link>
    
                    <Link to='/pledge'>
                      <button className='btn btn-lg btn-primary me-0'>
                        <span className='indicator-label'>              
                          Add
                        </span>
                      </button>
                    </Link>
                  </div>       
                </div>))            
            }        
          </div>
        </>
      }      
    </>      
  )
}

export default CollateralsView