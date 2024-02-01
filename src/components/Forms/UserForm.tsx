import { FormType } from '@/@types/form.types'
import { User, UserFormValidation } from '@/validations/user.validations'
import { FormItem } from '@components/FormItem'
import { Button, Checkbox, Form, Input } from 'antd'
import { useForm } from 'react-hook-form'

export default function UserForm({ data, onSubmit }: FormType<User>) {
  const { control, handleSubmit } = useForm<User>({
    resolver: UserFormValidation,
    defaultValues: data,
  })

  return (
    <Form onFinish={handleSubmit((values) => onSubmit(values))}>
      <FormItem control={control} name="name" label="Username">
        <Input />
      </FormItem>

      <FormItem control={control} name="password" valuePropName="checked">
        <Checkbox>Remember me</Checkbox>
      </FormItem>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}
