import {
  UseMutationOptions,
  UseMutationResult,
  UseQueryOptions,
} from '@tanstack/react-query'
import { AxiosError } from 'axios'

type IdParam = number
type QueryParam = number

export type UseQueryOptionsType<R> = Omit<
  UseQueryOptions<R, AxiosError>,
  'queryKey' | 'queryFn'
>

export type UseQueryOptionsWithId<R> = {
  id: IdParam
} & UseQueryOptionsType<R>

export type UseQueryOptionsWithQuery<R> = {
  query?: QueryParam
} & UseQueryOptionsType<R>

export type MutationTypeVariables<D> = {
  id?: number | string
  del?: boolean
  data?: D
}

export type MutationResultType<
  D,
  Error = AxiosError,
  Variables = MutationTypeVariables<D>
> = UseMutationResult<D, Error, Variables>

export type MutationOptionsType<
  D,
  Error = AxiosError,
  Variables = MutationTypeVariables<D>
> = UseMutationOptions<D, Error, Variables>
