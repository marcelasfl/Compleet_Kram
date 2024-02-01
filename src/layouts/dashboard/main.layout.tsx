import { Layout } from 'antd'
import React from 'react'

type DashboardMainLayoutProps = {
  children: React.ReactNode
} & React.ComponentProps<typeof Layout>

export function DashboardMainContentLayout({
  children,
  ...props
}: DashboardMainLayoutProps) {
  return (
    <Layout {...props} className="!h-screen">
      {children}
    </Layout>
  )
}
