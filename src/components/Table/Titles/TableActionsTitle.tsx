import {
  ColumnHeightOutlined,
  PlusOutlined,
  ReloadOutlined,
  SettingOutlined,
} from '@ant-design/icons'
import {
  Button,
  Collapse,
  Dropdown,
  Flex,
  Input,
  MenuProps,
  Popover,
  TableProps,
  Tooltip,
} from 'antd'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { useTableStore } from '../useTableStore'
import { ColumnsTable } from './ColumnsTable'

type TableActionsTitleProps = {
  onAddClick?: () => void
  onReloadClick?: () => void
  onChangeColumns?: (columns: any) => void
}

const TABLE_SIZES_OPTIONS_MENU: MenuProps['items'] = [
  {
    key: 'large',
    label: 'Largo',
  },
  {
    key: 'middle',
    label: 'Médio',
  },
  {
    key: 'small',
    label: 'Compacto',
  },
]

export default function TableActionsTitle({
  onAddClick: onAddClickProp,
  onReloadClick: onReloadClickProp,
  onChangeColumns,
}: TableActionsTitleProps) {
  const router = useRouter()
  const pathname = usePathname()
  const { size, setSize, columns } = useTableStore()
  const [inReload, setInReload] = useState(false)

  function onAddButtonClick() {
    if (onAddClickProp) return onAddClickProp()
    router.push(pathname.concat('/add') as any)
  }

  async function onReloadClick() {
    setInReload(true)
    await onReloadClickProp?.()
    setInReload(false)
  }

  return (
    <Flex vertical>
      <Collapse
        activeKey={['0']}
        bordered={false}
        items={[
          {
            collapsible: 'icon',
            showArrow: true,
            className: '!rounded-md bg-white !shadow-sm mb-2',
            key: '1',
            label: (
              <>
                <Input.Search
                  className="w-96"
                  placeholder="Inserir texto de pesquisa"
                  allowClear
                  enterButton
                />
              </>
            ),
            children: <p>dewfew</p>,
          },
        ]}

      />
      <Flex align="center">
        <Button
          icon={<PlusOutlined />}
          type="primary"
          onClick={onAddButtonClick}
          className="ml-auto mr-3"
        >
          Novo
        </Button>
        <Flex align="center" justify="center" gap="small">
          {onReloadClickProp && (
            <Tooltip title="Atualizar">
              <Button
                loading={inReload}
                icon={<ReloadOutlined />}
                className="!border-none"
                onClick={onReloadClick}
              />
            </Tooltip>
          )}
          <Dropdown
            trigger={['click']}
            menu={{
              items: TABLE_SIZES_OPTIONS_MENU,
              selectable: true,
              selectedKeys: [size as string],
              onSelect: ({ key }) => {
                setSize(key as TableProps<any>['size'])
              },
            }}
            arrow
          >
            <Tooltip title="Intensidade">
              <Button
                icon={<ColumnHeightOutlined />}
                className="!border-none"
              />
            </Tooltip>
          </Dropdown>
          <Popover
            trigger="click"
            placement="bottomLeft"
            overlayInnerStyle={{ padding: 0 }}
            content={
              <ColumnsTable
                columns={columns}
                onChangeColumns={onChangeColumns}
              />
            }
          >
            <Button icon={<SettingOutlined />} className="!border-none" />
          </Popover>
        </Flex>
      </Flex>
    </Flex>
  )
}
