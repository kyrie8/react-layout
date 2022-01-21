import React, { memo } from 'react';

export interface IProps {

}

const Monitor: React.FC<IProps> = (props) => {
  return (
    <div>监控页</div>
  )
}

export default memo(Monitor)