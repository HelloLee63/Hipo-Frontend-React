import { ButtonContent } from ".."

const ExternalLink = ({
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

export default ExternalLink