import * as Yup from 'yup'

const redeemSchemas = [
  Yup.object({
    collateralAssetType: Yup.string().required().label('Collateral Asset Type'), 
  }),
]

const redeemInits = {
  collateralAssetType: 'USDC/WETH',
}

export {redeemSchemas, redeemInits}