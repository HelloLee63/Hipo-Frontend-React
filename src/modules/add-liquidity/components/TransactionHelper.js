import * as Yup from 'yup'

const addLiquiditySchemas = [
  Yup.object({
    assetType: Yup.string().required().label('Asset Type'), 
  }),
  Yup.object({
    assetDuration: Yup.string().required().label('Asset Duration'),
  }),
]

const addLiquidityInits = {
  assetType: 'WETH',
  assetDuration: '300',
  
}

export {addLiquiditySchemas, addLiquidityInits}