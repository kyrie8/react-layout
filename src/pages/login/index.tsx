import { router } from '@/router/router';
import { Button } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './login.module.less'


import useStorage from '@/utils/useStorage';
export interface IProps {

}

const Login: React.FC<IProps> = (prop) => {
  const nav = useNavigate()
  const [,_setStorageValue] = useStorage('token')
  function firstConfig(data) {
    if (data.children && data.children.length) {
      firstConfig(data.children[0])
    } else {
      _setStorageValue('token')
      nav('/'+ data.path, {
        replace: true
      })
    }
  }
  function login() {
    firstConfig(router[0])
  }
  return (
    <div className={styles.login}>
      <Button onClick={login}>登录</Button>
    </div>
  )
}
export default Login