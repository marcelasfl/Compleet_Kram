import { useEffect } from 'react'
import {
  FieldValues,
  UseFormProps,
  UseFormReturn,
  useForm as UseReactHookForm,
} from 'react-hook-form'

export function useForm<
  TFieldValues extends FieldValues = FieldValues,
  TContext = any,
  TTransformedValues extends FieldValues | undefined = undefined
>({
  defaultValues,
  ...props
}: UseFormProps<TFieldValues, TContext>): UseFormReturn<
  TFieldValues,
  TContext,
  TTransformedValues
> {
  const form = UseReactHookForm<TFieldValues, TContext, TTransformedValues>({
    ...props,
    defaultValues,
  })

  useEffect(() => {
    if (typeof defaultValues !== 'undefined') {
      form.reset(defaultValues as any, {
        keepValues: false,
        keepErrors: false,
        keepDirtyValues: false,
        keepIsSubmitSuccessful: false,
        keepTouched: false,
        keepDirty: false,
        keepSubmitCount: false,
        keepIsSubmitted: false,
        keepIsValid: false,
        keepDefaultValues: false,
      })
    }
  }, [defaultValues, form])

  return form
}
