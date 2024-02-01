'use client'

import PatientForm from '@/components/Forms/PatientForm'
import usePatientMutation from '@/hooks/Mutations/usePatientMutation'
import useCrudPageHelps from '@/hooks/useCrudPageHelps'
import { DashboardLayout as Layout } from '@layouts/dashboard'
export default function AddPatientPage() {
  const { onSubmit } = useCrudPageHelps({
    useMutation: usePatientMutation,
  })


  return (
    <Layout>
      <Layout.Sidebar />
      <Layout.Main>
        <Layout.Header />
        <Layout.content>
          <PatientForm onSubmit={onSubmit} />
        </Layout.content>
      </Layout.Main>
    </Layout>
  )
}
