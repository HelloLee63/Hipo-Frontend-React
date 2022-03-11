import { useEffect, useState } from "react"
import { formatDateTime } from "../../../../utils/date"
import { formatToken, shortenAddr } from "../../../../web3/utils"
import { useBondMarket } from "../../providers/BondMarketProvider"

const TransactionsList = ({ pool }) => {

  const { contract } = useBondMarket()
  const [issueTxs, setIssueTxs] = useState()
  const [repayTxs, setrepayTxs] = useState()
  const [puchaseTxs, setPuchaseTxs] = useState()

  const [withdrawMaturityBondsTxs, setwithdrawMaturityBondsTxs] = useState()
  const [withdrawIMMaturityBondsTxs, setWithdrawIMMaturityBondsTxs] = useState()
  const [addLiquidityTxs, setAddLiquidityTxs] = useState()
  const [removeLiquidityTxs, setRemoveLiquidityTxs] = useState()


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
    contract.getPastEvents('Purchase', {
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
            { issueTxs?.map((tx) => (
              <tr key={ tx.transactionHash }>
                <td className="ps-8">
                  <div className='badge badge-light-primary fs-6 fw-bold'>
                    { tx?.event }
                  </div>
                </td>
                <td>
                  <div className='text-primary fw-bolder text-hover-primary d-block mb-1 fs-6'>
                    { shortenAddr(tx.returnValues.issuer) }
                  </div>
                </td>
                <td>
                  <div className='text-primary fw-bolder text-hover-primary d-block mb-1 fs-6'>
                  { shortenAddr(tx.transactionHash) }
                  </div>
                </td>
                <td>
                  <div className='text-dark fw-bolder text-hover-primary d-block mb-1 fs-6'>
                  { formatToken(tx.returnValues.bondAmount, {scale: pool.bToken.decimals}) }
                  </div>
                  {/* <span className='text-muted fw-bold text-muted d-block fs-7'>Insurance</span> */}
                </td>
                <td>
                  <span className='badge badge-light-primary fs-6 fw-bold'>{formatDateTime(tx.returnValues.startTimestamp * 1_000)}</span>
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