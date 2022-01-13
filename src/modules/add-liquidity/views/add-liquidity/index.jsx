import { Form, Formik, FormikValues } from "formik"
import { useEffect, useRef, useState } from "react"
import { StepperComponent } from "../../../../_metronic/assets/ts/components"
import { KTSVG } from "../../../../_metronic/helpers/components/KTSVG"
import { InputAssetAmount } from "../../components/steps/InputAssetAmount"
import { SelectAsset } from "../../components/steps/SelectAsset"
import { SelectDuration } from "../../components/steps/SelectDuration"
import { addLiquidityInits, addLiquiditySchemas } from "../../components/TransactionHelper"

const AddLiquidityView = () => {

  const stepperRef = useRef(null)
  const stepper = useRef(null)
  const [currentSchema, setCurrentSchema] = useState(addLiquiditySchemas[0])
  const [initValues] = useState(addLiquidityInits)

  const loadStepper = () => {
    stepper.current = StepperComponent.createInsance(stepperRef.current)
  }

  const prevStep = () => {
    if (!stepper.current) {
      return
    }

    stepper.current.goPrev()

    setCurrentSchema(addLiquiditySchemas[stepper.current.currentStepIndex - 1])
  }

  const submitStep = (values, actions) => {
    if (!stepper.current) {
      return
    }

    setCurrentSchema(addLiquiditySchemas[stepper.current.currentStepIndex])

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
                <h3 className='stepper-title'>Select Asset</h3>
                <div className='stepper-desc fw-bold'>Select Asset</div>
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
                <SelectAsset />                                
              </div>

              <div data-kt-stepper-element='content'>
                <SelectDuration />
              </div>

              <div data-kt-stepper-element='content'>
                <InputAssetAmount />
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
                        stepper.current?.totatStepsNumber - 1 && 'Continue'}
                      {stepper.current?.currentStepIndex ===
                        stepper.current?.totatStepsNumber - 1 && 'Submit'}
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

export default AddLiquidityView