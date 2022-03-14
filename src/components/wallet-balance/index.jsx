import { formatToken } from "../../web3/utils"
import { KTSVG } from "../../_metronic/helpers/components/KTSVG"

const WalletBalance = props => {

  const { tokenIcon, tokenSymbol, tokenName, tokenBalance, decimals, tokenValue } = props

  return (
    <div className='d-flex align-items-center p-1 mb-2 justify-content-between bg-info rounded'>
      <div className='d-flex align-items-center'>
        <div className='symbol symbol-50px ms-2'>
          <KTSVG path={ tokenIcon } className='svg-icon svg-icon-2x' />
        </div>
        <div className='d-flex flex-column justify-content-start ps-2'>
          <div className='pe-2 me-2 fw-bolder fs-7' style={{fontFamily: 'PingFangSC-Semibold', color: '#333333'}}>
            { tokenSymbol }
          </div>
          <span className='fw-bold d-block fs-8' style={{fontFamily: 'PingFangSC-Semibold', color: '#666666'}}>
            { tokenName }
          </span>
        </div>
      </div>

      <div className="me-3 justify-content-end">
        <span className="fs-7 fw-bolder justify-content-end" style={{fontFamily: 'Montserrat-Regular', color: '#333333'}}>{ formatToken(tokenBalance, {scale: decimals}) ?? '-' }</span>
        {/* <span className="text-muted fw-bold d-block fs-8 justify-content-end">{ tokenValue ?? '-' }</span> */}
      </div>
    </div>
  )
}

export default WalletBalance