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
          <div className='pe-2 me-2 text-dark fw-bolder text-hover-primary fs-8'>
            { tokenSymbol }
          </div>
          <span className='text-muted fw-bold d-block fs-8'>
            { tokenName }
          </span>
        </div>
      </div>

      <div className="me-3 justify-content-end">
        <span className="fs-7 fw-bolder justify-content-end">{ formatToken(tokenBalance, {scale: decimals}) ?? '-' }</span>
        {/* <span className="text-muted fw-bold d-block fs-8 justify-content-end">{ tokenValue ?? '-' }</span> */}
      </div>
    </div>
  )
}

export default WalletBalance