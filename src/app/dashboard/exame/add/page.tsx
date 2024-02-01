'use client'

import ExameForm from '@/components/Forms/useExameForm'
import useExameMutation from '@/hooks/Mutations/useExameMutation'
import useCrudPageHelps from '@/hooks/useCrudPageHelps'
import { DashboardLayout as Layout } from '@layouts/dashboard'
export default function AddExamePage() {
  const { onSubmit } = useCrudPageHelps({
    useMutation: useExameMutation,
  })

  return (
    <Layout>
      <Layout.Sidebar />
      <Layout.Main>
        <Layout.Header />
        <Layout.content>
          <ExameForm onSubmit={onSubmit} />
        </Layout.content>
      </Layout.Main>
    </Layout>
  )
}
