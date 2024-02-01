import { ApiPaginationMetaResult } from '@/@types/api.types'
import { Table as AntTable, type TableProps as AntTableProps } from 'antd'
import { AnyObject } from 'antd/es/_util/type'
import { ColumnType } from 'antd/es/table'
import clsx from 'clsx'
import { useEffect } from 'react'
import { useTableStore } from './useTableStore'

export type TableProps<RecordType> = AntTableProps<RecordType> & {
  paginationData?: ApiPaginationMetaResult
  columns?: ColumnType<RecordType>
}

export function Table<RecordType extends AnyObject = AnyObject>({
  dataSource,
  columns: columnsProp,
  className,
  paginationData = {} as ApiPaginationMetaResult,
  ...props
}: TableProps<RecordType>) {
  const { size = 'middle', columns, setColumns } = useTableStore()
  const { totalPages = 0, size: pageSize, number: currentPage } = paginationData
  useEffect(() => {
    if (columns !== columnsProp) setColumns(columnsProp as any)
  }, [columns, columnsProp, setColumns])

  return (
    <AntTable
      size={size}
      columns={columnsProp}
      className={clsx('!rounded-lg !shadow-sm', className)}
      rowKey="id"
      loading={dataSource === undefined}
      dataSource={dataSource}
      getPopupContainer={(el) => el}
      // TODO: implement this
      pagination={{
        total: totalPages,
        pageSize: pageSize,
        current: currentPage,
        onChange: (page, pageSize) => {
          console.log({ page, pageSize })
        },
      }}
      {...props}
    />
  )
}
