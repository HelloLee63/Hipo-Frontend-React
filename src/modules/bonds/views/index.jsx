import BigNumber from "bignumber.js"
import { useReload } from "../../../hooks/useReload"
import { useWallet } from "../../../wallets/walletProvider"
import { useDebtToken } from "../../../web3/components/providers/DebtTokenProvider"


const BondsView = props => {

  const dTokenProvider = useDebtToken()
  const dTokens = dTokenProvider.dTokens
  const walletCtx = useWallet()
  const [reload] = useReload()
  console.log(dTokens);

  return (
    <>
      {dTokens.map(dToken => {
        if(walletCtx.account) {
          const debtsList = dToken.contract.loadDebtsList(walletCtx.account).then(reload).catch(Error)
          // console.log(debtsList);
          // debtsList.map(
          //   debtId => { 
          //     const debtData = dToken.contract.loadDebtData(walletCtx.account, debtId).then(reload).catch(Error)
          //     const debtStartTimestamp = debtData[0]
          //     const debtAmount = debtData[1]
          //     const collateralAssetAddress = debtData[2]

          //     if(new BigNumber(debtAmount.gt(new BigNumber(0)))){
          //       console.log(debtStartTimestamp);
          //       console.log(collateralAssetAddress);
          //     }
          //   }
          // )
        }
      })}
    </>
  )
}

export default BondsView