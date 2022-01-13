/* eslint-disable jsx-a11y/anchor-is-valid */
import { BigNumber } from 'ethers'
import {Field, ErrorMessage, Formik} from 'formik'
import { useMemo, useState } from 'react'
import { useConfig } from '../../../../components/providers/configProvider'
import TokenIcon from '../../../../components/token-icon'
import { useLiquidityPool } from '../../providers/liquidity-pool-provider'

const InputAssetAmount = () => {

  const liquidityPoolCtx = useLiquidityPool()
  const { liquidityPoolMeta } = useLiquidityPool()
  const [activeToken, setActiveToken] = useState(liquidityPoolMeta.token[0])
  const [confirmModalVisible, setConfirmModalVisible] = useState(false)
  const [amount, setAmount] = useState('')
  const activeContract = activeToken?.contract
  const walletBalance = activeContract.balance
  console.log(walletBalance);

  const [enabling, setEnabling] = useState(false)

  async function handleEnable() {
    setEnabling(true)

    try {
      await activeContract.approve(liquidityPoolCtx.addLiquidityContract?.address. true)
    } catch {

      setEnabling(false)
    }
  }

  function handleAddLiquidity() {
    setConfirmModalVisible(true)
  }

  function handleAddLiquidityCancel() {
    setConfirmModalVisible(false)
  }

  async function handleAddLiquidityConfirm( { gasPrice }) {
    setConfirmModalVisible(false)

    let value = BigNumber.from(amount)

    if(!activeToken || !value || value.isLessThanOrEqualTo(BigNumber.bigNumberify(0))) {
      return Promise.reject()
    }
  }

  return (
    // <div className='w-100'>
    //   <div className='pb-10 pb-lg-15'>
    //     <h2 className='fw-bolder d-flex align-items-center text-dark'>
    //       Input Amount
    //     </h2>
    //     <TokenIcon tokenName='WETH' tokenIcon='/media/tokens/WETH.svg'/>

    //     <div className='mb-10 fv-row'>
    //       <Field
    //         type='text'
    //         className='form-control form-control-lg form-control-solid'
    //         name='assetAmount'
    //       />
    //       <div className='text-danger mt-2'>
    //         <ErrorMessage name='assetAmount' />
    //       </div>
    //     </div>

    //     <div>
    //       <h5>Collateral Amount</h5>
    //       <span></span>
    //     </div>
    //   </div>
    // </div>   
    <button className='' onClick={handleAddLiquidity}></button>   
  )
}

export {InputAssetAmount}