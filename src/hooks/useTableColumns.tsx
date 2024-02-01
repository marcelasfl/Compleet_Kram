import { TableProps } from '@components/Table'
import { useState } from 'react'

export function useTableColumns<T>(columnsProp: TableProps<T>['columns']) {
  return useState(columnsProp)
}
