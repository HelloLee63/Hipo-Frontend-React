import { useEffect, useState } from "react"
import TokenIcon from "../../../../components/token-icon"
import { useFinancingPool } from "../../../../web3/components/providers/FinancingPoolProvider"
import { formatToken, scaleBy } from "../../../../web3/utils"
import { KTSVG } from "../../../../_metronic/helpers/components/KTSVG"
import { useBondPool } from "../../providers/bond-pool-provider"

const ConfirmPurchaseTransaction = ({ prevStep, handleMethod }) => {

  const { pool, purchaseAmount } = useBondPool()
  const financingPool = useFinancingPool()

  const decimals = pool.bondAsset.decimals

  const [transacting, setTransacting] = useState(false)
  const [inputAmount, setInputAmount] = useState(purchaseAmount)


  useEffect(() => {
    setInputAmount(() => purchaseAmount)
  }, [purchaseAmount])
  
  async function handlePurchase() {

    setTransacting(() => true)

    let value = scaleBy(inputAmount, decimals)
    let assetAddress = pool.bondAsset.address
    let duration = Number(pool.duration.duration)

    try {
      await financingPool.financingPoolContract?.purchase(assetAddress, value, duration)
    } catch (e) {}

    setTransacting(() => false)

    handleMethod.goto(5)
  }

  return (    
    <div className='w-100'>
      <div>      
        <div className="card mb-2">
          <div className="card-body pt-3 pb-3">
            <TokenIcon 
              tokenName={ pool.bondAsset.symbol } 
              tokenDesc={ pool.duration.description } 
              tokenIcon={ pool.icon }/>
          </div>
        </div>
        <div className="card mb-2">
          <div className="card-body p-0">
            {transacting ? (
            <div className='text-center' style={{ fontSize: 65}}>
              <div className='align-items-center spinner-grow spinner-grow-sm text-primary'></div>
              <div className='align-items-center spinner-grow spinner-grow-sm text-primary'></div>
              <div className='align-items-center spinner-grow spinner-grow-sm text-primary'></div>
            </div>
            ) : (
            <input
              type='text'
              className='form-control form-control-lg  fw-bolder bg-white border-0 text-primary align-center'
              placeholder='0.0'
              disabled
              name='collateralAssetAmount'
              value={formatToken(inputAmount)}
              style={{ fontSize: 48 }}
            />)}
          </div>       
        </div>
      </div>

      <div className='d-flex flex-stack pt-5'>
        <div className='mr-0'>
          <button
            onClick={prevStep}
            type='button'
            className='btn btn-lg btn-light-primary me-3'
            data-kt-stepper-action='previous'
            disabled={transacting ? true : false}
          >
            <KTSVG
              path='/media/icons/duotune/arrows/arr063.svg'
              className='svg-icon-4 me-1'
            />
            Back
          </button>
        </div>
        <div>
          <button 
            onClick={handlePurchase}              
            type='submit'
            disabled={transacting ? true : false}
            className='btn btn-lg btn-primary me-0'
          >
            <span className='indicator-label'>              
              Confirm
              <KTSVG
                path='/media/icons/duotune/arrows/arr064.svg'
                className='svg-icon-3 ms-2 me-0'
              />
            </span>
          </button>            
        </div>
      </div>                  
    </div> 
  )
}

export default ConfirmPurchaseTransaction