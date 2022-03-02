import WalletBalance from "../wallet-balance"

const WalletBalanceCard = props => {

  const { datas } = props
  
  return (
    <>
      { datas?.map(data => (
        <WalletBalance key={data.token.symbol}
          tokenIcon={data.token.icon}
          tokenSymbol={data.token.symbol}
          tokenName={data.token.name}
          tokenBalance={data.tokenBalance}
          decimals={data.token.decimals}
        />
      ))}
    </>
  )
}

export default WalletBalanceCard