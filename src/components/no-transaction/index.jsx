import toAbsoluteUrl from "../../_metronic/helpers/AssetHelpers"

const NoTransaction = () => {
  return(
    <div className="d-flex ">
      <img
        src={toAbsoluteUrl('/media/blank/blank-page.png')}
        className=''
        alt=''
      />
      <span></span>
    </div>
  )
}

export default NoTransaction