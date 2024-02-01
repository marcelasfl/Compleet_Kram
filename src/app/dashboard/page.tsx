'use client'

import { DashboardLayout as Layout } from '@layouts/dashboard'

export default function DashboardPage() {
  return (
    <Layout>
      <Layout.Sidebar />
      <Layout.Main>
        <Layout.Header />
        <Layout.content>
          <h1>Dashboard</h1>
        </Layout.content>
      </Layout.Main>
    </Layout>
  )
}
