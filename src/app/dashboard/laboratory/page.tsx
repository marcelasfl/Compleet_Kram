'use client'

import { TableRowDescription } from '@/components/Descriptions/TableRowDescription';
import { Table } from '@/components/Table';
import TableActionsColumn from '@/components/Table/Columns/TableActionsColumn';
import { getDefaultTableColumns } from '@/components/Table/table.utils';
import TableActionsTitle from '@/components/Table/Titles/TableActionsTitle';
import useLaboratoryMutation from '@/hooks/Mutations/useLaboratoryMutation';
import { useLaboratorysQuery, useLaboratorysResult } from '@/hooks/Querys/useLaboratoryQuery';
import { useTableColumns } from '@/hooks/useTableColumns';
import { Laboratory } from '@/validations/laboratory.validations';
import { DashboardLayout as Layout } from '@layouts/dashboard'
import dynamic from 'next/dynamic';
import { useState } from 'react';

const AddOrEditExameGroupModal = dynamic(
    () => import('@/components/Modals/AddOrEditLaboratoryModal'),
    {
      ssr: false,
    }
  )

export default function LaboratoryPage(){
    const [selectedColumnEdit, setSelectedColumnEdit] = useState<Laboratory>();
    const [columns, setColumns] = useTableColumns<Laboratory>([
        {
            title:'ID',
            dataIndex:'id'
        },
        {
            title:'Nome',
            dataIndex:'name',
        },
        ...getDefaultTableColumns<Laboratory>(),
        {
            key: 'actions',
            title: 'Ações',
            render: (_, record) => (
              <TableActionsColumn
                record={record}
                mutation={useLaboratoryMutation}
                onEdit={setSelectedColumnEdit}
              />
            ),
          },
    ]);

    const { data = {} as useLaboratorysResult, refetch } = useLaboratorysQuery();
    const { content } = data




    return(
        <Layout>
            <Layout.Sidebar/>
            <Layout.Main>
                <Layout.Header/>
                <Layout.content>
                    <Table
                        title={()=>(
                            <TableActionsTitle
                                onAddClick={()=>setSelectedColumnEdit({} as Laboratory)}
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
                  onFinish={()=>setSelectedColumnEdit(undefined)}
                />
            </Layout.Main>

        </Layout>
    )
}