import { Form, Formik } from "formik"
import { useEffect, useRef, useState } from "react"
import { StepperComponent } from "../../../../_metronic/assets/ts/components"
import { ConfirmTransaction } from "../../components/steps/ConfirmTransaction"
import { InputDebtAssetAmount } from "../../components/steps/InputDebtAmount"
import SelectCollateral from "../../components/steps/SelectCollateral"
import SelectDebtAsset from "../../components/steps/SelectDebtAsset"
import { SelectDebtDuration } from "../../components/steps/SelectDebtDuration"
import { issueInits, issueSchemas } from "../../components/TransactionHelper"
import { useDebtPool } from "../../providers/debt-pool-provider"

const IssueWizards = () => {

  const debtPoolCtx = useDebtPool()
  const stepperRef = useRef(null)
  const stepper = useRef(null)
  const [currentSchema, setCurrentSchema] = useState(issueSchemas[0])
  const [initValues] = useState(issueInits)

  const loadStepper = () => {
    stepper.current = StepperComponent.createInsance(stepperRef.current)
  }

  const prevStep = () => {
    if (!stepper.current) {
      return
    }

    stepper.current.goPrev()

    setCurrentSchema(issueSchemas[stepper.current.currentStepIndex - 1])
  }

  const submitStep = (values, actions) => {

    if(stepper.current.currentStepIndex === 1) {
      debtPoolCtx.setPoolSymbol(values.collateralAssetType)
    }

    if(stepper.current.currentStepIndex === 2) {
      debtPoolCtx.setDebtAssetToken(values.debtAssetType)
    }

    if(stepper.current.currentStepIndex === 3) {
      debtPoolCtx.setDebtDuration(values.debtDuration)
    }

    if (!stepper.current) {
      return
    }

    setCurrentSchema(issueSchemas[stepper.current.currentStepIndex])

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
    <div ref={stepperRef} className="stepper stepper-pills stepper-column d-flex flex-column flex-xl-row flex-row-fluid" id='hipo_issue_bond_stepper'>
      <div className="d-flex justify-content-center bg-white rounded justify-content-xl-start flex-row-auto w-100 w-xl-300px w-xxl-400px me-9">
        <div className='px-6 px-lg-10 px-xxl-15 py-20'>          
          <div className="stepper-nav">
            {/* step 1 start: */}
            <div className='stepper-item current' data-kt-stepper-element='nav'>
              <div className='stepper-line w-40px'></div>

              <div className='stepper-icon w-40px h-40px'>
                <i className='stepper-check fas fa-check'></i>
                <span className='stepper-number'>1</span>
              </div>

              <div className='stepper-label'>
                <h3 className='stepper-title'>Select Collateral</h3>
                {/* <div className='stepper-desc fw-bold'>Select Collateral Asset</div> */}
              </div>      
            </div>
            {/* step 1 end */}

            {/* step 2 start: */}
            <div className='stepper-item' data-kt-stepper-element='nav'>
              <div className='stepper-line w-40px'></div>

              <div className='stepper-icon w-40px h-40px'>
                <i className='stepper-check fas fa-check'></i>
                <span className='stepper-number'>2</span>
              </div>

              <div className='stepper-label'>
                <h3 className='stepper-title'>Select Asset</h3>
                {/* <div className='stepper-desc fw-bold'>Select Asset</div> */}
              </div>      
            </div>
            {/* step 2 end */}

            {/* step 3 start: */}
            <div className='stepper-item' data-kt-stepper-element='nav'>
              <div className='stepper-line w-40px'></div>

              <div className='stepper-icon w-40px h-40px'>
                <i className='stepper-check fas fa-check'></i>
                <span className='stepper-number'>3</span>
              </div>

              <div className='stepper-label'>
                <h3 className='stepper-title'>Select Duration</h3>
                {/* <div className='stepper-desc fw-bold'>Select Duration</div> */}
              </div>      
            </div>
            {/* step 3 end */}

            {/* step 4 start: */}
            <div className='stepper-item' data-kt-stepper-element='nav'>
              <div className='stepper-line w-40px'></div>

              <div className='stepper-icon w-40px h-40px'>
                <i className='stepper-check fas fa-check'></i>
                <span className='stepper-number'>4</span>
              </div>

              <div className='stepper-label'>
                <h3 className='stepper-title'>Input Amount</h3>
                {/* <div className='stepper-desc fw-bold'>Input Amount</div> */}
              </div>      
            </div>
            {/* step 4 end */}

            {/* step 5 start: */}
            <div className='stepper-item' data-kt-stepper-element='nav'>
              <div className='stepper-line w-40px'></div>

              <div className='stepper-icon w-40px h-40px'>
                <i className='stepper-check fas fa-check'></i>
                <span className='stepper-number'>5</span>
              </div>

              <div className='stepper-label'>
                <h3 className='stepper-title'>Confirm Your Transaction</h3>
                {/* <div className='stepper-desc fw-bold'>Input Amount</div> */}
              </div>      
            </div>
            {/* step 5 end */}

          </div>
        </div>        
      </div>

      <div className="d-flex flex-column flex-row-fluid flex-center bg-white rounded">
        <Formik validationSchema={currentSchema} initialValues={initValues} onSubmit={submitStep}>
            {() => (
              <Form className="py-20 w-100 w-xl-700px px-9" noValidate id='kt_create_account_form'>
                <div className="current" data-kt-stepper-element='content'>
                  <SelectCollateral  prevStep={prevStep} />
                </div>

                <div data-kt-stepper-element='content'>
                  <SelectDebtAsset prevStep={prevStep} />
                </div>

                <div data-kt-stepper-element='content'>
                  <SelectDebtDuration prevStep={prevStep} />
                </div>

                <div data-kt-stepper-element='content'>
                  <InputDebtAssetAmount prevStep={prevStep} />
                </div>

                <div data-kt-stepper-element='content'>
                  <ConfirmTransaction prevStep={prevStep} />
                </div>
              </Form>
            )}
        </Formik>
      </div> 
    </div>
  )
}

export default IssueWizards