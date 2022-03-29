import React from 'react';
import s from './s.module.scss'
import cn from 'classnames'
import Tooltip from '../../antd/tooltip';

import Icon from '../icon'; 

export const Text = React.memo(props => {
    const { tag = 'div', type, weight, color, align, ellipsis, wrap, className, children, tooltip, ...textProps } = props;
  
    const textComponent = React.createElement(
      tag,
      {
        className: cn(s.text, s[type], className, {
          [s.hasTooltip]: tooltip,
          [s[`weight-${weight}`]]: weight,
          [s[`${color}-color`]]: color,
          [`text-${align}`]: align,
          'text-ellipsis': ellipsis,
          'text-wrap': wrap,
          'text-nowrap': wrap === false,
        }),
        ...textProps,
      },
      children,
    );
  
    return tooltip ? (
      <Tooltip
        title={tooltip}
        className={cn(s.tooltip, 'text-p2', 'primary-color')}
        // overlayStyle={overlayStyle}
        // overlayInnerStyle={overlayStyle}
      >
        {textComponent}
      </Tooltip>
    ) : (
      textComponent
    );
  });

  export const Hint = props => {
    const { text, className, maxWidth, children } = props;
  
    if (!text) {
      return <>{children}</>;
    }
  
    const overlayStyle = {
      ...(maxWidth !== undefined && { maxWidth: `${maxWidth}px` }),
    };
  
    return (
      <div className={cn(s.hint, className)}>
        <span>{children}</span>
        <Tooltip
          title={text}
          className={cn(s.tooltip, 'text-p2', 'primary-color')}
          overlayStyle={overlayStyle}
          overlayInnerStyle={overlayStyle}>
          <Icon name="info" size={16} className={s.icon} color="icon" />
        </Tooltip>
      </div>
    );
  };