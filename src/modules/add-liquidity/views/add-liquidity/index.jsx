import { Form, Formik } from "formik"
import { useEffect, useRef, useState } from "react"
import { useKnownTokens } from "../../../../components/providers/knownTokensProvider"
import { useWallet } from "../../../../wallets/walletProvider"
import { formatToken } from "../../../../web3/utils"
import { StepperComponent } from "../../../../_metronic/assets/ts/components"
import { KTSVG } from "../../../../_metronic/helpers/components/KTSVG"
import CompleteAddTransaction from "../../components/steps/CompleteAddTransaction"
import { ConfirmAddTransaction } from "../../components/steps/ConfirmAddTransaction"
import { InputAssetAmount } from "../../components/steps/InputAssetAmount"
import { SelectAsset } from "../../components/steps/SelectAsset"
import { SelectDuration } from "../../components/steps/SelectDuration"
import { addLiquidityInits, addLiquiditySchemas } from "../../components/TransactionHelper"
import { useLiquidityPool } from "../../providers/liquidity-pool-provider"


const AddLiquidityView = () => {

  const walletCtx = useWallet()

  const { setAssetSymbol, setDuration } = useLiquidityPool()

  const stepperRef = useRef(null)
  const stepper = useRef(null)
  const [currentSchema, setCurrentSchema] = useState(addLiquiditySchemas[0])
  const [initValues] = useState(addLiquidityInits)

  const { 
    wethToken, 
    usdcToken, 
    usdtToken, 
    daiToken, 
    usdcwethLpToken,
    wethusdtLpToken,
    daiwethLpToken, 
  } = useKnownTokens()

  const balanceOfWETHToken = wethToken.contract.balances?.get(walletCtx.account)
  const balanceOfUSDCToken = usdcToken.contract.balances?.get(walletCtx.account)
  const balanceOfUSDTToken = usdtToken.contract.balances?.get(walletCtx.account)
  const balanceOfDAIToken = daiToken.contract.balances?.get(walletCtx.account)
  const balanceOfUSDCWETHToken = usdcwethLpToken.contract.balances?.get(walletCtx.account)
  const balanceOfWETHUSDTToken = wethusdtLpToken.contract.balances?.get(walletCtx.account)
  const balanceOfDAIWETHToken = daiwethLpToken.contract.balances?.get(walletCtx.account)

  const decimalsOfWETHToken = wethToken.decimals
  const decimalsOfUSDCToken = usdcToken.decimals
  const decimalsOfUSDTToken = usdtToken.decimals
  const decimalsOfDAIToken = daiToken.decimals
  const decimalsOfUSDCWETHToken = usdcwethLpToken.decimals
  const decimalsOfWETHUSDTToken = wethusdtLpToken.decimals
  const decimalsOfDAIWETHToken = daiwethLpToken.decimals

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

    if (stepper.current.currentStepIndex === 1) {
      setAssetSymbol(values.assetType)
    }

    if (stepper.current.currentStepIndex === 2) {
      setDuration(values.assetDuration)
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
    <div ref={stepperRef} className='stepper stepper-pills stepper-column' id='kt_create_account_stepper'>
      <div className="row">
        <div className="col-3">
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
                    {/* <div className='stepper-desc fw-bold'>Select Asset</div> */}
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
                    {/* <div className='stepper-desc fw-bold'>Select Duration</div> */}
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
                    {/* <div className='stepper-desc fw-bold'>Input Amount</div> */}
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
          <Formik validationSchema={currentSchema} initialValues={initValues} onSubmit={submitStep}>
            {() => (
              <Form noValidate id='kt_create_account_form'>
                <div className="current" data-kt-stepper-element='content'>
                  <SelectAsset prevStep={prevStep}/>                                
                </div>

                <div data-kt-stepper-element='content'>
                  <SelectDuration prevStep={prevStep}/>
                </div>

                <div data-kt-stepper-element='content'>
                  <InputAssetAmount prevStep={prevStep}/>
                </div>

                <div data-kt-stepper-element='content'>
                  <ConfirmAddTransaction handleMethod={stepper.current} prevStep={prevStep}/>
                </div>

                <div data-kt-stepper-element='content'>
                  <CompleteAddTransaction />
                </div>
              </Form>
            )}
          </Formik>
        </div>

        <div className="col-4">
          <div className="card">
            <div className="card-body">
              {/* <h6 className=" pb-3">Bond Market</h6>

              <div className="d-flex justify-content-between p-2 mb-1 bg-info rounded" >
                <div className="mr-5">
                  <span className="fs-7 fw-bolder p-0 mb-0 align-content-center">Bond Price</span>                  
                </div>
                <div className="me-3">
                  <span className="fs-7 fw-bolder align-content-center"></span>
                </div> 
              </div>

              <div className="d-flex justify-content-between p-2 mb-1 bg-info rounded" >
                <div className="mr-5">
                  <span className="fs-7 fw-bolder p-0 mb-0 align-content-center">Duration</span>                  
                </div>
                <div className="me-3">
                  <span className="fs-7 fw-bolder align-content-center"></span>
                </div> 
              </div>

              <div className="d-flex justify-content-between p-2 mb-1 bg-info rounded" >
                <div className="mr-5">
                  <span className="fs-7 fw-bolder p-0 mb-0 align-content-center">Fixed Interest Rate (APR)</span>                  
                </div>
                <div className="me-3">
                  <span className="fs-7 fw-bolder align-content-center"></span>
                </div> 
              </div>

              <div className="d-flex justify-content-between p-2 mb-1 bg-info rounded" >
                <div className="mr-5">
                  <span className="fs-7 fw-bolder align-content-center">Your Collateral</span>                  
                </div>
                <div className="me-3">
                  <span className="fs-7 fw-bolder align-content-center"></span>
                </div> 
              </div>

              <div className="d-flex justify-content-between p-2 mb-1 bg-info rounded" >
                <div className="mr-5">
                  <span className="fs-7 fw-bolder align-content-center">LTV</span>                  
                </div>
                <div className="me-3">
                  <span className="fs-7 fw-bolder align-content-center"></span>
                </div> 
              </div> */}
              <h6 className="pt-3 pb-7">Your Wallet</h6>
              <div className="d-flex justify-content-between p-2 mb-1 bg-info rounded" >
                <div className="fs-7">
                  <KTSVG path={wethToken.icon} className="pe-2 svg-icon svg-icon-2x" />
                  <span className="fs-7 fw-bolder p-0 mb-0 align-content-center">{wethToken.symbol}</span>
                </div>
                <div className="fs-7 me-3">
                  <span className="p-1 m-1 fs-7 fw-bolder align-content-center">{formatToken(balanceOfWETHToken, {scale: decimalsOfWETHToken})}</span>
                </div> 
              </div>
              <div className="d-flex justify-content-between p-2 mb-1 bg-info rounded" >
                <div className="fs-7">
                  <KTSVG path={usdcToken.icon} className="pe-2 svg-icon svg-icon-2x" />
                  <span className="fs-7 fw-bolder p-0 mb-0 align-content-center">{usdcToken.symbol}</span>
                </div>
                <div className="fs-7 me-3">
                  <span className="p-1 m-1 fs-7 fw-bolder align-content-center">{formatToken(balanceOfUSDCToken, {scale: decimalsOfUSDCToken})}</span>
                </div> 
              </div>
              <div className="d-flex justify-content-between p-2 mb-1 bg-info rounded" >
                <div className="fs-7">
                  <KTSVG path={usdtToken.icon} className="pe-2 svg-icon svg-icon-2x" />
                  <span className="fs-7 fw-bolder p-0 mb-0 align-content-center">{usdtToken.symbol}</span>
                </div>
                <div className="fs-7 me-3">
                  <span className="p-1 m-1 fs-7 fw-bolder align-content-center">{formatToken(balanceOfUSDTToken, {scale: decimalsOfUSDTToken})}</span>
                </div> 
              </div>
              <div className="d-flex justify-content-between p-2 mb-1 bg-info rounded" >
                <div className="fs-7">
                  <KTSVG path={daiToken.icon} className="pe-2 svg-icon svg-icon-2x" />
                  <span className="fs-7 fw-bolder p-0 mb-0 align-content-center">{daiToken.symbol}</span>
                </div>
                <div className="fs-7 me-3">
                  <span className="p-1 m-1 fs-7 fw-bolder align-content-center">{formatToken(balanceOfDAIToken, {scale: decimalsOfDAIToken})}</span>
                </div> 
              </div>
              <div className="d-flex justify-content-between p-2 mb-1 bg-info rounded" >
                <div className="fs-7">
                  <KTSVG path={usdcwethLpToken.icon} className="pe-2 svg-icon svg-icon-2x" />
                  <span className="fs-7 fw-bolder p-0 mb-0 align-content-center">{usdcwethLpToken.symbol}</span>
                </div>
                <div className="fs-7 me-3">
                  <span className="p-1 m-1 fs-7 fw-bolder align-content-center">{formatToken(balanceOfUSDCWETHToken, {scale: decimalsOfUSDCWETHToken})}</span>
                </div> 
              </div>
              <div className="d-flex justify-content-between p-2 mb-1 bg-info rounded" >
                <div className="fs-7">
                  <KTSVG path={wethusdtLpToken.icon} className="pe-2 svg-icon svg-icon-2x" />
                  <span className="fs-7 fw-bolder p-0 mb-0 align-content-center">{wethusdtLpToken.symbol}</span>
                </div>
                <div className="fs-7 me-3">
                  <span className="p-1 m-1 fs-7 fw-bolder align-content-center">{formatToken(balanceOfWETHUSDTToken, {scale: decimalsOfWETHUSDTToken})}</span>
                </div> 
              </div>
              <div className="d-flex justify-content-between p-2 mb-1 bg-info rounded" >
                <div className="fs-7">
                  <KTSVG path={daiwethLpToken.icon} className="pe-2 svg-icon svg-icon-2x" />
                  <span className="fs-7 fw-bolder p-0 mb-0 align-content-center">{daiwethLpToken.symbol}</span>
                </div>
                <div className="fs-7 me-3">
                  <span className="p-1 m-1 fs-7 fw-bolder align-content-center">{formatToken(balanceOfDAIWETHToken, {scale: decimalsOfDAIWETHToken})}</span>
                </div> 
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddLiquidityView