import useLaboratoryMutation from '@/hooks/Mutations/useLaboratoryMutation'
import { useDataCrud } from '@/hooks/useDataCrud'
import { Laboratory } from '@/validations/laboratory.validations'
import { Modal, ModalProps } from 'antd'
import { useState } from 'react'
import LaboratoryForm from '../Forms/LaboratoryForm'

type AddOrEditLaboratoryProps = {
  onFinish: (data?: Laboratory) => void
  data?: Laboratory
} & ModalProps

export default function AddOrEditLaboratoryModal({
  data,
  onOk: onOkProp,
  onFinish,
  onCancel: onCancelProp,
  ...props
}: AddOrEditLaboratoryProps) {
  const { mutateAsync: addOrEditLaboratory} = useLaboratoryMutation()
  const [finish, setFinish] = useState(false)
  const { isEdit } = useDataCrud(data)

  function onOk(e: React.MouseEvent<HTMLButtonElement>) {
    setFinish(true)
    onOkProp?.(e)
  }

  async function handleSubmit({ id, ...data }: Laboratory) {
    await addOrEditLaboratory({ id, data })
    onFinish(data)
  }

  return (
    <Modal
      destroyOnClose
      title={isEdit ? 'Editar Laboratório' : 'Adicionar Laboratório'}
      {...props}
      footer={null}
      onOk={onOk}
      onCancel={() => onFinish()}
    >
      <LaboratoryForm
        onSubmit={handleSubmit}
        data={data}
        onCancel={() => onFinish()}
      />
    </Modal>
  )
}