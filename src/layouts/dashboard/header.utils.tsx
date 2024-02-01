import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { ButtonProps } from 'antd'

export const getButtonToggleSidebarProps = ({
  collapsed,
}: {
  collapsed: boolean
}): ButtonProps => ({
  // className: '!hidden sm:!block',
  type: collapsed ? 'text' : 'default',
  icon: collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />,
})
