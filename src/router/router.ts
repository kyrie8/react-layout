import React, {lazy} from 'react'
export const routes = [
  {
    component: '',
    path: 'dashboard',
    icon: 'DashboardOutlined',
    name: 'dashboard',
    children: [
      {
        path: 'analysis',
        icon: 'BugOutlined',
        component: '',
        name: '分析页'
      },
      {
        path: 'monitor',
        icon: 'CameraOutlined',
        component: '',
        name: '监控页'
      }
    ]
  },
  {
    component: 'list',
    name: '列表',
    icon: 'BarChartOutlined',
    path: 'list'
  }
]

export interface IRoutes {
  component: React.LazyExoticComponent<React.ComponentType<any>>,
  name: string,
  icon: string,
  path: string,
  children: Array<IRoutes>
}

export interface Ires {
  component: React.LazyExoticComponent<React.ComponentType<any>>,
  name: string,
  icon: string,
  path: string,
}

export function formatRoutes(routes: IRoutes[]) {
  const res: Ires[] = []
  function travel(routes: IRoutes[]) {
    routes.forEach((route) => {
      if (route.path && !route.children) {
        route.component = lazy(() => import(`../views/${route.component}`))
        res.push(route);
      } else if (Array.isArray(route.children) && route.children.length) {
        travel(route.children);
      }
    })
  }
  travel(routes)
  return res
}