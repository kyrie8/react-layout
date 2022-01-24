import React, { memo } from 'react';
import { Menu } from 'antd';
import * as Icon from '@ant-design/icons';
import { router } from '@/router/router'
import { Link } from 'react-router-dom';
export interface IProps {

}

const MyMenu: React.FC<IProps> = (props) => {
  function renderMenuIcon(name) {
    return (
      React.createElement(Icon[name], {})
    )
  }
  function renderMenuItem(route) {
    return (
      <Menu.Item icon={ route.icon && renderMenuIcon(route.icon)} key={route.path}>
        <Link to={route.path}>
          {route.name}
        </Link>
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
  return (
    <Menu
      theme="dark"
      mode="inline"
      defaultOpenKeys={['dashboard','analysis']}
      defaultSelectedKeys={['analysis/list1']}
      >
      {
        router.map(route => {
          return route.children && route.children.length ? renderSubMenu(route) : renderMenuItem(route)
        })
      }
    </Menu>
  )
}

export default memo(MyMenu)