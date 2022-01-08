import { useNetwork } from "../../../../components/providers/networkProvider"


const TxStatus = props => {

  const { state } = props
  const { actveNetwork } = useNetwork()

  return (
    <div className="w-100">
      <div className="pb-10 pb-lg-10">
        <h2>Transaction Status</h2>
      </div>
      <div className="">
        {state === 'progress' && (
          <h4>Your transaction is being processed...</h4>

        )}

        {state === 'sucess' && (
          <h2>Congratulations!</h2>

        )}

        {state === 'failure' && (
          <h2>Failed</h2>

        )}


      </div>
    </div>

  )

}

export default TxStatus