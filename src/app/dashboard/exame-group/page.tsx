'use client'

import TableActionsTitle from '@/components/Table/Titles/TableActionsTitle'
import { ExameGroup } from '@/validations/exame-group.validations'
import { Table } from '@components/Table'
import {
  useExameGroupsQuery,
  useExameGroupsResult,
} from '@hooks/Querys/useExameGroupQuery'
import { DashboardLayout as Layout } from '@layouts/dashboard'
import { useState } from 'react'

import { TableRowDescription } from '@/components/Descriptions/TableRowDescription'
import TableActionsColumn from '@/components/Table/Columns/TableActionsColumn'
import { getDefaultTableColumns } from '@/components/Table/table.utils'
import useExameGroupMutation from '@/hooks/Mutations/useExameGroupMutation'
import { useTableColumns } from '@/hooks/useTableColumns'
import dynamic from 'next/dynamic'

const AddOrEditExameGroupModal = dynamic(
  () => import('@/components/Modals/AddOrEditExameGroupModal'),
  {
    ssr: false,
  }
)

export default function ExameGroupPage() {
  const [selectedColumnEdit, setSelectedColumnEdit] = useState<ExameGroup>()
  const [columns, setColumns] = useTableColumns<ExameGroup>([
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: 'Nome',
      dataIndex: 'name',
    },
    ...getDefaultTableColumns<ExameGroup>(),
    {
      key: 'actions',
      title: 'Ações',
      render: (_, record) => (
        <TableActionsColumn
          record={record}
          mutation={useExameGroupMutation}
          onEdit={setSelectedColumnEdit}
        />
      ),
    },
  ])
  const { data = {} as useExameGroupsResult, refetch } = useExameGroupsQuery()
  const { content } = data

  return (
    <Layout>
      <Layout.Sidebar />
      <Layout.Main>
        <Layout.Header />
        <Layout.content>
          <Table
            title={() => (
              <TableActionsTitle
                onAddClick={() => setSelectedColumnEdit({} as ExameGroup)}
                onReloadClick={refetch}
                onChangeColumns={setColumns}
              />
            )}
            columns={columns}
            dataSource={content}
            bordered
            expandable={{
              expandRowByClick: true,
              expandedRowRender: (record, index) => (
                <TableRowDescription
                  record={record}
                  columns={columns}
                  index={index}
                />
              ),
            }}
          />
        </Layout.content>
        <AddOrEditExameGroupModal
          open={Boolean(selectedColumnEdit)}
          data={selectedColumnEdit}
          onFinish={() => setSelectedColumnEdit(undefined)}
        />
      </Layout.Main>
    </Layout>
  )
}
