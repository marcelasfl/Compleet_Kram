import { getValueByPath } from '@/functions/fef'
import { Descriptions, DescriptionsProps } from 'antd'
import { ColumnType } from 'antd/es/table'

type TableRowDescriptionProps<T> = Omit<DescriptionsProps, 'items'> & {
  record: T
  columns?: ColumnType<T>[]
  index: number
}

export function TableRowDescription<T extends Record<string, any>>({
  record,
  columns,
  index,
  ...props
}: TableRowDescriptionProps<T>) {
  function renderChildren(
    column?: ColumnType<T>
  ): React.ReactNode | T[keyof T] {


    const { dataIndex, render } = column || {}
    const value = Array.isArray(dataIndex) ? getValueByPath(record, dataIndex) : record[dataIndex?.toString() as keyof T]
    return render ? (render(value, record, index) as React.ReactNode) : value
  }

  return (
    <Descriptions
      title="Detalhes"
      items={columns
        ?.filter(({ dataIndex }) => dataIndex)
        ?.map((column) => ({
          label: column.title as string,
          children: renderChildren(column),
        }))}
      {...props}
    />
  )
}
