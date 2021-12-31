import IconOld from "../../../components/custom/icon"
import { Text } from "../../../components/custom/typography"
import { useNetwork } from "../../../components/providers/networkProvider"
import { useWeb3 } from "../../../components/providers/web3Provider"


const NetworkAction = () => {
    const { activeNetwork } = useNetwork()
    const { showNetworkSelect } = useWeb3()

    return (
        <button type="button" onClick={() => showNetworkSelect()} className="">
            <IconOld name={ activeNetwork.meta.logo } width={24} height={24} className="mr-8" />
            <Text type="p2" weight='semibold' color='secondary'>
                {activeNetwork.meta.name}
            </Text>
        </button>
    )
}

export default NetworkAction