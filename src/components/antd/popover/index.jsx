import React from 'react';
import AntdPopover, { PopoverProps as AntdPopoverProps } from 'antd/lib/popover';
import cn from 'classnames';

import s from './s.module.scss';


const Popover = props => {
  const { noPadding, children, className, ...popoverProps } = props;

  return (
    <AntdPopover
      overlayClassName={cn(s.overlay, className, noPadding && s.noPadding)}
      trigger="click"
      placement="bottom"
      {...popoverProps}>
      {children}
    </AntdPopover>
  );
};

export default Popover;