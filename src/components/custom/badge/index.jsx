export const Badge = ({ color = 'grey', size = 'medium', children, className, ...rest}) => {
    if (!children) return null

    return (
        <div className="" {...rest}>
            {children}
        </div>
    )
}

export const SquareBadge = ({ children, className, color = 'grey', ...rest}) => {
    if (!children) return null
    
    return (
        <div className="" {...rest}>
            {children}
        </div>
    )
}