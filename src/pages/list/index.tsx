import React, { memo, useEffect } from 'react';

export interface IProps {

}

const List: React.FC<IProps> = (props) => {
  useEffect(() => {
    console.log('我执行了')
  }, [])
  return (
    <div>列表页</div>
  )
}

export default memo(List)