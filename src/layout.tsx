import React, { memo, useState, useMemo, useEffect, useRef } from 'react';
import { Outlet, useNavigate} from 'react-router-dom';
import { Layout, Menu, Breadcrumb } from 'antd';
import * as Icon from '@ant-design/icons';
//import Menu from './components/Menu';
import NavBar from './components/NavBar';
//import Breadcrumb from './components/Breadcrumb';

import {router} from '@/router/router'

import styles from './layout.module.less';

const {Header, Sider, Content} = Layout

export interface IProps {

}

function formatRoutes(data) {
  let res = []
  data.forEach(item => {
    const copyData = JSON.parse(JSON.stringify(item))
    delete copyData['children']
    res.push(copyData)
    if (item.children && item.children.length) {
      res = res.concat(formatRoutes(item.children))
    }
  })
  return res
}

const PageLayout: React.FC<IProps> = (props) => {
  const [collapsed, setCollapsed] = useState(false)
  const [bread, setBread] = useState([])
  const firstRoute = useRef([])
  const flatRoutes = useMemo(() => formatRoutes(router), [])
  const defaultOpenKeys = []
  const defaultSelectedKeys = []
  useEffect(() => {
    firstRoute.current = []
    firstConfig(router[0])
    setBread([...firstRoute.current])
    console.log('firstRoute.current',firstRoute.current)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const navigate = useNavigate()
  
  function renderMenuIcon(name) {
    return (
      React.createElement(Icon[name], {})
    )
  }
  function renderMenuItem(route) {
    return (
      <Menu.Item icon={ route.icon && renderMenuIcon(route.icon)} key={route.path}>
        {route.name}
      </Menu.Item>
    )
  }
  function renderSubMenu(route) {
    return (
      <Menu.SubMenu icon={renderMenuIcon(route.icon)} key={route.path} title={route.name}>
        {
          route.children.map(child => {
            return child.children && child.children.length ? renderSubMenu(child) : renderMenuItem(child)
          })
        }
      </Menu.SubMenu>
    )
  }
  function firstConfig(data) {
    if (data.children && data.children.length) {
      firstRoute.current.push({
        path: data.path,
        name: data.name
      })
      defaultOpenKeys.push(data.path)
      firstConfig(data.children[0])
    } else {
      firstRoute.current.push({
        path: data.path,
        name: data.name
      })
      defaultSelectedKeys.push(data.path)
      defaultOpenKeys.push(data.path)
    }
  }
  function onClickMenuItem({key, keyPath}) {
    console.log('key', key, keyPath)
    const arr = []
    flatRoutes.forEach(item => {
      keyPath.reverse().forEach(path => {
        if (item.path === path) {
          arr.push(item)
        }
      })
    })
    setBread([...arr])
    navigate(key)
  }

  return (
    <Layout>
      <Sider className={styles['sider-light']} trigger={null} collapsible collapsed={collapsed}>
        <div className={`${styles.logo} ${collapsed ? styles["logo-collapsed"] : ''}`}>
          <span>
            <img src='https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg' alt="" />
            {collapsed ? null : <h1>React管理后台</h1>}
          </span>
        </div>
        <Menu
          theme="light"
          mode="inline"
          defaultOpenKeys={defaultOpenKeys}
          defaultSelectedKeys={defaultSelectedKeys}
          onClick={onClickMenuItem}
          >
          {
            router.map(route => {
              return route.children && route.children.length ? renderSubMenu(route) : renderMenuItem(route)
            })
          }
        </Menu>
      </Sider>
      <Layout className={styles["site-layout"]}>
        <Header className={styles["site-layout-background"]} style={{ padding: 0 }}>
          <NavBar collapsed={collapsed} toggle={() => setCollapsed(!collapsed)}/>
        </Header>
        <div className={styles.bread}>
          <Breadcrumb>
            {
              bread.map((item, i) => {
                return (
                  <Breadcrumb.Item key={i}>
                    {item.name}
                  </Breadcrumb.Item>
                )
              })
            }
          </Breadcrumb>
        </div>
        <Content
          className={styles["site-layout-background"]}
          style={{
            padding: 24,
            minHeight: 280,
            margin: '0 16px'
          }}
        >
          <Outlet></Outlet>
        </Content>
      </Layout>
    </Layout>
  )
}

export default memo(PageLayout)