'use client'

import PatientForm from '@/components/Forms/PatientForm'
import usePatientMutation from '@/hooks/Mutations/usePatientMutation'
import { usePatientQuery } from '@/hooks/Querys/usePatientQuery'
import useCrudPageHelps from '@/hooks/useCrudPageHelps'
import { DashboardLayout as Layout } from '@layouts/dashboard'
export default function EditPatientPage() {
  const { id, onSubmit } = useCrudPageHelps({
    useMutation: usePatientMutation,
  })
  const { data: patient } = usePatientQuery({ id: parseInt(id), refetchOnMount: true })

  return (
    <Layout>
      <Layout.Sidebar />
      <Layout.Main>
        <Layout.Header />
        <Layout.content>
          <PatientForm data={patient} onSubmit={onSubmit} />
        </Layout.content>
      </Layout.Main>
    </Layout>
  )
}
