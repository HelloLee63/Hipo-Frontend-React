import * as Yup from 'yup'

const issueSchemas = [
  Yup.object({
    collateralAssetType: Yup.string().required().label('Collateral Asset Type'), 
  }),
  Yup.object({
    debtAssetType: Yup.string().required().label('Debt Asset Type'),
  }),
  Yup.object({
    debtDuration: Yup.string().required().label('Debt Duration'),
  }),
  Yup.object({
    debtAssetAmount: Yup.string().required().label('Collateral Asset Amount'),
  }),
]

const issueInits = {
  collateralAssetType: 'USDC/WETH',
  debtAssetType: 'WETH',
  debtDuration: '300',
  debtAssetAmount: 0.0
}

export {issueSchemas, issueInits}