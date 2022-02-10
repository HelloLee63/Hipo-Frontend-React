import * as Yup from 'yup'

const pledgeSchemas = [
  Yup.object({
    collateralAssetType: Yup.string().required().label('Collateral Asset Type'), 
  }),
]

const pledgeInits = {
  collateralAssetType: 'USDC/WETH',
}

export {pledgeSchemas, pledgeInits}