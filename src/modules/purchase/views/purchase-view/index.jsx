import { Form, Formik } from "formik"
import { useEffect, useRef, useState } from "react"
import TitleLable from "../../../../components/title-lable"
import WalletBalanceCard from "../../../../components/wallet-balance-card"
import { useBalanceData } from "../../../../web3/components/providers/BalanceDataProvider"
import { StepperComponent } from "../../../../_metronic/assets/ts/components"
import { BorrowedAsset } from "../../components/steps/BorrowedAsset"
import CompletePurchaseTransaction from "../../components/steps/CompletePurchaseTransaction"
import ConfirmPurchaseTransaction from "../../components/steps/ConfirmPurchaseTransaction"
import { InputPurchaseAmount } from "../../components/steps/InputPurchaseAmount"
import { SelectBondDuration } from "../../components/steps/SelectBondDuration"
import { purchaseInits, purchaseSchemas } from "../../components/TransactionHelper"
import { useBondPool } from "../../providers/bond-pool-provider"

const PurchaseView = () => {

  const { setSymbol, setDuration } = useBondPool()
  
  const stepperRef = useRef(null)
  const stepper = useRef(null)
  const [currentSchema, setCurrentSchema] = useState(purchaseSchemas[0])
  const [initValues] = useState(purchaseInits)

  const { balanceDatas } = useBalanceData()

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

  return (
    <div ref={stepperRef} className='stepper stepper-pills stepper-column' id='kt_create_account_stepper'>
      <div className="row">
        <div className="col-3">
          <TitleLable title='Steps' />
          <div className="card">
            <div className="card-body">
              <div className='stepper-nav'>
                <div className='stepper-item current' data-kt-stepper-element='nav'>
                  <div className='stepper-line w-20px'></div>
                  <div className='stepper-icon w-20px h-20px'>
                    <i className='stepper-check fas fa-check'></i>
                    <span className='stepper-number'>1</span>
                  </div>

                  <div className='stepper-label'>
                    <h3 className='stepper-title'>Select Asset</h3>
                  </div>      
                </div>

                <div className='stepper-item' data-kt-stepper-element='nav'>
                  <div className='stepper-line w-20px'></div>
                  <div className='stepper-icon w-20px h-20px'>
                    <i className='stepper-check fas fa-check'></i>
                    <span className='stepper-number'>2</span>
                  </div>

                  <div className='stepper-label'>
                    <h3 className='stepper-title'>Select Duration</h3>
                  </div>      
                </div>

                <div className='stepper-item' data-kt-stepper-element='nav'>
                  <div className='stepper-line w-20px'></div>
                  <div className='stepper-icon w-20px h-20px'>
                    <i className='stepper-check fas fa-check'></i>
                    <span className='stepper-number'>3</span>
                  </div>

                  <div className='stepper-label'>
                    <h3 className='stepper-title'>Input Amount</h3>
                  </div>      
                </div> 

                <div className='stepper-item' data-kt-stepper-element='nav'>
                  <div className='stepper-line w-20px'></div>
                  <div className='stepper-icon w-20px h-20px'>
                    <i className='stepper-check fas fa-check'></i>
                    <span className='stepper-number'>4</span>
                  </div>

                  <div className='stepper-label'>
                    <h3 className='stepper-title'>Confirm Transaction</h3>
                  </div>      
                </div>

                <div className='stepper-item' data-kt-stepper-element='nav'>
                  <div className='stepper-line w-20px'></div>
                  <div className='stepper-icon w-20px h-20px'>
                    <i className='stepper-check fas fa-check'></i>
                    <span className='stepper-number'>5</span>
                  </div>

                  <div className='stepper-label'>
                    <h3 className='stepper-title'>Complete</h3>
                  </div>      
                </div>                      
              </div>
            </div>
          </div>
        </div>

        <div className="col-5">
          <Formik 
            validationSchema={currentSchema} 
            initialValues={initValues} 
            onSubmit={submitStep}
          >
            {() => (
              <Form noValidate id='kt_create_account_form'>
                <div className="current" data-kt-stepper-element='content'>
                  <BorrowedAsset />
                </div>

                <div data-kt-stepper-element='content'>
                  <SelectBondDuration prevStep={prevStep}/>
                </div>

                <div data-kt-stepper-element='content'>
                  <InputPurchaseAmount prevStep={prevStep} />
                </div>

                <div data-kt-stepper-element='content'>
                  <ConfirmPurchaseTransaction handleMethod={stepper.current} prevStep={prevStep} />
                </div>

                <div data-kt-stepper-element='content'>
                  <CompletePurchaseTransaction  />
                </div>
              </Form>
            )}
          </Formik>
        </div>
        
        <div className="col-4">
          <div className="card">
            <div className="card-body">
              <h6 className="pb-4">Your Wallet</h6>             
              <WalletBalanceCard datas={balanceDatas} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PurchaseView