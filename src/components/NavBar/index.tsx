import React, { memo } from 'react';
import { Menu, Dropdown, Space, Avatar } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import styles from './nav.module.less'
import { shallowEqual, useSelector } from 'react-redux';
import { GlobalState } from '@/store/reducer';
import { useNavigate } from 'react-router-dom';
export interface IProps {
  collapsed: boolean,
  toggle: () => void
}


const NavBar: React.FC<IProps> = (props) => {
  const  {collapsed, toggle} = props
  const {userInfo: {userName, avatar}} = useSelector((state: GlobalState) => ({
    userInfo: state.user.userInfo
  }), shallowEqual)
  const nav = useNavigate()

  const renderDropdown = (
    <Menu onClick={(val) => DropdownClick(val)}>
      <Menu.Item key='1'>
        <LogoutOutlined />
        <span>退出登录</span>
      </Menu.Item>
    </Menu>
  )

  function DropdownClick({key}: {key: string}) {
    console.log('key', key)
    switch (key) {
      case '1':
        nav('/login')
        break;
    
      default:
        break;
    }
  }

  function toggleClick(e: React.MouseEvent) {
    e.stopPropagation()
    toggle()
  }
  return (
    <div className={styles.nav}>
      <div className={styles.trigger} onClick={(e) => toggleClick(e)}>
        {collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
      </div>
      <div className={styles.right}>
        <span>{userName}</span>
        <Space direction="vertical">
          <Space wrap>
            <Dropdown overlayStyle={{paddingTop: '6px'}} overlay={renderDropdown} placement="bottomCenter">
              <Avatar size={40} src={avatar}/>
            </Dropdown>
          </Space>
        </Space>
      </div>
    </div>
  )
}

export default memo(NavBar)