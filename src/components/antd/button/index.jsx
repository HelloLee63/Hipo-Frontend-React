import AntdButton, { ButtonProps as AntdButtonProps, ButtonType as AntdButtonType } from 'antd/lib/button';
import cn from 'classnames';

import s from './s.module.scss';


const Button = props => {
  const { children, className, type, ...btnProps } = props;

  let btnType;

  if (type === 'light') {
    btnType = 'link';
  } else if (type === 'select') {
    btnType = 'ghost';
  } else {
    btnType = type;
  }

  return (
    <AntdButton
      className={cn(s.component, className, type === 'light' && s.light, type === 'select' && s.select)}
      type={btnType}
      {...btnProps}>
      {props.children}
    </AntdButton>
  );
};

export default Button;