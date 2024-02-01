import { Form as AntForm } from 'antd'
import type React from 'react'
import { useEffect } from 'react'
import type { Control, FieldPath, FieldValues } from 'react-hook-form'
import { useController } from 'react-hook-form'

type AntFormItemProps = React.ComponentProps<typeof AntForm.Item>

export type FormItemProps<TFieldValues extends FieldValues = FieldValues> = {
  children: React.ReactNode
  control: Control<TFieldValues>
  name: FieldPath<TFieldValues>
} & Omit<AntFormItemProps, 'name' | 'normalize' | 'rules' | 'validateStatus'>

// TODO: Support `onBlur` `ref`
// FIXME: `Touched` does not change in devtool
export const FormItem = <TFieldValues extends FieldValues = FieldValues>({
  children,
  control,
  name,
  help,
  initialValue,
  ...props
}: FormItemProps<TFieldValues>) => {
  const { field, fieldState } = useController({ name, control })
  const form = AntForm.useFormInstance()

  const handleNormalize: AntFormItemProps['normalize'] = (value) => {
    field.onChange(value)
    return value
  }

  // watch field value here
  useEffect(() => {
    if (!fieldState.isDirty && initialValue && initialValue !== field.value) {
      field.onChange(initialValue)
      return form.setFieldValue(name, initialValue)
    }
    form.setFieldValue(name, field.value)
  }, [form, name, fieldState, initialValue, field])

  return (
    <AntForm.Item
      {...props}
      initialValue={field.value}
      name={name as string}
      normalize={handleNormalize}
      validateStatus={fieldState.invalid ? 'error' : undefined}
      help={fieldState.error?.message ?? help}
    >
      {children}
    </AntForm.Item>
  )
}
