import React, { memo } from 'react';

export interface IProps {

}

const List: React.FC<IProps> = (props) => {
  return (
    <div>列表页</div>
  )
}

export default memo(List)