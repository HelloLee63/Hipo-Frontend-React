import toAbsoluteUrl from "../../_metronic/helpers/AssetHelpers"

const WalletUnconnected = () => {

  return (
    <div className="d-flex flex-column align-content-stretch justify-content-center align-items-center pt-20">
      <img
        src={toAbsoluteUrl('/media/blank/blank-page.png')}
        className=''
        alt=''
      />
      <span className="pt-20 fs-5 text-muted">Your wallet is unconnected. Please connetct your wallet.</span>
    </div>
  )
}

export default WalletUnconnected