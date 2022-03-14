import { formatPercent, formatToken } from "../../web3/utils"

const TransactionLtvDataItem = props => {
  
  const { title, balance, decimals } = props

  return (
    <div className='d-flex justify-content-between align-items-center pb-7'>      
      <div className='fs-6' style={{fontFamily: 'Montserrat-Regular', color: '#666666'}}>
        { title }
      </div>      
      <span className="fs-6 fw-bolder justify-content-end" style={{fontFamily: 'Montserrat Semi Bold', color: '#333333'}}>
        {formatPercent(formatToken(balance, {scale: decimals}), 4) ?? '-'}
      </span>      
    </div>
  )
}

export default TransactionLtvDataItem