import React, { memo, useState, useMemo, useEffect, useRef } from 'react';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import { router, IRoutes } from './router/router'
import lazyLoad from '@/utils/loadable'
import { Layout, Menu, Breadcrumb } from 'antd';
import * as Icon from '@ant-design/icons';
import NavBar from './components/NavBar';
import styles from './layout.module.less';

const {Header, Sider, Content} = Layout

export interface IProps {

}

/* function formatRoutes(data) {
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
} */

function formatRoutes(router) {
  const res = []
  const record = []
  function travel(router) {
    router.forEach((route) => {
      const copyData = JSON.parse(JSON.stringify(route))
      delete copyData['children']
      record.push(copyData)
      if (route.path && !route.children) {
        route.element = lazyLoad(() => import(`@/pages/${route.component}`))
        res.push(route)
      } else if (Array.isArray(route.children) && route.children.length) {
        travel(route.children)
      }
    })
  }
  travel(router)
  return {res, record}
}

function config(paths) {
  const selectKey = []
  let ele = ''
  for (let index = 0; index < paths.length; index++) {
    if (index) {
      ele = ele + '/' + paths[index]
    } else {
      ele = paths[0]
    }
    selectKey.push(ele)
  }
  return selectKey
}

const PageLayout: React.FC<IProps> = (props) => {
  const [collapsed, setCollapsed] = useState(false)
  const [bread, setBread] = useState([])
  const navigate = useNavigate()
  const location = useLocation()
  const pathname = location.pathname.slice(1)
  const paths = pathname.split('/')
  const {res : flatRouter , record} = useMemo(() => formatRoutes(router as IRoutes[]), [])
  const selectKey = useMemo(() => config(paths), [paths])
  const [openKeys] = useState<string[]>(selectKey)
  const [selectdKeys] = useState([pathname])
  useEffect(() => {
    //config()
  },[])
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
  function renderBread(keyPath) {
    const arr = []
    record.forEach(item => {
      keyPath.reverse().forEach(path => {
        if (item.path === path) {
          arr.push(item)
        }
      })
    })
    setBread([...arr])
  }
  function onClickMenuItem({key, keyPath}) {
    renderBread(keyPath)
    navigate(key)
  }

  return (
    <Layout>
      <Sider className={styles['sider-dark']} trigger={null} collapsible collapsed={collapsed}>
        <div className={`${styles.logo} ${collapsed ? styles["logo-collapsed"] : ''}`}>
          <span>
            <img src='https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg' alt="" />
            {collapsed ? null : <h1>React管理后台</h1>}
          </span>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultOpenKeys={openKeys}
          defaultSelectedKeys={selectdKeys}
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
            margin: '0 16px',
            marginBottom: '16px'
          }}
        >
          <Routes>
          {
            flatRouter.map(item => {
              return (
                <Route
                  key={item.path}
                  path={item.path}
                  element={
                    <item.element/>
                  }
                />
              )
            })
            }
          </Routes>
        </Content>
      </Layout>
    </Layout>
  )
}

export default memo(PageLayout)