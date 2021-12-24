import s from './s.module.scss'
import classNames from 'classnames';

const statcinamesList = [
    'menu-faucet',
    'menu-yf',
    'menu-dao',
    'menu-sy',
    'menu-sa',
    'menu-se',
    'menu-docs',
    'menu-theme-light',
    'menu-theme-dark',
    'menu-theme-auto',
    'dao-circle',
    'sy-circle',
]

export const Icon = (props) => {
    const { name, size = 24, rotate = 0, color, className, style = {}, ...rest } = props

    return (
        <svg
            className={classNames(s.component, className, {
                [s[`color-${color}`]]: Boolean(color),
            })} 
            width = {size} 
            height = {size}
            style = {{
                ...(rotate % 360 !== 0 ? { transform: `rotate(${rotate}deg)` } : {}),
                ...style,
            }}
            {...rest}>
                {statcinamesList.includes(name) ? (
                    <use href = {`#icon_${name}`} />
                ): (<use href = {`${process.env.Public_URL}/icon-sprote.svg#icon__${name}`} />
                )}
        </svg>
    );
};

export default Icon
