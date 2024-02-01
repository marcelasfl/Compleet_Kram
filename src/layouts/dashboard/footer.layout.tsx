import { Layout } from 'antd'
import React from 'react'

const { Footer } = Layout
export function DashboardFooterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <Footer>{children}</Footer>
}
