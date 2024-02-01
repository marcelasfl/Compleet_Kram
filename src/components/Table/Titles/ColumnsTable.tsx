'use client'
import { HolderOutlined } from '@ant-design/icons'
import { DndContext } from '@dnd-kit/core'
import { restrictToVerticalAxis } from '@dnd-kit/modifiers'
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Checkbox, Flex, Typography } from 'antd'
import { useTableStoreType } from '../useTableStore'

type ColumnsTableProps = {
  columns: useTableStoreType['columns']
  onChangeColumns?: useTableStoreType['setColumns']
}

export function ColumnsTable({ columns, onChangeColumns }: ColumnsTableProps) {
  const handleDragEnd = (event: any) => {
    const { active, over } = event
    if (active.id !== over.id) {
      const oldIndex = columns.findIndex(
        ({ dataIndex }) => dataIndex === active.id
      )
      const newIndex = columns.findIndex(
        ({ dataIndex }) => dataIndex === over.id
      )
      return onChangeColumns?.(arrayMove(columns, oldIndex, newIndex))
    }
  }

  function onToggleColumn({ dataIndex }: useTableStoreType['columns'][0]) {
    console.log('onToggleColumn')

    const nextColumns = columns.map(({ className = '', ...column }) => {
      const isHidden = className?.includes('hidden')
      const nextClassName = isHidden
        ? className?.replace('hidden', '')
        : className?.concat(' hidden')

      return column.dataIndex === dataIndex
        ? { ...column, className: nextClassName }
        : column
    })

    onChangeColumns?.(nextColumns)
  }

  return (
    <DndContext modifiers={[restrictToVerticalAxis]} onDragEnd={handleDragEnd}>
      <SortableContext
        items={columns.map(({ dataIndex }) => dataIndex as string)}
        strategy={verticalListSortingStrategy}
      >
        <Flex vertical className="min-w-[200px]">
          {columns.map((column) => (
            <SortableItem
              key={column.dataIndex}
              column={column}
              onToggleColumn={onToggleColumn}
            />
          ))}
        </Flex>
      </SortableContext>
    </DndContext>
  )
}

type SortableItemParams = {
  column: useTableStoreType['columns'][0]
  onToggleColumn: (column: useTableStoreType['columns'][0]) => void
}

const SortableItem = ({ column, onToggleColumn }: SortableItemParams) => {
  const { dataIndex, title, className } = column
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: dataIndex,
  })

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform && { ...transform, scaleY: 1 }),
    transition,
    ...(isDragging ? { position: 'relative', zIndex: 9999 } : {}),
  }

  return (
    <Flex ref={setNodeRef} style={style} data-id={dataIndex} {...attributes}>
      <Flex
        align="center"
        ref={setActivatorNodeRef}
        style={{ touchAction: 'none', cursor: 'move' }}
        className="w-full mb-1 p-1 hover:bg-blue-100 !text-neutral-400 hover:!text-neutral-600"
        {...listeners}
      >
        <HolderOutlined />
        <Checkbox
          className="!ml-4 !z-50"
          checked={!className?.includes('hidden')}
          onChange={() => onToggleColumn(column)}
        />
        <Typography.Text className="ml-2">{title as string}</Typography.Text>
      </Flex>
    </Flex>
  )
}
