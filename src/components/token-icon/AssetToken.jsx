import { KTSVG } from "../../_metronic/helpers/components/KTSVG"

const AssetToken = props => {

  const { tokenIcon, tokenSymbol, tokenName } = props

  return (
    <div className='d-flex align-items-center justify-content-between'>
      <div className='d-flex align-items-center'>
        <div className='symbol symbol-50px'>
          <KTSVG path={ tokenIcon } className='svg-icon svg-icon-3x' />
        </div>
        <div className='d-flex flex-column justify-content-start ps-2'>
          <div className='pe-2 me-2 text-dark fw-bolder fs-6'>
            { tokenSymbol }
          </div>
          <span className='text-muted fw-bold d-block fs-8'>
            { tokenName }
          </span>
        </div>
      </div>
    </div>
  )
}

export default AssetToken