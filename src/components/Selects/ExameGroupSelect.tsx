import {
  useExameGroupsQuery,
  useExameGroupsResult,
} from '@/hooks/Querys/useExameGroupQuery'
import { Select, SelectProps } from 'antd'

type ExameGroupSelectProps = SelectProps

export function ExameGroupSelect({ ...props }: ExameGroupSelectProps) {
  const { data = {} as useExameGroupsResult } = useExameGroupsQuery()
  const { content = [] } = data

  return (
    <Select
      {...props}
      options={content.map(({ id, name }) => ({ label: name, value: id }))}
    />
  )
}
