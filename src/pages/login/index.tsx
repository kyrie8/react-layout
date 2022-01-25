import { router } from '@/router/router';
import { Button } from 'antd';
import React, { memo, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './login.module.less'

export interface IProps {

}

const Login: React.FC<IProps> = (prop) => {
  const nav = useNavigate()
  function firstConfig(data) {
    if (data.children && data.children.length) {
      firstConfig(data.children[0])
    } else {
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