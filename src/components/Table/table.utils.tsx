import { AnyObject } from 'antd/es/_util/type'
import { ColumnType } from 'antd/es/table'
import { ActiveTag } from '../Tags/ActiveTag'

export function getDefaultTableColumns<
  T extends AnyObject = AnyObject
>(): ColumnType<T>[] {
  return [
    {
      title: 'Ativo',
      dataIndex: 'active',
      render: (active) => <ActiveTag value={active} />,
    },
  ]
}
