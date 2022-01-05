import PledgeProvider from "./modules/pledge/providers/PledgeProvider"
import TestWeb3 from "./testWeb3"


const TestUsePledge = () => {
    return (

        <PledgeProvider>
            <TestWeb3 />
        </PledgeProvider>
    )
}

export default TestUsePledge