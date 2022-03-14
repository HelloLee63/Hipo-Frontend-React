import * as Yup from 'yup'

const pledgeSchemas = [
  Yup.object({
    collateralAssetType: Yup.string().required().label('Collateral Asset Type'), 
    collateralAssetAmount: Yup.number().required().label('Collateral Asset Amount'),
  }),
]

const pledgeInits = {
  collateralAssetType: 'USDC/WETH',
  collateralAssetAmount: 0,
}

export {pledgeSchemas, pledgeInits}