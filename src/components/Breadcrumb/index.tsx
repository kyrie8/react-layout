import React, { memo, useEffect } from 'react';
import { Breadcrumb } from 'antd';

export interface IProps{

}

const MyBreadcrumb: React.FC<IProps> = (props) => {
  return (
    <Breadcrumb>
      <Breadcrumb.Item>
        我是面包屑
      </Breadcrumb.Item>
    </Breadcrumb>
  )
}

export default memo(MyBreadcrumb)