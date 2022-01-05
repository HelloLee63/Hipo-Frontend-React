import { Icon } from '../icon'
import { Link as RouterLink } from 'react-router-dom'
import s from './s.module.scss'
import classNames from 'classnames'
import { useWeb3 } from '../providers/web3Provider'

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
            <ButtonContent {...{ icon, iconPosition, iconRotate, loading, children }} />
        </button>
    )
}

export const Link = ({
  children,
  variation,
  size = 'normal',
  icon,
  iconPosition = 'only',
  iconRotate,
  className,
  ...rest
}) => {

  return (
    <RouterLink
      {...rest}
      className={classNames(
        variation ? s[variation] : null,
        s[size],
        {
          [s.iconOnly]: icon && iconPosition === 'only',
        },
        className,
      )}>
        <ButtonContent {...{ icon, iconPosition, iconRotate, children }} />
      </RouterLink>
  )  
}

export const ExternalLink = ({
  children,
  variation,
  size = 'normal',
  icon,
  iconPosition = 'only',
  iconRotate,
  className,
  ...rest
}) => {
  return (
    <a
      rel='noopenner noreferrer'
      target="_blank"
      {...rest}
      className="">
      <ButtonContent {...{ icon, iconPosition, iconRotate, children }} />
    </a>      
  )
}

export const ExplorerAddressLink = props => {
  const { children, address, query = '', ...rest } = props

  const { getEtherscanAddressUrl } = useWeb3()

  if (!address) {
    return <>{children}</>
  }

  return (
    <ExternalLink href={`${getEtherscanAddressUrl(address)}${query}`} {...rest}>
      {children}
    </ExternalLink>
  )
}

export const ExplorerTxLink = props => {
  const { children, address, ...rest } = props

  const {  getEtherscanTxUrl } = useWeb3()

  if (!address) {
    return <>{children}</>
  }

  return (
    <ExternalLink href={getEtherscanTxUrl(address)} {...rest}>
      {children}
    </ExternalLink>
  )
}
