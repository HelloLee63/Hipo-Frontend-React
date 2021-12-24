import React from 'react'

import s from './s.module.scss'
import classNames from 'classnames'

const ButtonContent = ({ size, icon, iconPosition, 
    iconRotate, loading, children }) => {
        let iconSize
        switch (size) {
            case 'small':
                iconSize = 16;
                break;
            case 'normal':
                iconSize = 24;
                break;
            case 'big':
                iconSize = 24;
                break;
        }

        const iconToDisplay = loading ? 'loader' : icon;

        return (
            <>
                
            
            </>
        )


}

const index = () => {
    return (
        <div>
            
        </div>
    )
}

export const Button = ({
    children,
    variation,
    size = 'nomal',
    icon,
    iconPosition = 'only',
    iconRotate,
    loading,
    className,
    ...rest
}) => {
    return (
        <button 
            {...rest}
            className={classNames(
                variation ? s[variation] : null, 
                s[size],
                {
                    [s.iconOnly]: icon && iconPosition === 'only',
                },
                className,
            )}>
            <ButtonContent {...{ icon, iconPosition, iconRotate, loading, children }}/>

        </button>
    )
}

export default index
