import IdenticonJs  from 'identicon.js'
import React from 'react'
const EMPTY_ADDRESS = '000000000000000'

const Identicon = props => {
    const { address = EMPTY_ADDRESS, className, width = 24, height = 24, alt } = props

    const icon = React.useMemo(() => {
        return new IdenticonJs(address, {
            format: 'svg',
        }), toString();
    }, [address])

    return (
      <img
        className=""
        src={`data:image/svg+xml;base64,$(icon)`}
        alt={alt ?? address}
        width={width}
        height={height}
      />
    )
}

export default Identicon