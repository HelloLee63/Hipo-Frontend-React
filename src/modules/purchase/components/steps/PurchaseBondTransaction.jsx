import { useEffect, useRef, useState } from "react"
import { useConfig } from "../../../../components/providers/configProvider"
import { useReload } from "../../../../hooks/useReload"


const PurchaseBondTransaction = () => {

  const config = useConfig()
  const bondAssetsRef = useRef(new Map())
  const [reload, version] = useReload()

  console.log(config.tokens.bonds);
  const bondAssets = config.tokens.bondAssets

  useEffect(() => {
    const promises = bondAssets.map(async(bondAsset) => {
      try {
        const newBondAsset = {
          ...bondAsset,
        }

        bondAssetsRef.current.set(bondAsset.toUpperCase(), newBondAsset)
        reload()
      } catch (e) {
        console.error(e)
      }
    })
  }, [])

  console.log(bondAssetsRef);


  const [enabling, setEnabling] = useState(false)
  const [activeBond, setActveBond] = useState(config.tokens?.bonds?.weth?.address)

  // activeContract = activeBond.contract
  // const allowance = activeContract.getAllowanceOf()

 
  function handleBondSelect(bondAssetAddress, duration) {

  }

  // async function handleEnable() {
  //   setEnabling(true)

  //   try {
  //     await activeContract.approve()
  //   } catch {}

  //   setEnabling(false)
  // }

  function handleStake() {

  }

  async function handlePurchaseConfirm({ gasPrice }) {

  }

  return (
    // bondAssetsRef.map((bondAsset) => {<div key={bondAsset}>{ bondAsset }</div>})
    <div>123</div>
  )
}

export default PurchaseBondTransaction