import IconOld from "../../../components/custom/icon"
import { Text } from "../../../components/custom/typography"
import { useNetwork } from "../../../components/providers/networkProvider"
import { useWeb3 } from "../../../components/providers/web3Provider"
import toAbsoluteUrl from "../../../_metronic/helpers/AssetHelpers"


const NetworkAction = () => {
    const { activeNetwork } = useNetwork()
    const { showNetworkSelect } = useWeb3()

    console.log(activeNetwork);
    console.log(showNetworkSelect);

    return (
        <button type="button" onClick={() => showNetworkSelect()} className="">
            {/* <IconOld name={ toAbsoluteUrl(activeNetwork.meta.logo) } width={24} height={24} className="mr-8" /> */}
            <img alt='Logo' src={toAbsoluteUrl(activeNetwork.meta.logo)} className='h-30px' />
            <Text type="p2" weight='semibold' color='secondary'>
                {activeNetwork.meta.name}
            </Text>
        </button>
    )
}

export default NetworkAction