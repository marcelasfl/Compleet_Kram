import { MainDrawer } from '@/components/Drawer/MainDrawer'
import { useDashboardLayoutStore } from '@/hooks/Store/useDashboardLayoutStore'
import { useIsMobile } from '@/hooks/useIsMobile'
import { Layout } from 'antd'
import React from 'react'

type DashboardLayoutProps = React.ComponentProps<typeof Layout>
export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { collapsed, setCollapsed } = useDashboardLayoutStore()
  const isMobile = useIsMobile()

  return (
    <Layout hasSider className="!h-screen">
      {children}

      {isMobile && (
        <MainDrawer open={collapsed} onClose={() => setCollapsed(false)} />
      )}
    </Layout>
  )
}
