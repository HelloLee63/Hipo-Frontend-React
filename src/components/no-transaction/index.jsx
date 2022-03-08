import toAbsoluteUrl from "../../_metronic/helpers/AssetHelpers"

const NoTransaction = () => {
  return(
    <div className="d-flex ">
      <img
        src={toAbsoluteUrl('/media/blank/blank-page.png')}
        className=''
        alt=''
      />
      <span>There is no relevant transaction record currently.</span>
    </div>
  )
}

export default NoTransaction