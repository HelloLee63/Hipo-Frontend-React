import * as Yup from 'yup'

const purchaseSchemas = [
  Yup.object({
    bondAssetType: Yup.string().required().label('Asset Type'), 
  }),
  
  Yup.object({
    bondAssetDuration: Yup.string().required().label('Asset Duration'), 
  }),
]

const purchaseInits = {
  bondAssetType: 'WETH',
  bondAssetDuration: '300',
  bondAssetAmount: 0.0
}

export {purchaseSchemas, purchaseInits}