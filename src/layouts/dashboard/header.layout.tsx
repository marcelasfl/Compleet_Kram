import { UserPopover } from '@/components/Popovers/UserPopover'
import { useDashboardLayoutStore } from '@/hooks/Store/useDashboardLayoutStore'
import { Button, Layout } from 'antd'
import clsx from 'clsx'
import { getButtonToggleSidebarProps } from './header.utils'

const { Header } = Layout
export default function DashboardHeaderLayout({
  children,
}: React.ComponentProps<typeof Header>) {
  const { collapsed, setCollapsed } = useDashboardLayoutStore()

  return (
    <Header
      className={clsx(
        '!bg-white flex items-center justify-center h-16 w-full !bg-inherit  !p-4 border-0 !border-solid !border-b-1 border-[#f0f0f0] ml-0 sm:!pl-[216px]',
        { 'sm:!pl-[96px]': collapsed }
      )}
    >
      <Button
        {...getButtonToggleSidebarProps({ collapsed })}
        onClick={() => setCollapsed(!collapsed)}
      />
      {children}
      <UserPopover />
    </Header>
  )
}
