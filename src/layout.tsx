import React, { memo, useState } from 'react';
import { Layout } from 'antd';
import Menu from './components/Menu';
import {shallowEqual, useSelector} from 'react-redux'

import NavBar from './components/NavBar';
import {GlobalState} from './store/reducer'

import styles from './layout.module.less'

const {Header, Sider, Content} = Layout

export interface IProps {

}
const PageLayout: React.FC<IProps> = (props) => {
  const [collapsed, setCollapsed] = useState(false)
  const {userInfo: {userName}} = useSelector((state: GlobalState) => ({
    userInfo: state.user.userInfo
  }), shallowEqual)
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className={`${styles.logo} ${collapsed ? styles["logo-collapsed"] : ''}`}>
          <span>
            <img src='https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg' alt="" />
            {collapsed ? null : <h1>React管理后台</h1>}
          </span>
        </div>
      <Menu></Menu>
      </Sider>
      <Layout className={styles["site-layout"]}>
        <Header className={styles["site-layout-background"]} style={{ padding: 0 }}>
          <NavBar collapsed={collapsed} toggle={() => setCollapsed(!collapsed)}/>
        </Header>
        <Content
          className={styles["site-layout-background"]}
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >
          {userName}
        </Content>
      </Layout>
    </Layout>
  )
}

export default memo(PageLayout)