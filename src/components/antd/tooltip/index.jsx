import React from 'react';
import AntdTooltip, { TooltipPropsWithTitle as AntdTooltipPropsWithTitle } from 'antd/lib/tooltip';
import cn from 'classnames';

import s from './s.module.scss';

const Tooltip = props => {
  const { overlayClassName, children, ...tooltipProps } = props;

  return (
    <AntdTooltip title="" placement="bottom" overlayClassName={cn(s.overlay, overlayClassName)} {...tooltipProps}>
      {children}
    </AntdTooltip>
  );
};

export default Tooltip;