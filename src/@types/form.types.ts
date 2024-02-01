import { FieldValues, SubmitHandler } from 'react-hook-form'

export type FormTypeSubmitOptions = {
  repeat?: boolean
  callback?: () => void
}

export type FormType<D, SubmitD = D> = {
  data?: D
  inSubmit?: boolean
  loading?: boolean
  onSubmit: (
    data: D,
    options?: FormTypeSubmitOptions
  ) => Promise<SubmitD | void>
  onFinish?: SubmitHandler<D & FieldValues>
}
