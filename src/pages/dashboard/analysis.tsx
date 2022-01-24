import React, { memo, useEffect } from 'react';

export interface IProps {

}

const Analysis: React.FC<IProps> = (props) => {
  useEffect(() => {
    console.log('我执行了')
  }, [])
  return (
    <div>分析页</div>
  )
}

export default memo(Analysis)