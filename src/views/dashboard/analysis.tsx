import React, { memo } from 'react';

export interface IProps {

}

const Analysis: React.FC<IProps> = (props) => {
  return (
    <div>分析页</div>
  )
}

export default memo(Analysis)