import toAbsoluteUrl from "../../_metronic/helpers/AssetHelpers"

const NoTransaction = () => {
  return(
    <div className="d-flex flex-column align-content-stretch justify-content-center align-items-center pt-20">
      <img
        src={toAbsoluteUrl('/media/blank/blank-page.png')}
        className=''
        alt=''
      />
      <span className="pt-20 fs-5 text-muted">There is no relevant transaction record currently.</span>
    </div>
  )
}

export default NoTransaction