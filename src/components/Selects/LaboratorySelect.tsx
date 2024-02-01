import {
  useLaboratorysQuery,
  useLaboratorysResult,
} from '@/hooks/Querys/useLaboratoryQuery'
import { Select, SelectProps } from 'antd'

type LaboratorySelectProps = SelectProps

export function LaboratorySelect({ ...props }: LaboratorySelectProps) {
  const { data = {} as useLaboratorysResult } = useLaboratorysQuery()
  const { content = [] } = data

  return (
    <Select
      {...props}
      options={content.map(({ id: value, name: label }) => ({ label, value }))}
    />
  )
}
