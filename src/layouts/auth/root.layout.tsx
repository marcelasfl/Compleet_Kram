import { Layout } from 'antd'
import React from 'react'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Layout
      className="!h-screen"
      style={{
        backgroundImage:
          'url(https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg)',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center 110px',
        backgroundSize: '100%',
      }}
    >
      {children}
    </Layout>
  )
}
