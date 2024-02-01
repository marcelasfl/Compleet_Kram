import useExameGroupMutation from '@/hooks/Mutations/useExameGroupMutation'
import { useDataCrud } from '@/hooks/useDataCrud'
import { ExameGroup } from '@/validations/exame-group.validations'
import { Modal, ModalProps } from 'antd'
import { useState } from 'react'
import ExameGroupForm from '../Forms/ExameGroupForm'

type AddOrEditExameGroupModalProps = {
  onFinish: (data?: ExameGroup) => void
  data?: ExameGroup
} & ModalProps

export default function AddOrEditExameGroupModal({
  data,
  onOk: onOkProp,
  onFinish,
  onCancel: onCancelProp,
  ...props
}: AddOrEditExameGroupModalProps) {
  const { mutateAsync: addOrEditExameGroup } = useExameGroupMutation()
  const [finish, setFinish] = useState(false)
  const { isEdit } = useDataCrud(data)

  function onOk(e: React.MouseEvent<HTMLButtonElement>) {
    setFinish(true)
    onOkProp?.(e)
  }

  async function handleSubmit({ id, ...data }: ExameGroup) {
    await addOrEditExameGroup({ id, data })
    onFinish(data)
  }

  return (
    <Modal
      destroyOnClose
      title={isEdit ? 'Editar Grupo de Exames' : 'Adicionar Grupo de Exame'}
      {...props}
      footer={null}
      onOk={onOk}
      onCancel={() => onFinish()}
    >
      <ExameGroupForm
        onSubmit={handleSubmit}
        data={data}
        onCancel={() => onFinish()}
      />
    </Modal>
  )
}
