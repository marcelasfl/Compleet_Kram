'use client'

import TableActionsTitle from '@/components/Table/Titles/TableActionsTitle'
import { Patient } from '@/validations/patient.validations'
import { Table } from '@components/Table'
import { usePatientsQuery, usePatientsResult } from '@hooks/Querys/usePatientQuery'
import { DashboardLayout as Layout } from '@layouts/dashboard'

import { TableRowDescription } from '@/components/Descriptions/TableRowDescription'
import TableActionsColumn from '@/components/Table/Columns/TableActionsColumn'
import usePatientMutation from '@/hooks/Mutations/usePatientMutation'
import { useTableColumns } from '@/hooks/useTableColumns'

export default function PatientPage() {
  const [columns, setColumns] = useTableColumns<Patient>([
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: 'Nome',
      dataIndex: 'name',
    },
    {
      title: 'Nome Civil',
      dataIndex: 'surname',
    },
    {
      title: 'Email',
      dataIndex: 'emailAddress',
    },
    {
      title: 'Idade',
      dataIndex: 'age',
    },
    {
      key: 'actions',
      title: 'Ações',
      render: (_, record) => (
        <TableActionsColumn record={record} mutation={usePatientMutation} />
      ),
    },
  ])
  const { data = {} as usePatientsResult, refetch } = usePatientsQuery()
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
