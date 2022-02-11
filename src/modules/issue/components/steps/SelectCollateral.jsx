// import { Field, Form, Formik } from "formik"
// import { useEffect, useState } from "react"
// import TokenIcon from "../../../../components/token-icon"
// import { KTSVG } from "../../../../_metronic/helpers/components/KTSVG"
// import { useDebtPool } from "../../providers/debt-pool-provider"
// import { useDebtPools } from "../../providers/debt-pools-provider"

// const SelectCollateral = ({ prevStep }) => {

//   const debtPoolsCtx = useDebtPools()
//   const debtPoolCtx = useDebtPool()
//   const [selectedAsset, setSelectedAsset] = useState('USDC/WETH')

//   useEffect(() => {
//     debtPoolCtx.setPoolSymbol(selectedAsset)
//   },[selectedAsset])

//   console.log( debtPoolCtx.poolSymbol );
  
//   return (

  //   <div className='w-100'>
  //   <div className="card mb-2">
  //     <div className="card-body">
  //       { debtPoolsCtx.Collaterals.map((collateral) => (
  //       <div key={ collateral.collateralAsset.symbol } className='mb-0 fv-row'>
  //         <div className='mb-0'>
  //           <label className='d-flex flex-stack mb-5 cursor-pointer'>
  //             <span className='d-flex align-items-center me-2'>
  //               <TokenIcon
  //                 tokenName={collateral.collateralAsset.symbol} 
  //                 tokenDesc={collateral.collateralAsset.name} 
  //                 tokenIcon={collateral.collateralAsset.icon}
  //               />
  //             </span>
  //             <span className='form-check form-check-custom form-check-solid'>
  //               <Field className='form-check-input' type='radio' name='collateralAssetType' value={collateral.collateralAsset.symbol} />
  //             </span>
  //           </label>
  //         </div>
  //       </div>
  //       ))}       
  //     </div>        
  //   </div>
  //   <div className='d-flex flex-stack pt-3'>
  //         <div className='mr-2'>
  //           <button
  //             onClick={prevStep}
  //             type='button'
  //             className='btn btn-lg btn-light-primary me-3'
  //             data-kt-stepper-action='previous'
  //           >
  //             <KTSVG
  //               path='/media/icons/duotune/arrows/arr063.svg'
  //               className='svg-icon-4 me-1'
  //             />
  //             Back
  //           </button>
  //         </div>

  //         <div>
  //           <button type='submit' className='btn btn-lg btn-primary me-0'>
  //             <span className='indicator-label'>              
  //               Continue
  //               <KTSVG
  //                 path='/media/icons/duotune/arrows/arr064.svg'
  //                 className='svg-icon-3 ms-2 me-0'
  //               />
  //             </span>
  //           </button>
  //         </div>
  //   </div>
  // </div>


//     <div className="w-100">
//       <div className="card mb-2">
//         <div className="card-body">
//           <Formik
//             initialValues={{
//               collateralAssetType: 'USDC/WETH',
//             }}
//           >
//             {({ values }) => (
//               <Form>
//                 <div id="asset-radio-group"></div>
//                 <div onChange={() => setSelectedAsset(values.collateralAssetType)}  role='group' aria-labelledby="asset-radio-group">
//                   {debtPoolsCtx.Collaterals.map((collateral) => (
//                     <div key={ collateral.collateralAsset.symbol } className='mb-0 fv-row'>
//                       <div className='mb-0'>
//                         <label className='d-flex flex-stack mb-5 cursor-pointer'>
//                           <span className='d-flex align-items-center me-2'>
//                             <TokenIcon 
//                               tokenName={collateral.collateralAsset.symbol} 
//                               tokenDesc={collateral.collateralAsset.name} 
//                               tokenIcon={collateral.collateralAsset.icon}
//                             />
//                           </span>
//                           <span className='form-check form-check-custom form-check-solid'>
//                             <Field 
//                               className='form-check-input' 
//                               type='radio' 
//                               name='collateralAssetType'
//                               value={collateral.collateralAsset.symbol}
//                               // onChange={() => debtPoolCtx.setPoolSymbol(values.collateralAssetType)}                                                   
//                             />
//                           </span>                  
//                         </label>
//                       </div>
//                     </div>         
//                   ))}
//                 </div>
//               </Form>
//             )}
//           </Formik>
//         </div>
//       </div>

//       <div className='d-flex flex-stack pt-2'>
//         <div className='mr-0'>
//           <button
//             onClick={prevStep}
//             type='button'
//             className='btn btn-lg btn-light-primary me-3'
//             data-kt-stepper-action='previous'
//           >
//             <KTSVG
//               path='/media/icons/duotune/arrows/arr063.svg'
//               className='svg-icon-4 me-1'
//             />
//             Back
//           </button>
//         </div>

//         <div>
//           <button type='submit' className='btn btn-lg btn-primary me-0'>
//             <span className='indicator-label'>              
//               Continue
//               <KTSVG
//                 path='/media/icons/duotune/arrows/arr064.svg'
//                 className='svg-icon-3 ms-2 me-0'
//               />
//             </span>
//           </button>
//         </div>
//       </div>      
//     </div>                  
//   )
// }
        
// export default SelectCollateral






import { Field } from "formik"
import TokenIcon from "../../../../components/token-icon"
import { KTSVG } from "../../../../_metronic/helpers/components/KTSVG"
import { useDebtPools } from "../../providers/debt-pools-provider"

const SelectCollateral = ({ prevStep }) => {

  const debtPools = useDebtPools()

  // const collateralAssetTypeFormik = useFormik({
  //   initialValues: {
  //     collateralAssetType: debtPools.Collaterals[0].collateralAsset.symbol
  //   }
  // })

  // function handleSelect() {
  //   debtPoolCtx.setPoolSymbol(collateralAssetTypeFormik.values.collateralAssetType)
  //   console.log(debtPoolCtx.poolSymbol);
  // }
  return (
    <div className='w-100'>
      <div className='card mb-2'>
        <div className="card-body">
          {debtPools.Collaterals.map((collateral) => (
            <div key={ collateral.collateralAsset.symbol } className='mb-0 fv-row'>
              <div className='mb-0'>
                <label className='d-flex flex-stack mb-5 cursor-pointer'>
                  <span className='d-flex align-items-center me-2'>
                    <TokenIcon 
                      tokenName={collateral.collateralAsset.symbol} 
                      tokenDesc={collateral.collateralAsset.name} 
                      tokenIcon={collateral.collateralAsset.icon}
                    />
                  </span>
                  <span className='form-check form-check-custom form-check-solid'>
                    <Field 
                      className='form-check-input' 
                      type='radio' 
                      name='collateralAssetType'
                      value={collateral.collateralAsset.symbol} 
                    />
                  </span>
                </label>
              </div>
            </div>            
          ))} 
        </div>              
      </div>

      <div className='d-flex flex-stack pt-2'>
        <div className='mr-0'>
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
          <button type='submit' className='btn btn-lg btn-primary me-0'>
            <span className='indicator-label'>              
              Continue
              <KTSVG
                path='/media/icons/duotune/arrows/arr064.svg'
                className='svg-icon-3 ms-2 me-0'
              />
            </span>
          </button>
        </div>
      </div>            
    </div>
  )
}
        
export default SelectCollateral




