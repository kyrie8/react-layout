import React, { memo } from 'react';
import { useDispatch} from 'react-redux';
import {updateTheme} from '@/store/settingStore/action'
import { Button } from 'antd';
export interface IProps {

}

const List: React.FC<IProps> = (props) => {
  const dispatch = useDispatch()
  function ColorChang (e: React.ChangeEvent<HTMLInputElement>) {
    dispatch(updateTheme({
      color: e.target.value
    }))
  }
  return (
    <>
      <input type="color" onChange={ColorChang}/>
      <div>
        <Button type='primary'>主题色</Button>
      </div>
      <div>列表页</div>
    </>
  )
}

export default memo(List)