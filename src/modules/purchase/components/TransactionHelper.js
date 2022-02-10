import * as Yup from 'yup'

const purchaseSchemas = [
  Yup.object({
    bondAssetType: Yup.string().required().label('Asset Type'), 
  }),
  
  Yup.object({
    bondAssetDuration: Yup.string().required().label('Asset Duration'), 
  }),

  Yup.object({
    collateralAssetAmount: Yup.string().required().label('Collateral Asset Amount'),
  }),
]

const purchaseInits = {
  bondAssetType: 'WETH',
  bondAssetDuration: '300',
  bondAssetAmount: 0.0
}

export {purchaseSchemas, purchaseInits}