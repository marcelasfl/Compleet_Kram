import useUnitMeasurementMutation from '@/hooks/Mutations/useUnitMeasurementMutation'
import { useDataCrud } from '@/hooks/useDataCrud'
import { UnitMeasure } from '@/validations/unit-measure.validations'
import { Modal, ModalProps } from 'antd'
import { useState } from 'react'
import UnitMeasurementForm from '../Forms/UnitMeasurementForm'

type AddOrEditUnitMeasurementProps = {
  onFinish: (data?: UnitMeasure) => void
  data?: UnitMeasure
} & ModalProps

export default function AddOrEditUnitMeasurementModal({
  data,
  onOk: onOkProp,
  onFinish,
  onCancel: onCancelProp,
  ...props
}: AddOrEditUnitMeasurementProps) {
  const { mutateAsync: addOrEditUnitMeasurement} = useUnitMeasurementMutation()
  const [finish, setFinish] = useState(false)
  const { isEdit } = useDataCrud(data)

  function onOk(e: React.MouseEvent<HTMLButtonElement>) {
    setFinish(true)
    onOkProp?.(e)
  }

  async function handleSubmit({ id, ...data }: UnitMeasure) {
    await addOrEditUnitMeasurement({ id, data })
    onFinish(data)
  }

  return (
    <Modal
      destroyOnClose
      title={isEdit ? 'Editar Unidades de Medida' : 'Adicionar Unidade de Medida'}
      {...props}
      footer={null}
      onOk={onOk}
      onCancel={() => onFinish()}
    >
      <UnitMeasurementForm
        onSubmit={handleSubmit}
        data={data}
        onCancel={() => onFinish()}
      />
    </Modal>
  )
}
