import { Links } from '@/@types/next.types'
import { MutationResultType } from '@/@types/react-query.types'
import { DeleteRecordType, useDeleteRecord } from '@/hooks/useDelete'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Button, Flex, Tooltip } from 'antd'
import { usePathname, useRouter } from 'next/navigation'

type TableActionsColumnProps<RecordType> = {
  record: RecordType
  mutation?: () => MutationResultType<RecordType>
  onDelete?: (record: RecordType) => void
  onEdit?: (record: RecordType) => void
  children?: React.ReactNode
}

export default function TableActionsColumn<
  RecordType extends DeleteRecordType
>({
  record,
  mutation,
  onDelete: onDeleteProp,
  onEdit: onEditProp,
  children
}: TableActionsColumnProps<RecordType>) {
  const pathName = usePathname()
  const router = useRouter()
  const { handleDelete } = useDeleteRecord<RecordType>(mutation as any)

  function onEdit(record: RecordType) {
    if (onEditProp) return onEditProp(record)
    const id = record.id?.toString() || String()
    router.push(pathName?.concat('/edit/', id) as Links)
  }

  function onDelete(record: RecordType) {
    if (onDeleteProp) return onDeleteProp(record)
    handleDelete(record)
  }

  return (
    <Flex gap="small">
      <Tooltip title="Editar">
        <Button
          size="small"
          type="text"
          icon={<EditOutlined />}
          onClick={() => {
            onEdit(record)
          }}
        />
      </Tooltip>
      {children}
      <Tooltip title="Excluir">
        <Button
          size="small"
          type="text"
          danger
          icon={<DeleteOutlined />}
          onClick={() => onDelete(record)}
        />
      </Tooltip>
    </Flex>
  )
}
