import { Form, Formik } from "formik"
import { useEffect, useRef, useState } from "react"
import { useConfig } from "../../../../components/providers/configProvider"
import { StepperComponent } from "../../../../_metronic/assets/ts/components"
import { KTSVG } from "../../../../_metronic/helpers/components/KTSVG"
import { BorrowedAsset } from "../../components/steps/BorrowedAsset"
import { InputPurchaseAmount } from "../../components/steps/InputPurchaseAmount"
import { SelectBondDuration } from "../../components/steps/SelectBondDuration"
import { purchaseInits, purchaseSchemas } from "../../components/TransactionHelper"
import { useBondPool } from "../../providers/bond-pool-provider"

const PurchaseView = props => {

  const { approveVisible, setApproveVisible, setSymbol, setDuration } = useBondPool()
  const bondPoolCtx = useBondPool()
  const config = useConfig()
  const [enabling, setEnabling] = useState(false)

  const stepperRef = useRef(null)
  const stepper = useRef(null)
  const [currentSchema, setCurrentSchema] = useState(purchaseSchemas[0])
  const [initValues] = useState(purchaseInits)

  const loadStepper = () => {
    stepper.current = StepperComponent.createInsance(stepperRef.current)
  }

  const prevStep = () => {
    if (!stepper.current) {
      return
    }

    stepper.current.goPrev()

    setCurrentSchema(purchaseSchemas[stepper.current.currentStepIndex - 1])
  }

  const submitStep = (values, actions) => {

    if (!stepper.current) {
      return
    }

    if(stepper.current.currentStepIndex === 1){
      setSymbol(values.bondAssetType)
    }

    if(stepper.current.currentStepIndex === 2){
      setDuration(values.bondAssetDuration)
    }

    if ( approveVisible) {
      handleEnable()
    }

    setCurrentSchema(purchaseSchemas[stepper.current.currentStepIndex])

    if (stepper.current.currentStepIndex !== stepper.current.totatStepsNumber) {
      stepper.current.goNext()
    } else {
      stepper.current.goto(1)
      actions.resetForm()
    }
  }

  useEffect(() => {
    if (!stepperRef.current) {
      return
    }

    loadStepper()
  }, [stepperRef])

  async function handleEnable() {
    setEnabling(true)

    try {
      await bondPoolCtx.bondPool.bondAsset.contract.approve(config.contracts.financingPool?.financingPool, true)
    } catch {}
    setApproveVisible(false)
    setEnabling(false)
  }

  return (
    <div  ref={stepperRef} className='stepper stepper-pills stepper-column d-flex flex-column flex-xl-row flex-row-fluid' id='kt_create_account_stepper'>
      <div className='d-flex justify-content-center bg-white rounded justify-content-xl-start flex-row-auto w-100 w-xl-300px w-xxl-400px me-9'>
        <div className='px-6 px-lg-10 px-xxl-15 py-20'>
          <div className='stepper-nav'>
            <div className='stepper-item current' data-kt-stepper-element='nav'>
              <div className='stepper-line w-40px'></div>
              <div className='stepper-icon w-40px h-40px'>
                <i className='stepper-check fas fa-check'></i>
                <span className='stepper-number'>1</span>
              </div>

              <div className='stepper-label'>
                <h3 className='stepper-title'>Borrowed  Asset</h3>
                <div className='stepper-desc fw-bold'>Borrowed Asset</div>
              </div>      
            </div>

            <div className='stepper-item' data-kt-stepper-element='nav'>
              <div className='stepper-line w-40px'></div>
              <div className='stepper-icon w-40px h-40px'>
                <i className='stepper-check fas fa-check'></i>
                <span className='stepper-number'>2</span>
              </div>

              <div className='stepper-label'>
                <h3 className='stepper-title'>Select Duration</h3>
                <div className='stepper-desc fw-bold'>Select Duration</div>
              </div>      
            </div>

            <div className='stepper-item' data-kt-stepper-element='nav'>
              <div className='stepper-line w-40px'></div>
              <div className='stepper-icon w-40px h-40px'>
                <i className='stepper-check fas fa-check'></i>
                <span className='stepper-number'>3</span>
              </div>

              <div className='stepper-label'>
                <h3 className='stepper-title'>Input Amount</h3>
                <div className='stepper-desc fw-bold'>Input Amount</div>
              </div>      
            </div>                       
          </div>
        </div>
      </div>

      <div className='d-flex flex-column flex-row-fluid flex-center bg-white rounded'>
        <Formik validationSchema={currentSchema} initialValues={initValues} onSubmit={submitStep}>
          {() => (
            <Form className="py-20 w-100 w-xl-700px px-9" noValidate id='kt_create_account_form'>
              <div className="current" data-kt-stepper-element='content'>
                <BorrowedAsset />
              </div>

              <div data-kt-stepper-element='content'>
                <SelectBondDuration />
              </div>

              <div data-kt-stepper-element='content'>
                <InputPurchaseAmount />
              </div>

              <div className='d-flex flex-stack pt-10'>
                <div className='mr-2'>
                  <button
                    onClick={prevStep}
                    type='button'
                    className='btn btn-lg btn-light-primary me-3'
                    data-kt-stepper-action='previous'
                  >
                    <KTSVG
                      path='/media/icons/duotune/arrows/arr063.svg'
                      className='svg-icon-4 me-1'
                    />
                    Back
                  </button>
                </div>

                <div>
                  <button type='submit' className='btn btn-lg btn-primary me-3'>
                    <span className='indicator-label'>
                      {stepper.current?.currentStepIndex !==
                        stepper.current?.totatStepsNumber - 1 && !approveVisible && 'Continue'}
                      {stepper.current?.currentStepIndex ===
                        stepper.current?.totatStepsNumber - 1 && !approveVisible && 'Submit'}
                      {approveVisible && 'Approve'}
                      <KTSVG
                        path='/media/icons/duotune/arrows/arr064.svg'
                        className='svg-icon-3 ms-2 me-0'
                      />
                    </span>
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div> 
    </div>
  )
}

export default PurchaseView