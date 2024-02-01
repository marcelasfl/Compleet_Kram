import { Layout } from 'antd'

const { Header } = Layout

type AuthHeaderLayoutProps = {
  children: React.ReactNode
} & React.ComponentProps<typeof Header>

export default function AuthHeaderLayout({ children }: AuthHeaderLayoutProps) {
  return <Header className="h-16 !bg-inherit !border-b-2">{children}</Header>
}
