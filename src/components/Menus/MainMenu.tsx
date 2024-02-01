import { useDashboardLayoutStore } from '@/hooks/Store/useDashboardLayoutStore'
import { FileDoneOutlined, GroupOutlined, SolutionOutlined } from '@ant-design/icons'
import { Menu, MenuProps } from 'antd'
import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

type MainMenuProps = MenuProps

const MAIN_MENU_ITEMS = [
  {
    key: '/dashboard/exame-group',
    icon: <GroupOutlined />,
    label: <Link href="/dashboard/exame-group">Grupos de Exames</Link>,
  },
  {
    key: '/dashboard/exame',
    icon: <FileDoneOutlined />,
    label: <Link href="/dashboard/exame">Exames</Link>,
  },
  {
    key: '/dashboard/patient',
    icon: <SolutionOutlined />,
    label: <Link href="/dashboard/patient">Pacientes</Link>,

  },
  {
    key: '/dashboard/laboratory',
    icon: <SolutionOutlined />,
    label: <Link href="/dashboard/laboratory">Laboratórios</Link>,
  },
      
  {
    key: '/dashboard/unit-measurement',
    icon: <SolutionOutlined />,
    label: <Link href="/dashboard/unit-measurement">Unidades de Medida</Link>,

  },
]

export default function MainMenu({ className }: MainMenuProps) {
  const pathname = usePathname()
  const { selectedKeys, setSelectedKeys } = useDashboardLayoutStore()
  console.log({ pathname })

  useEffect(() => {
    setSelectedKeys([pathname])
  }, [pathname, setSelectedKeys])

  return (
    <Menu
      className={clsx('main', className)}
      mode="inline"
      items={MAIN_MENU_ITEMS}
      selectedKeys={selectedKeys}
      onSelect={({ key }) => setSelectedKeys([key])}
    />
  )
}
