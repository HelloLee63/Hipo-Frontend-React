import React from 'react'


export const RadioCard = (props) => {
    const { children, selected = false, ...rest } = props;

    return (
        <button type = "button">
            {children}
        </button>
    )
}

export const RadioCards = () => {
    <div />
}

export default RadioCard
