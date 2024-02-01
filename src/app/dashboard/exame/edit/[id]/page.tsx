'use client'

import ExameForm from '@/components/Forms/useExameForm'
import useExameMutation from '@/hooks/Mutations/useExameMutation'
import { useExameQuery } from '@/hooks/Querys/useExameQuery'
import useCrudPageHelps from '@/hooks/useCrudPageHelps'
import { CreateExameZodScheme, Exame } from '@/validations/exame.validations'
import { DashboardLayout as Layout } from '@layouts/dashboard'
import { useRouter } from 'next/navigation'
export default function EditExamePage() {
  const router = useRouter()
  const { id, onSubmit } = useCrudPageHelps({
    useMutation: useExameMutation,
  })
  const { data: exame } = useExameQuery({ id: parseInt(id), refetchOnMount: true })
  const { mutateAsync } = useExameMutation()

  async function handleDuplicateClick() {
    if (!exame) return
    const { id, name, examGroup, laboratory, referenceValues, ...nextExame } = exame
    const response = await mutateAsync({
      data: CreateExameZodScheme.parse({
        ...nextExame,
        name: name.concat(' (Duplicado)'),
        examGroup: examGroup?.id,
        laboratory: laboratory?.id,
        referenceValues: {
          ...referenceValues,
          unitMeasurement: referenceValues?.unitMeasurement?.id,
          unitMeasurementIdeal: referenceValues?.unitMeasurementIdeal?.id,
        }
      }) as unknown as Exame,
    })
    router.push(`/dashboard/exame/edit/${response.id}?duplicate=true`,)
  }

  return (
    <Layout>
      <Layout.Sidebar />
      <Layout.Main>
        <Layout.Header />
        <Layout.content>
          <ExameForm data={exame} onSubmit={onSubmit} onDuplicateButtonClick={handleDuplicateClick} />
        </Layout.content>
      </Layout.Main>
    </Layout>
  )
}
