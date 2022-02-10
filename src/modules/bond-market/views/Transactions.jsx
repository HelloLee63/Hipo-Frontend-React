import { useEffect, useState } from "react"
import { shortenAddr } from "../../../web3/utils"

const Transactions = ({ className }) => {

  const [transactions, setTransactions] = useState()

  useEffect(() => {
    fetch('https://api-rinkeby.etherscan.io/api?module=account&action=txlist&address=0x3376B3f38B2F8DeAaA0FC71aeBc5A2845178d990&startblock=0&endblock=99999999&sort=asc&apikey=T66G8AXRHGVFJ1VWWPM39PDG59Y8V747E7')
      .then(res => res.json())
      .then(data => setTransactions(data))
  },[])

  console.log(transactions?.result);

  return (
    <div className={`card ${className}`}>
      <div className="card-body py-3">
        <div className="table-responsive">
          <table className="table align-middle gs-0 gy-4">
            <thead>
              <tr className="fw-bolder text-muted bg-light">
                <th className='ps-4 min-w-325px rounded-start'>TRANSACTION TYPE</th>
                <th className='min-w-125px'>ADDRESS</th>
                <th className='min-w-125px'>HASH</th>
                <th className='min-w-200px'>AMOUNT</th>
                <th className='min-w-150px'>TIMESTAMP</th>
                <th className='min-w-200px text-end rounded-end'></th>
              </tr>
            </thead>            
            {/* begin::Table body */}
            <tbody>
            { transactions?.result.map((tx) => (
              <tr key={ tx.hash }>
                <td>
                  <div className='d-flex align-items-center'>
                    Add Liquidity
                  </div>
                </td>
                <td>
                  <a href='#' className='text-dark fw-bolder text-hover-primary d-block mb-1 fs-6'>
                    { shortenAddr(tx.from) }
                  </a>
                </td>
                <td>
                  <a href='#' className='text-dark fw-bolder text-hover-primary d-block mb-1 fs-6'>
                    $520
                  </a>
                  <span className='text-muted fw-bold text-muted d-block fs-7'>Rejected</span>
                </td>
                <td>
                  <a href='#' className='text-dark fw-bolder text-hover-primary d-block mb-1 fs-6'>
                    Bradly Beal
                  </a>
                  <span className='text-muted fw-bold text-muted d-block fs-7'>Insurance</span>
                </td>
                <td>
                  <span className='badge badge-light-primary fs-7 fw-bold'>Approved</span>
                </td>
              </tr>
            ))}
            </tbody>           
            {/* end::Table body */}
          </table>
        </div>
      </div>  
    </div>
  )
}

export default Transactions