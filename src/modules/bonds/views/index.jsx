import BigNumber from "bignumber.js"
import { usePools } from "../../../components/providers/poolsProvider"
import { useReload } from "../../../hooks/useReload"
import { useWallet } from "../../../wallets/walletProvider"
import { useDebtToken } from "../../../web3/components/providers/DebtTokenProvider"


const BondsView = () => {

  const walletCtx = useWallet()
  const { bondPools } = usePools()

  const bTokenBalance = () => {

    if (walletCtx.account) {

      bondPools.forEach(pool => {
        const balance = pool.bToken.contract.balances?.get(walletCtx.account)

        if (balance?.gt(0)) {

          console.log("this is great than zero");
        }
      })
    }
  }



  return (
    <>
      
    </>
  )
}

export default BondsView