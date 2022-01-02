import s from './s.module.scss'
import cn from 'classnames'

import Sprite from '../../../resources/svg/icons-sprite.svg'

const Icon = (props) => {
    const { name, width = 24, height = 24, rotate, color, className, style, ...rest } = props

    return (
        <svg
        className={cn(s.component, className, rotate && `rotate-${rotate}`, color && s[`${color}-color`])}
            width = {width}
            height = {height ?? width}
            style = {style}
            {...rest}>
            {/* {name && <use xlinkHref={`${name.indexOf('static/') === 0 ? '' : Sprite}#icon__${name}`} />} */}
            {name}
        </svg>
    )
}

export default Icon