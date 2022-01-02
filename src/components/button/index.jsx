import { Icon } from '../icon/index.jsx'

import s from './s.module.scss'
import classNames from 'classnames'

export const ButtonContent = ({ size, icon, iconPosition, 
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
              {iconToDisplay && iconPosition === 'left' ? (
                <Icon
                  name={iconToDisplay}
                  rotate={iconRotate}
                  size={iconSize}
                  style={{ marginRight: 8 }}
                  className={classNames({
                    [s.spinner]: loading,
                  })}
                />
              ) : null}
              {iconToDisplay && iconPosition === 'only' ? (
                <Icon
                  name={iconToDisplay}
                  rotate={iconRotate}
                  size={iconSize}
                  className={classNames({
                    [s.spinner]: loading,
                  })}
                />
              ) : (
                children
              )}
              {iconToDisplay && iconPosition === 'right' ? (
                <Icon
                  name={iconToDisplay}
                  rotate={iconRotate}
                  size={iconSize}
                  style={{ marginLeft: 8 }}
                  className={classNames({
                    [s.spinner]: loading,
                  })}
                />
              ) : null}
            </>
          );
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

export default Button
