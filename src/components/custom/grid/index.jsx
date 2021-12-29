import React from 'react';
import cn from 'classnames';

import s from './s.module.scss';



const Grid = props => {
  const {
    className,
    flow,
    gap,
    rowsTemplate,
    colsTemplate,
    align,
    alignSelf,
    justify,
    justifySelf,
    wrap,
    padding,
    width,
    children,
  } = props;

  const [rowGap = 0, columnGap = rowGap] = ([]).concat(gap ?? 0);

  const [paddingTop, paddingRight = paddingTop, paddingBottom = paddingTop, paddingLeft = paddingRight] = (
    [] 
  ).concat(padding ?? 0);

  return (
    <div
      className={cn(
        s.grid,
        flow && s[flow],
        align && s[`align-${align}`],
        alignSelf && s[`align-self-${alignSelf}`],
        justify && s[`justify-${justify}`],
        justifySelf && s[`justify-self-${justifySelf}`],
        wrap && 'text-wrap',
        className,
      )}
      style={{
        gridTemplateRows: rowsTemplate,
        gridTemplateColumns: colsTemplate,
        rowGap: rowGap > 0 ? rowGap : undefined,
        columnGap: columnGap > 0 ? columnGap : undefined,
        paddingTop: paddingTop > 0 ? paddingTop : undefined,
        paddingRight: paddingRight > 0 ? paddingRight : undefined,
        paddingBottom: paddingBottom > 0 ? paddingBottom : undefined,
        paddingLeft: paddingLeft > 0 ? paddingLeft : undefined,
        width,
      }}>
      {children}
    </div>
  );
};

export default Grid;