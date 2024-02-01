'use client'
import { Logo } from '@/components/Logo'
import MainMenu from '@/components/Menus/MainMenu'
import { useDashboardLayoutStore } from '@/hooks/Store/useDashboardLayoutStore'
import { Flex, Layout } from 'antd'
import { getSidebarLogoContainerProps } from './sidebar.utils'

const { Sider } = Layout

export function SidebarLayout() {
  const { collapsed } = useDashboardLayoutStore()

  return (
    <Sider
      className="!bg-white shadow-md border-r border-[#f0f0f0] !hidden sm:!block h-screen"
      trigger={null}
      collapsible
      collapsed={collapsed}
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
      }}
    >
      <Flex
        align="center"
        justify="center"
        {...getSidebarLogoContainerProps({ collapsed })}
      >
        <Logo mini size={collapsed ? 32 : 64} />
      </Flex>
      <MainMenu />
    </Sider>
  )
}
