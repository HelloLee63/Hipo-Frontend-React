import { Form, Formik } from "formik"
import { useEffect, useRef, useState } from "react"
import { StepperComponent } from "../../../../_metronic/assets/ts/components"
import { ConfirmTransaction } from "../../components/steps/ConfirmTransaction"
import { InputAmount } from "../../components/steps/InputAmount"
import { SelectCollateralAsset } from "../../components/steps/SelectCollateralAsset"
import { pledgeInits, pledgeSchemas } from "../../components/TransactionHelper"
import { useColPool } from "../../providers/colPool-provider"

const PledgeView = () => {

  const { poolLable, setPoolLable, pledging } = useColPool()
  const [approveVisible, setApproveVisible] = useState(false)    
  const stepperRef = useRef(null)
  const stepper = useRef(null)
  const [currentSchema, setCurrentSchema] = useState(pledgeSchemas[0])
  const [initValues] = useState(pledgeInits)
  
  
  const loadStepper = () => {
    stepper.current = StepperComponent.createInsance(stepperRef.current)
  }

  const prevStep = () => {

    if(approveVisible) {
      setApproveVisible(preApproveVisible => !preApproveVisible)
    }

    if (!stepper.current) {
      return
    }

    stepper.current.goPrev()

    setCurrentSchema(pledgeSchemas[stepper.current.currentStepIndex - 1])
  }

  const submitStep = (values, actions) => {

    if (!stepper.current) {
      return
    }

    if (stepper.current.currentStepIndex == 1) {
      setPoolLable(values.collateralAssetType)
    }

    setCurrentSchema(pledgeSchemas[stepper.current.currentStepIndex])

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

  return (
    <div>
      <h5 className="pb-1">Steps</h5>
      <div  ref={stepperRef} className='stepper stepper-pills stepper-column d-flex flex-column flex-xl-row flex-row-fluid' id='kt_create_account_stepper'>
        <div className='d-flex justify-content-center bg-white rounded justify-content-xl-start flex-row-auto w-100 w-xl-200px w-xxl-300px me-9'>
          <div className='px-4 px-lg-3 px-xxl-6 py-10'>
            <div className='stepper-nav'>
              <div className='stepper-item current' data-kt-stepper-element='nav'>
                <div className='stepper-line w-20px'></div>
                <div className='stepper-icon w-20px h-20px'>
                  <i className='stepper-check fas fa-check'></i>
                  <span className='stepper-number'>1</span>
                </div>

                <div className='stepper-label d-flex align-content-center'>
                  <h6 className='stepper-title'>Select Collateral Asset</h6>
                  {/* <div className='stepper-desc fw-bold'>Select Collateral Asset</div> */}
                </div>      
              </div>

              <div className='stepper-item' data-kt-stepper-element='nav'>
                <div className='stepper-line w-20px'></div>
                <div className='stepper-icon w-20px h-20px'>
                  <i className='stepper-check fas fa-check'></i>
                  <span className='stepper-number'>2</span>
                </div>

                <div className='stepper-label d-flex align-content-center'>
                  <h6 className='stepper-title'>Input Amount</h6>
                  {/* <div className='stepper-desc fw-bold'>Input Amount</div> */}
                </div>      
              </div>

              <div className='stepper-item' data-kt-stepper-element='nav'>
                <div className='stepper-line w-20px'></div>
                <div className='stepper-icon w-20px h-20px'>
                  <i className='stepper-check fas fa-check'></i>
                  <span className='stepper-number'>3</span>
                </div>

                <div className='stepper-label'>
                  <h6 className='stepper-title'>Confirm Your Transaciton</h6>
                  {/* <div className='stepper-desc fw-bold'>Confirm Your Transaciton</div> */}
                </div>      
              </div>

              <div className='stepper-item' data-kt-stepper-element='nav'>
                <div className='stepper-line w-20px'></div>
                <div className='stepper-icon w-20px h-20px'>
                  <i className='stepper-check fas fa-check'></i>
                  <span className='stepper-number'>4</span>
                </div>

                <div className='stepper-label'>
                  <h6 className='stepper-title'>Transact</h6>
                  {/* <div className='stepper-desc fw-bold'>Transaction</div> */}
                </div>      
              </div>

              <div className='stepper-item' data-kt-stepper-element='nav'>
                <div className='stepper-line w-20px'></div>
                <div className='stepper-icon w-20px h-20px'>
                  <i className='stepper-check fas fa-check'></i>
                  <span className='stepper-number'>5</span>
                </div>

                <div className='stepper-label'>
                  <h6 className='stepper-title'>Completed</h6>
                  {/* <div className='stepper-desc fw-bold'>Completed</div> */}
                </div>      
              </div>

            </div>
          </div>
        </div>
        
        {/* <InputAmount prevStep={prevStep} poolLable={poolLable} approveVisible= {approveVisible} setApproveVisible={setApproveVisible}/> */}

        <div className='d-flex flex-column w-xl-450px rounded'>
          <Formik validationSchema={currentSchema} initialValues={initValues} onSubmit={submitStep}>
            {() => (
              <Form className="w-100 w-xl-420px" noValidate id='kt_create_account_form'>
                <div className="current" data-kt-stepper-element='content'>
                  <SelectCollateralAsset prevStep={prevStep}/>
                </div>

                <div data-kt-stepper-element='content'>                
                  <InputAmount prevStep={prevStep} poolLable={poolLable} approveVisible= {approveVisible} setApproveVisible={setApproveVisible}/>
                </div>

                <div data-kt-stepper-element='content'>
                  <ConfirmTransaction prevStep={prevStep} />
                </div>

              </Form>
            )}
          </Formik>
        </div> 
      </div>
    </div>
  )
}

export default PledgeView