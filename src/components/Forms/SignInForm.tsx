import { FormType } from '@/@types/form.types'

import {
  SignInData,
  SingInFormValidation,
} from '@/validations/singIn.validations'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { FormItem } from '@components/FormItem'
import { Button, Checkbox, Flex, Form, Input, Typography } from 'antd'
import { useForm } from 'react-hook-form'

export default function SingInForm({
  data,
  inSubmit,
  onSubmit,
}: FormType<SignInData>) {
  const { control, handleSubmit, formState } = useForm<SignInData>({
    resolver: SingInFormValidation,
    defaultValues: data,
  })

  console.log(formState.errors)

  return (
    <Form
      onFinish={handleSubmit((values) => onSubmit(values))}
      layout="vertical"
    >
      <FormItem control={control} name="user" label="Email">
        <Input
          type="email"
          size="large"
          placeholder="Endereço de email"
          prefix={<UserOutlined />}
        />
      </FormItem>
      <FormItem control={control} name="password" label="Senha">
        <Input.Password
          size="large"
          placeholder="Senha"
          prefix={<LockOutlined />}
        />
      </FormItem>

      <FormItem control={control} name="remember" valuePropName="checked">
        <Flex>
          <Checkbox>Lembre de mim</Checkbox>
          <Typography.Link className="ml-auto hover:!underline" href="">
            Esqueceu sua senha?
          </Typography.Link>
        </Flex>
      </FormItem>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          size="large"
          disabled={inSubmit}
          block
          loading={inSubmit}
        >
          Entrar
        </Button>
      </Form.Item>
    </Form>
  )
}
