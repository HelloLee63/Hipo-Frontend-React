import { formatToken } from "../../web3/utils"
import { KTSVG } from "../../_metronic/helpers/components/KTSVG"

const TransactionCollateralDataItem = props => {
  
  const { title, tokenIcon, tokenSymbol, balance, decimals } = props

  return (
    <div className='d-flex justify-content-between align-items-center pb-7'>      
      <div className='text-muted fw-bolder fs-6'>
        { title }
      </div>
      <div className='d-flex justify-content-between symbol symbol-50px'>
        <KTSVG path={ tokenIcon } className='align-self-center pe-10 svg-icon svg-icon-2x ' />
        <span className="fs-6 fw-bolder align-self-center text-dark">{formatToken(balance, {scale: decimals, tokenName: tokenSymbol}) ?? '-'}</span>      
      </div> 

    </div>
  )
}

export default TransactionCollateralDataItem