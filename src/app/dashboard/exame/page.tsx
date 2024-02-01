'use client'

import TableActionsTitle from '@/components/Table/Titles/TableActionsTitle'
import { Exame } from '@/validations/exame.validations'
import { Table } from '@components/Table'
import { useExamesQuery, useExamesResult } from '@hooks/Querys/useExameQuery'
import { DashboardLayout as Layout } from '@layouts/dashboard'

import { TableRowDescription } from '@/components/Descriptions/TableRowDescription'
import TableActionsColumn from '@/components/Table/Columns/TableActionsColumn'
import useExameMutation from '@/hooks/Mutations/useExameMutation'
import { useTableColumns } from '@/hooks/useTableColumns'
import { Tag } from 'antd'

export default function ExamePage() {
  const [columns, setColumns] = useTableColumns<Exame>([
    {

      title: 'Código',
      dataIndex: 'code',
    },
    {
      className: "d-none",
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: 'Nome',
      dataIndex: 'name',
    },
    {
      title: 'Grupo de Exames',
      dataIndex: ['examGroup', 'name'],
    },
    {
      title: 'Laboratório',
      dataIndex: ['laboratory', 'name'],
    },
    {
      title: 'Gênero',
      dataIndex: 'genre',
      key: 'actions',
      className: 'hidden',
      render: (genre) => (
        <Tag>{genre === "M" ? "Masculino" : "Feminino"}</Tag>
      ),
    },
    {
      key: 'actions',
      title: 'Ações',
      render: (_, record) => (
        <TableActionsColumn record={record} mutation={useExameMutation} />
      ),
    },
  ])
  const { data = {} as useExamesResult, refetch } = useExamesQuery({ refetchOnWindowFocus: true })
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
      </Layout.Main>
    </Layout>
  )
}
