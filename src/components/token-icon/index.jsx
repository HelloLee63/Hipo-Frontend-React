import { KTSVG } from "../../_metronic/helpers/components/KTSVG"

const TokenIcon = ({tokenName, tokenDesc, tokenIcon}) => {
  return (
    <div className='d-flex align-items-center'>
      <div className='symbol symbol-50px'>
        <KTSVG path={tokenIcon} className='svg-icon svg-icon-5x' />
      </div>
      <div className='d-flex justify-content-start flex-column'>
        <div className='pe-2 me-2 fw-bolder mb-1 fs-6' style={{fontFamily: 'PingFangSC-Semibold', color: '#333333'}}>
          { tokenName }
        </div>
        <span className='d-block fs-7' style={{fontFamily: 'PingFangSC-Semibold', color: '#666666'}}>
          { tokenDesc }
        </span>
      </div>
    </div>
  )
}

export default TokenIcon