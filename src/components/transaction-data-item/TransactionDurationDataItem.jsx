import { formatToken } from "../../web3/utils"
import { KTSVG } from "../../_metronic/helpers/components/KTSVG"

const TransactionDurationDataItem = props => {
  
  const { title, duration } = props

  return (
    <div className='d-flex pb-7 justify-content-between align-items-center'>
      <div className="text-muted fw-bolder fs-6 align-self-center">
        {title}
      </div>

      <div className="d-flex justify-content-between symbol symbol-50px">
        <span className="align-self-center text-dark fw-bolder fs-6">{ duration }</span>
      </div>
    </div>
  )
}

export default TransactionDurationDataItem