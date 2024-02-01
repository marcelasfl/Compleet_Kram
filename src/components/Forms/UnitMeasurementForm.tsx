import { FormType } from '@/@types/form.types'
import { useForm } from '@/hooks/useForm'
import { UnitMeasure, UnitMeasurementFormValidation } from '@/validations/unit-measure.validations'
import { FormItem } from '@components/FormItem'
import { Button, Flex, Form, Input, Switch } from 'antd'

type UnitMeasurementFormProps = {
  onCancel?: () => void
} & FormType<UnitMeasure>

export default function UnitMeasurementForm({
  data,
  onSubmit,
  onCancel,
}: UnitMeasurementFormProps) {
  const { control, handleSubmit } = useForm<UnitMeasure>({
    resolver: UnitMeasurementFormValidation,
    defaultValues: data,
  })

  return (
    <Form
      onFinish={handleSubmit((values) => onSubmit(values))}
      layout="vertical"
    >
      <FormItem control={control} name="name" label="Nome">
        <Input />
      </FormItem>
      <FormItem control={control} name="acronym" label="Sigla">
        <Input />
      </FormItem>
      <FormItem control={control} name="active" valuePropName="checked">
        <Switch unCheckedChildren="Inativo" checkedChildren="Ativo" />
      </FormItem>
      <Flex gap="small" align="center" justify="end" className="mt-4">
        <Button type="default" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="primary" htmlType="submit">
          Salvar
        </Button>
      </Flex>
    </Form>
  )
}
