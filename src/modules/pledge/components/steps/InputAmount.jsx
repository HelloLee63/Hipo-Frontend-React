/* eslint-disable jsx-a11y/anchor-is-valid */
import {Field, ErrorMessage} from 'formik'
import { useState } from 'react'
import { useConfig } from '../../../../components/providers/configProvider'
import Erc20Contract from '../../../../web3/erc20Contract'
import { KTSVG } from '../../../../_metronic/helpers/components/KTSVG'
import { useColPool } from '../../providers/colPool-provider'
import { useColPools } from '../../providers/colPools-provider'
import { usePledge } from '../../providers/PledgeProvider'


const InputAmount = () => {

  const config = useConfig()
  const colPoolsCtx = useColPools()
  const [activeCollateralPool, setActiveCollateralPool] = useState(colPoolsCtx.colPools[0]) 
  // const activeContract = activeCollateralPool?.contract

  //erc20 allowance
  // console.log(activeContract);
  // console.log(config.contracts.col?.wethusdcLpToken)
  // const allowance = activeContract.getAllowanceOf(config.contracts.col?.wethusdcLpToken)
  // console.log(allowance);

  //Datas


  return (
    <div className='w-100'>
      <div className='pb-10 pb-lg-15'>
        <h2 className='fw-bolder d-flex align-items-center text-dark'>
          Input Amount
        </h2>

        <div className='mb-10 fv-row'>
          <Field
            type='text'
            className='form-control form-control-lg form-control-solid'
            name='accountName'
          />
          <div className='text-danger mt-2'>
            <ErrorMessage name='accountName' />
          </div>
        </div>

        <div>
          <h5>Collateral Amount</h5>
          <span></span>
        </div>
      </div>
    </div>      
  )
}

export {InputAmount}
