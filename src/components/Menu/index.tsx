import React, { lazy, memo} from 'react';
import { Menu } from 'antd';
import { routes } from '@/router/router'
export interface IProps {

}

function formatRoutes(routes) {
  const res = []
  function travel(routes) {
    routes.forEach((route) => {
      if (route.path && !route.children) {
        route.component = lazy(() => import(`@/views/${route.component}`))
        res.push(route);
      } else if (Array.isArray(route.children) && route.children.length) {
        travel(route.children);
      }
    })
  }
  travel(routes)
  return res
}

const MyMenu: React.FC<IProps> = (props) => {
  const asyncRoutes = formatRoutes(routes)
  console.log('asyncRoutes',asyncRoutes)
  function renderMenuItem(route) {
    return (
      <Menu.Item icon={<route.icon/>} key={route.path}>
        {route.name}
      </Menu.Item>
    )
  }
  function renderSubMenu(route) {
    <Menu.SubMenu>
      {
        route.map(child => {
          return child.children && child.children.length ? renderSubMenu(child) : renderMenuItem(child)
        })
      }
    </Menu.SubMenu>
  }
  return (
    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
      {
        routes.map(route => {
          return route.children && route.children.length ? renderSubMenu(route) : renderMenuItem(route)
        })
      }
    </Menu>
  )
}

export default memo(MyMenu)