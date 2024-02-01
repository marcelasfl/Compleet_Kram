import { TableProps } from 'antd'
import { AnyObject } from 'antd/es/_util/type'
import { ColumnType } from 'antd/es/table'
import { create } from 'zustand'

type ColumnTypeWithDataIndex<RecordType> = ColumnType<RecordType> & {
  dataIndex: string
}

export type useTableStoreType<RecordType extends AnyObject = AnyObject> = {
  columns: ColumnTypeWithDataIndex<RecordType>[]
  setColumns: (columns: ColumnTypeWithDataIndex<RecordType>[]) => void
  setSize: (size: TableProps<unknown>['size']) => void
} & Pick<TableProps<RecordType>, 'size'>

export const useTableStore = create<useTableStoreType>((set) => ({
  columns: [],
  setColumns: (columns) => set({ columns }),
  size: 'middle',
  setSize: (size) => set({ size }),
}))
