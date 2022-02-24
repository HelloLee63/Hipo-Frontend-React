import { useWeb3React } from "@web3-react/core"
import { useEffect, useState } from "react"
import useSWR from "swr"
import { shortenAddr } from "../../../web3/utils"

const Transactions = ({ className }) => {

  const [transactions, setTransactions] = useState()
  const [transactionDataByHash, setTransactionDataByHash] = useState()

  const fetcher = (library) => (...args) => {
    const [method, ...params] = args
    console.log(args);
    console.log(method, params);
    console.log(method);
    console.log(params);
    console.log(library[method]);
    return library[method](...params)
  }

  const Balance = () => {
    const { account, library } = useWeb3React()
    console.log(account);
    console.log(library);
    const { data: balance } = useSWR(['getBalance', account, 'latest'], {fetcher: fetcher(library),})
    const data = useSWR(['getBalance', account, 'latest'], {fetcher: fetcher(library),})
    console.log(data);
    console.log(balance);
    if (balance) {
      return <div>...</div>
    }

    return <div>Balance: {balance?.toString()}</div>
  }

  useEffect(() => {
    fetch('https://api-rinkeby.etherscan.io/api?module=account&action=txlist&address=0x3376B3f38B2F8DeAaA0FC71aeBc5A2845178d990&startblock=0&endblock=99999999&sort=asc&apikey=T66G8AXRHGVFJ1VWWPM39PDG59Y8V747E7')
      .then(res => res.json())
      .then(data => setTransactions(data))
  }, [])

  // useEffect(() => {
  //   fetch('https://api-rinkeby.etherscan.io/api?module=proxy&action=eth_getTransactionReceipt&txhash=0xfff41398f369e3a7c8384ba9b22c048a872bdd5e1e717c0969a2bba2de2bd4a0&apikey=T66G8AXRHGVFJ1VWWPM39PDG59Y8V747E7')
  //     .then(res => res.json())
  //     .then(data => setTransactionDataByHash(data))
  // }, [])

  console.log(transactions?.result);
  console.log(transactionDataByHash?.result);


  return (
    <div className={`card ${className}`}>
      <div className="card-body py-3">
        <Balance />
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