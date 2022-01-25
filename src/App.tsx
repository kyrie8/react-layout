import React, {useEffect} from 'react';
import {Route, Routes} from 'react-router-dom'
import { useSelector, shallowEqual } from 'react-redux';
import Router from './hashRouter'
import styles from './app.module.less'
import Layout from './layout'
import Login from '@/pages/login'
import { ConfigProvider } from 'antd'
import {GlobalState} from './store/reducer'

function App() {
  const {themeColor} = useSelector((state: GlobalState) => ({
    themeColor: state.setting.themeInfo.color
  }), shallowEqual)
  useEffect(() => {
    ConfigProvider.config({
      prefixCls: 'ant',
      theme: {
        primaryColor: themeColor
      }
    })
  }, [themeColor])
  return (
    <div className={styles.app}>
      <ConfigProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login/>}></Route>
            <Route path="/*" element={<Layout/>}></Route>
          </Routes>
        </Router>
      </ConfigProvider>
    </div>
  );
}

export default App;
