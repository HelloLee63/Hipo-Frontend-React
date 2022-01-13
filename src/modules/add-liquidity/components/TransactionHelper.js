import * as Yup from 'yup'

const addLiquiditySchemas = [
  Yup.object({
    assetType: Yup.string().required().label('Asset Type'), 
  }),
  Yup.object({
    assetDuration: Yup.string().required().label('Asset Duration'),
  }),
  Yup.object({
    assetAmount: Yup.number().required().label('Asset Amount'),
  }),
]

const addLiquidityInits = {
  assetType: 'WETH',
  assetDuration: '300',
  assetAmount: 0.0
}

export {addLiquiditySchemas, addLiquidityInits}