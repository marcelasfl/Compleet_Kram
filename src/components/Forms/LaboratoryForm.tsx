import { FormType } from '@/@types/form.types'
import { useForm } from '@/hooks/useForm'
import { Laboratory, LaboratoryFormValidation } from '@/validations/laboratory.validations'
import { FormItem } from '@components/FormItem'
import { Button, Flex, Form, Input, Switch } from 'antd'

type LaboratoryFormProps = {
  onCancel?: () => void
} & FormType<Laboratory>

export default function LaboratoryForm({
  data,
  onSubmit,
  onCancel,
}: LaboratoryFormProps) {
  const { control, handleSubmit } = useForm<Laboratory>({
    resolver: LaboratoryFormValidation,
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