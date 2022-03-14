import { formatToken } from "../../web3/utils"
import { KTSVG } from "../../_metronic/helpers/components/KTSVG"

const TransactionAssetDataItem = props => {
  
  const { title, tokenIcon, balance, decimals } = props

  return (
    <div className='d-flex pb-7 justify-content-between align-items-center'>
      <div className="fs-6 align-self-center" style={{fontFamily: 'Montserrat-Regular', color: '#666666'}}>
        {title}
      </div>

      <div className="d-flex justify-content-between symbol symbol-50px">
        <KTSVG path={ tokenIcon } className='align-self-center pe-10 svg-icon svg-icon-1x' />

        
        <span className="align-self-center fw-bolder fs-6" style={{fontFamily: 'Montserrat Semi Bold', color: '#333333'}}>
          { formatToken(balance, {scale: decimals}) ?? '-' }
        </span>
      </div>
    </div>
  )
}

export default TransactionAssetDataItem