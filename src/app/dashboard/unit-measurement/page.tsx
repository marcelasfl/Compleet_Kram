'use client'

import { TableRowDescription } from '@/components/Descriptions/TableRowDescription';
import { Table } from '@/components/Table';
import TableActionsColumn from '@/components/Table/Columns/TableActionsColumn';
import { getDefaultTableColumns } from '@/components/Table/table.utils';
import TableActionsTitle from '@/components/Table/Titles/TableActionsTitle';
import useUnitMeasurementMutation from '@/hooks/Mutations/useUnitMeasurementMutation';
import { useUnitMeasuresQuery, useUnitMeasuresResult } from '@/hooks/Querys/useUnitMeasureQuery';
import { useTableColumns } from '@/hooks/useTableColumns';
import { UnitMeasure } from '@/validations/unit-measure.validations';
import { SelectOutlined } from '@ant-design/icons';
import { DashboardLayout as Layout } from '@layouts/dashboard'
import dynamic from 'next/dynamic';
import { useState } from 'react';

const AddOrEditExameGroupModal = dynamic(
    () => import('@/components/Modals/AddOrEditUnitMeasurementModal'),
    {
      ssr: false,
    }
  )

export default function UnitMeasurementPage(){
    const [selectedColumnEdit, setSelectedColumnEdit] = useState<UnitMeasure>();
    const [columns, setColumns] = useTableColumns<UnitMeasure>([
        {
            title:'ID',
            dataIndex:'id'
        },
        {
            title:'Nome',
            dataIndex:'name',
        },
        {
            title:'Sigla',
            dataIndex:'acronym'
        },
        ...getDefaultTableColumns<UnitMeasure>(),
        {
            key: 'actions',
            title: 'Ações',
            render: (_, record) => (
              <TableActionsColumn
                record={record}
                mutation={useUnitMeasurementMutation}
                onEdit={setSelectedColumnEdit}
              />
            ),
          },
    ]);

    const { data = {} as useUnitMeasuresResult, refetch } = useUnitMeasuresQuery();
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
                                onAddClick={()=>setSelectedColumnEdit({} as UnitMeasure)}
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