import { KTSVG } from "../../_metronic/helpers/components/KTSVG"

const CollateralToken = props => {

  const { tokenIcon, tokenSymbol, tokenName } = props

  return (
    <div className='d-flex align-items-center justify-content-between'>
      <div className='d-flex align-items-center'>
        <div className='symbol symbol-50px'>
          <KTSVG path={ tokenIcon } className='svg-icon svg-icon-5x' />
        </div>
        <div className='d-flex flex-column justify-content-start ps-2'>
          <div className='pe-2 me-2 fs-6' style={{fontFamily: 'PingFangSC-Semibold', color: '#333333'}}>
            { tokenSymbol }
          </div>
          <span className='d-block fs-8' style={{fontFamily: 'PingFangSC-Semibold', color: '#666666'}}>
            { tokenName }
          </span>
        </div>
      </div>
    </div>
  )
}

export default CollateralToken