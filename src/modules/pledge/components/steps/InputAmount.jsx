/* eslint-disable jsx-a11y/anchor-is-valid */
import {Field, ErrorMessage} from 'formik'
import { KTSVG } from '../../../../_metronic/helpers/components/KTSVG'
import { usePledge } from '../../providers/PledgeProvider'

const InputAmount = () => {

  const { getCollateralConfigurationData } = usePledge()


  
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
      </div>
    </div>
      
  )
}

export {InputAmount}
