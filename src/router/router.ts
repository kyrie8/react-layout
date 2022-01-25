export const router = [
  {
    component: '',
    path: 'dashboard',
    icon: 'DashboardOutlined',
    name: 'dashboard',
    children: [
      {
        path: 'dashboard/analysis',
        icon: 'BugOutlined',
        component: 'dashboard/monitor',
        name: '分析页',
        children: [
          {
            path: 'dashboard/analysis/list',
            name: '分析页列表',
            component: 'list/index',
          }

        ]
      },
      {
        path: 'dashboard/monitor',
        icon: 'CameraOutlined',
        component: 'dashboard/analysis',
        name: '监控页'
      }
    ]
  },
  {
    component: 'list/index',
    name: '列表',
    icon: 'BarChartOutlined',
    path: 'list'
  }
]

export interface IRoutes {
  component: any,
  name: string,
  icon: string,
  path: string,
  children?: Array<IRoutes>
}