import { ProLayoutProps } from '@ant-design/pro-components'

/** prolayput 设置 */
const Settings: ProLayoutProps = {
  fixSiderbar: true,
  layout: 'mix',
  splitMenus: true,
  token: {
    // 页面背景色
    bgLayout: '#f5f5f5',
    // 侧边栏背景色
    sider: {
      colorBgMenuItemSelected: '#e6f7ff',
      colorBgMenuItemHover: '#f0f9ff',
      colorTextMenu: '#262626',
      colorTextMenuSelected: '#1890ff',
      colorTextMenuActive: '#1890ff',
      colorBgCollapsedButton: '#fff',
      colorTextCollapsedButton: '#1890ff',
      colorMenuBackground: '#fff',
      colorTextMenuItemHover: '#1890ff',
    }
  }
}

export default Settings
