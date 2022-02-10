/* eslint-disable jsx-a11y/anchor-is-valid */
import BigNumber from 'bignumber.js'
import { ErrorMessage, Field, useFormik } from 'formik'
import { useEffect, useState } from 'react'
import { useConfig } from '../../../../components/providers/configProvider'
import TokenIcon from '../../../../components/token-icon'
import { useWallet } from '../../../../wallets/walletProvider'
import { useFinancingPool } from '../../../../web3/components/providers/FinancingPoolProvider'
import { formatToken, scaleBy } from '../../../../web3/utils'
import { KTSVG } from '../../../../_metronic/helpers/components/KTSVG'
import { useLiquidityPool } from '../../providers/liquidity-pool-provider' 

const InputAssetAmount = ({ prevStep }) => {

  const liquidityPoolCtx = useLiquidityPool()
  const walletCtx = useWallet()
  const config = useConfig()
  const activeLiquidityPool = liquidityPoolCtx.liquidityPool
  const walletBalance = activeLiquidityPool.asset.contract.balances?.get(walletCtx.account)
  const decimals = activeLiquidityPool.asset.decimals
  const allowance = activeLiquidityPool.asset.contract.allowances?.get(config.contracts.financingPool.financingPool)
  const [walletConnectVisible, setWalletConnectVisible] = useState(false)
  const [approveVisible, setApproveVisible] = useState(false)
  const financingPool = useFinancingPool()
  
  const addLiquidityFormik = useFormik({
    initialValues: {
      assetAmount: '0.0',
    }
  })

  const inputAssetAmount = new BigNumber(addLiquidityFormik.values.assetAmount)

  useEffect(() => {
    if(walletCtx.account) {
      if(BigNumber(allowance).lt(inputAssetAmount)) {
        setApproveVisible(true)
      }
    }
  }, [allowance, inputAssetAmount])

  useEffect(() => {
    if(!walletCtx.account) {
      setWalletConnectVisible(true)
    }
  }, [walletCtx.account, addLiquidityFormik.values.assetAmount])

  useEffect(() => {
    if(walletCtx.account) {
      setWalletConnectVisible(false)
    }
  }, [walletCtx.account])

  useEffect(() => {
    if(!walletCtx.account) {
      setApproveVisible(false)
    }
  },[walletCtx.account, addLiquidityFormik.values.assetAmount])

  useEffect(() => {
    if(walletCtx.account && !approveVisible && inputAssetAmount.gt(BigNumber(0))){
      document.getElementById('add_transaction_button').disabled = false
    }
  }, [walletCtx.account, addLiquidityFormik.values.assetAmount, approveVisible])

  useEffect(() => {
    if(addLiquidityFormik.values.assetAmount === 0)
    document.getElementById('add_transaction_button').disabled = true
  }, [addLiquidityFormik])

  function handleApprove() {    
      activeLiquidityPool.asset.contract.approve(config.contracts.financingPool.financingPool, true)
  }

  function handleBack() {    
    addLiquidityFormik.resetForm()
    setApproveVisible(false)
    setWalletConnectVisible(false)
    document.getElementById('add_transaction_button').disabled = true
    prevStep()    
  }

  async function handleAddLiquidity() {
    
    // activeLiquidityPool.setAdding(true)

    let value = scaleBy(inputAssetAmount, decimals)
    let assetAddress = activeLiquidityPool.asset.address
    let duration = new BigNumber(activeLiquidityPool.duration)

    try {
      await financingPool.financingPoolContract?.addLiquidity(assetAddress, duration, value)
    } catch (e) {}
  }  

  return (
    <div>
      <div className='card mb-2'>
        <div className='card-body pt-3 pb-3'>
          <TokenIcon 
            tokenName={liquidityPoolCtx.liquidityPool.asset.symbol} 
            tokeDesc={liquidityPoolCtx.liquidityPool.duration} 
            tokenIcon={liquidityPoolCtx.liquidityPool.asset.icon} 
          />
        </div>
      </div>

      <div className='card mb-2'>
        <div className='card-body p-0'>
        <Field
            type='text'
            className='form-control form-control-lg form-control-solid fw-bolder bg-white border-0 text-primary text-center align-center'
            placeholder='0.0'
            name='assetAmount'
            onChange={addLiquidityFormik.handleChange}
            value={addLiquidityFormik.values.assetAmount}
            style={{ fontSize: 48 }}
          />
        </div>
      </div>

      <div className='card mb-2'>
        <div className='card-body'>
          <div className='d-flex align-items-sm-center mb-4'>          
            <div className='d-flex flex-row-fluid flex-wrap align-items-center'>
              <div className='flex-grow-1 me-2'>
                <a href='#' className='text-gray-800 fw-bolder text-hover-primary fs-6'>
                  Add Asset Amount
                </a>
              </div>
              <div className='symbol symbol-50px me-2'>
                <KTSVG path={liquidityPoolCtx.liquidityPool.asset.icon} className='svg-icon svg-icon-2x' />
              </div>
              {/* { getHumanValue(walletBalance?, decimals).toString() ?? '-' } */}
            <span className='badge badge-light-success fs-6 fw-bolder my-2'>{formatToken(inputAssetAmount, {tokenName: activeLiquidityPool.asset.symbol})}</span>
            </div>
          </div>

          <div className='d-flex align-items-sm-center mb-4'>          
            <div className='d-flex flex-row-fluid flex-wrap align-items-center'>
              <div className='flex-grow-1 me-2'>
                <a href='#' className='text-gray-800 fw-bolder text-hover-primary fs-6'>
                  Interest Pool
                </a>
              </div>
              <div className='symbol symbol-50px me-2'>
                <KTSVG path={liquidityPoolCtx.liquidityPool.asset.icon} className='svg-icon svg-icon-2x' />
              </div>
              {/* { getHumanValue(walletBalance?, decimals).toString() ?? '-' } */}
              <span className='badge badge-light-success fs-6 fw-bolder my-2'></span>
            </div>
          </div>

          <div className='d-flex align-items-sm-center mb-4'>          
            <div className='d-flex flex-row-fluid flex-wrap align-items-center'>
              <div className='flex-grow-1 me-2'>
                <a href='#' className='text-gray-800 fw-bolder text-hover-primary fs-6'>
                  Reserve Pool
                </a>
              </div>
              <div className='symbol symbol-50px me-2'>
                <KTSVG path={liquidityPoolCtx.liquidityPool.asset.icon} className='svg-icon svg-icon-2x' />
              </div>
              {/* { getHumanValue(walletBalance?, decimals).toString() ?? '-' } */}
            <span className='badge badge-light-success fs-6 fw-bolder my-2'></span>
            </div>
          </div>

        </div>
      </div>

      <div className='d-flex flex-stack pt-2'>
        <div className='mr-0'>
          <button
            onClick={handleBack}
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
          {walletConnectVisible && 
          <button 
            type='button' 
            className='btn btn-lg btn-secondary me-0'
            disabled
          >
            <span className='indicator-label'>              
              Please Connect Your Wallet
              <KTSVG
                path='/media/icons/duotune/arrows/arr064.svg'
                className='svg-icon-3 ms-2 me-0'
              />
            </span>
          </button>}

          {approveVisible && !walletConnectVisible &&
          <button 
            type='button' 
            onClick={handleApprove} 
            className='btn btn-lg btn-primary me-0'
          >
            <span className='indicator-label'>              
              Approve
              <KTSVG
                path='/media/icons/duotune/arrows/arr064.svg'
                className='svg-icon-3 ms-2 me-0'
              />
            </span>
          </button>}

          {!walletConnectVisible && !approveVisible &&
          <button 
            type='button' 
            onClick={handleAddLiquidity} 
            className='btn btn-lg btn-primary me-0'
            // disabled
            id = 'add_transaction_button'
          >
            <span className='indicator-label'>              
              Transaction
              <KTSVG
                path='/media/icons/duotune/arrows/arr064.svg'
                className='svg-icon-3 ms-2 me-0'
              />
            </span>
          </button>}
        </div>
      </div>
    </div>         
  )
}

export {InputAssetAmount}