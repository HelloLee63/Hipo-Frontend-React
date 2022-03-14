import { useEffect, useState } from "react"
import { formatDateTime } from "../../../../utils/date"
import { formatToken, shortenAddr } from "../../../../web3/utils"
import { useBondMarket } from "../../providers/BondMarketProvider"

const TransactionsList = ({ pool }) => {

  const { contract } = useBondMarket()
  const [issueTxs, setIssueTxs] = useState()
  const [repayTxs, setrepayTxs] = useState()
  const [purchaseTxs, setPuchaseTxs] = useState()

  const [withdrawMaturityBondsTxs, setwithdrawMaturityBondsTxs] = useState()
  const [withdrawIMMaturityBondsTxs, setWithdrawIMMaturityBondsTxs] = useState()
  const [addLiquidityTxs, setAddLiquidityTxs] = useState()
  const [removeLiquidityTxs, setRemoveLiquidityTxs] = useState()

  const [txs, setTxs] = useState([])


  const getIssueTxs = async () => {
    let values
    contract.getPastEvents('Issue', {
      fromBlock: 0,
      toBlock: 'latest'
      }, (error, events) => {
        values = events.filter(item => 
          item?.returnValues.bondDuration.toString() === pool.duration.duration && item?.returnValues.bondAsset.toLowerCase() === pool.bondAsset.address
        )
        console.log(values);
        setIssueTxs(() => values)
      })
  }

  const getRepayTxs = async () => {
    let values
    contract.getPastEvents('Repay', {
      fromBlock: 0,
      toBlock: 'latest'
      }, (error, events) => {
        console.log(events);
        values = events.filter(item => 
          item?.returnValues.bondDuration.toString() === pool.duration.duration && item?.returnValues.bondAsset.toLowerCase() === pool.bondAsset.address
        )
        console.log(values);
        setrepayTxs(() => values)
      })
  }

  const getPurchaseTxs = async () => {
    let values
    contract.getPastEvents('Purchase',  {
      fromBlock: 0,
      toBlock: 'latest'
      }, (error, events) => {
        console.log(events);
        values = events.filter(item => 
          item?.returnValues.duration.toString() === pool.duration.duration && item?.returnValues.asset.toLowerCase() === pool.bondAsset.address
        )
        console.log(values);
        setPuchaseTxs(() => values)
      })
  }

  const getWithdrawMaturityBondsTxs = async () => {
    let values
    contract.getPastEvents('WithdrawMaturityBonds', {
      fromBlock: 0,
      toBlock: 'latest'
      }, (error, events) => {
        console.log(events);
        values = events.filter(item => 
          item?.returnValues.bondDuration.toString() === pool.duration.duration && item?.returnValues.bondAsset.toLowerCase() === pool.bondAsset.address
        )
        console.log(values);
        setwithdrawMaturityBondsTxs(() => values)
      })
  }

  const getWithdrawIMMaturityBondsTxs = async () => {
    let values
    contract.getPastEvents('WithdrawImmaturityBonds', {
      fromBlock: 0,
      toBlock: 'latest'
      }, (error, events) => {
        console.log(events);
        values = events.filter(item => 
          item?.returnValues.bondDuration.toString() === pool.duration.duration && item?.returnValues.bondAsset.toLowerCase() === pool.bondAsset.address
        )
        console.log(values);
        setWithdrawIMMaturityBondsTxs(() => values)
      })
  }

  const getAddLiquidityTxs = async () => {
    let values
    contract.getPastEvents('AddLiquidity', {
      fromBlock: 0,
      toBlock: 'latest'
      }, (error, events) => {
        console.log(events);
        values = events.filter(item => 
          item?.returnValues.bondDuration.toString() === pool.duration.duration && item?.returnValues.asset.toLowerCase() === pool.bondAsset.address
        )
        console.log(values);
        setAddLiquidityTxs(() => values)
      })
  }

  const getRemoveLiquidityTxs = async () => {
    let values
    contract.getPastEvents('RemoveLiquidity', {
      fromBlock: 0,
      toBlock: 'latest'
      }, (error, events) => {
        console.log(events);
        values = events.filter(item => 
          item?.returnValues.bondDuration.toString() === pool.duration.duration && item?.returnValues.bondAsset.toLowerCase() === pool.bondAsset.address
        )
        console.log(values);
        setRemoveLiquidityTxs(() => values)
      })
  }
  
  useEffect(() => {
    getIssueTxs()
    // getRepayTxs()

    getPurchaseTxs()
    // getWithdrawMaturityBondsTxs()
    // getWithdrawIMMaturityBondsTxs()

    // getRemoveLiquidityTxs()
    getAddLiquidityTxs()

  }, [])

  useEffect(() => {
    // setTxs(() => issueTxs?.concat(purchaseTxs))
    setTxs(() => issueTxs?.concat(purchaseTxs)?.concat(addLiquidityTxs))
  }, [issueTxs, purchaseTxs, addLiquidityTxs])

  console.log('txs is ', txs);

  const getAccout = (tx) => {
    if (tx?.event === 'Issue') {
      return tx.returnValues.issuer
    }

    if (tx?.event === 'Purchase') {
      return tx.returnValues.investor
    }

    if (tx?.event === 'AddLiquidity') {
      return tx.returnValues.liquidityProvider
    }
  }

  const getAmount = (tx) => {
    if (tx?.event === 'Issue') {
      return tx.returnValues.bondAmount
    }

    if (tx?.event === 'Purchase') {
      return tx.returnValues.bondAmount
    }

    if (tx?.event === 'AddLiquidity') {
      return tx.returnValues.bondAmount
    }
  }

  const getTransactionHash = (tx) => {
    if (tx?.event === 'Issue') {
      return tx.transactionHash
    }

    if (tx?.event === 'Purchase') {
      return tx.transactionHash
    }

    if (tx?.event === 'AddLiquidity') {
      return tx.transactionHash
    }
  }


  return (
    <div className='card'>
      <div className="card-body p-0 py-3">
        <div className="table-responsive">
          <table className="table align-middle gs-0 gy-4">
            <thead>
              <tr className='' style={{fontFamily: 'Montserrat Semi Bold', color: '#96AFFF', fontWeight: 900}}>
                <th className='ps-10 min-w-175px rounded-start'>TRANSACTION TYPE</th>
                <th className='min-w-200px'>ADDRESS</th>
                <th className='min-w-200px'>HASH</th>
                <th className='min-w-150px'>AMOUNT</th>
                <th className='min-w-200px'>TIMESTAMP</th>
              </tr>
            </thead>            

            <tbody style={{color: '#E9E3F4'}}>
            { txs?.map((tx) => (
              <tr key={ getTransactionHash(tx) }>
                <td className="ps-10">
                  <div className='fs-6' style={{fontFamily: 'PingFangSC-Semibold', color: '#333333'}}>
                    { tx?.event }
                  </div>
                </td>
                <td>
                  <div className=' d-block mb-1 fs-6' style={{fontFamily: 'PingFangSC-Semibold', color: '#003EFF'}}>
                    { shortenAddr(getAccout(tx)) }
                  </div>
                </td>
                <td>
                  <div className='d-block mb-1 fs-6' style={{fontFamily: 'PingFangSC-Semibold', color: '#003EFF'}}>
                  { shortenAddr(getTransactionHash(tx)) }
                  {/* {tx?.transactionHash} */}
                  </div>
                </td>
                <td>
                  <div className='d-block mb-1 fs-6 fw-bolder' style={{fontFamily: 'Montserrat-Regular', color: '#333333'}}>
                  { formatToken(getAmount(tx), {scale: pool.bToken.decimals}) }
                  </div>
                  <span className='d-block fs-7' style={{fontFamily: 'PingFangSC-Semibold', color: '#999999'}}>{pool.bondAsset.symbol} Bond</span>
                </td>
                <td>
                  <span className='fs-6 fw-bold' style={{fontFamily: 'Montserrat-Regular', color: '#333333'}}>{formatDateTime(tx?.returnValues.startTimestamp * 1_000)}</span>
                </td>
              </tr>
            ))}
            </tbody>           
          </table>
        </div>
      </div>  
    </div>
  )
}

export default TransactionsList