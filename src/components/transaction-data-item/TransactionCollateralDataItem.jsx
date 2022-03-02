import { formatToken } from "../../web3/utils"
import { KTSVG } from "../../_metronic/helpers/components/KTSVG"

const TransactionCollateralDataItem = props => {
  
  const { title, tokenIcon, tokenSymbol, balance, decimals } = props

  return (
    <div className='d-flex justify-content-between align-items-center pb-7'>      
      <div className='text-muted fw-bolder fs-6'>
        { title }
      </div>
      <div className='symbol symbol-50px ms-2 '>
        <KTSVG path={ tokenIcon } className='svg-icon svg-icon-2x ' />
      </div> 

      <span className="fs-6 fw-bolder justify-content-end">{formatToken(balance, {scale: decimals, tokenName: tokenSymbol}) ?? '-'}</span>      
    </div>
  )
}

export default TransactionCollateralDataItem