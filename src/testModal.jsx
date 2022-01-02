import Grid from "./components/custom/grid"
import { Text } from "./components/custom/typography"
import { Modal } from "./components/modal"


const TestModal = (modalProps) => {

    return (
        <Modal width={568} {...modalProps}>
                <Grid flow="row" gap={32}>
                    <Grid flow='row' gap={4}>
                        <Text type="h2" weight="bold" color="primary">
                            Connect Wallet
                        </Text>
                        <Text type='p1' color="secondary">
                            Please select the wallet of you liking
                        </Text>
                    </Grid>
                </Grid>
        </Modal>
    )
}

export default TestModal