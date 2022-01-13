import { KTSVG } from "../../_metronic/helpers/components/KTSVG"

const TokenIcon = ({tokenName, tokenDesc, tokenIcon}) => {
  return (
    <div className='d-flex'>
      <div className='d-flex align-items-center me-3'>
        <KTSVG path={tokenIcon} className='svg-icon svg-icon-3x' />
      </div>
      <div className="d-flex flex-column mt-0">
        <span className="text-gray-800 fs-6 fw-bolder mt-1 p-0">{tokenName}</span>
        <span className="text-gray-400 fs-8 fw-bolder m-0 p-0 ">{tokenDesc}</span>
      </div>
    </div>
  )
}

export default TokenIcon