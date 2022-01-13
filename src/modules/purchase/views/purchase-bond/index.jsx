import { useProtocolData } from "../../../../web3/components/providers/ProtocolDataProvider"
import PurchaseBondTransaction from "../../components/steps/PurchaseBondTransaction"



const PurchaseView = () => {

  // const { reserves } = useProtocolData()
  // const reserve = reserves[0]


  return (
      <>
        <PurchaseBondTransaction />
      </>
  )

}

export default PurchaseView