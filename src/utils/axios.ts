import api from '@services/api'
import { AxiosRequestConfig } from 'axios'

type DefaultApiQueryFnParams<R> = AxiosRequestConfig<R> & {
  query?: string | number
  id?: number | string
  url: string
}

export const defaultApiQueryFn = async <R = unknown>({
  url,
  query,
  id,
  ...config
}: DefaultApiQueryFnParams<R>): Promise<R> => {
  const { data } = await api<R>(url.concat(id ? `/${id}` : '', query ? `${query}` : ''), config)
  return data
}

type DefaultApiActionFn<R> = DefaultApiQueryFnParams<R> & {
  id?: number | string
  del?: boolean
}

export const defaultApiActionFn = async <R>({
  url,
  query,
  id,
  data,
  del = false,
  ...config
}: DefaultApiActionFn<R>): Promise<R> => {
  const method = del ? 'DELETE' : id ? 'PUT' : 'POST'
  const { data: response } = await api(
    url.concat((id ? `/${id}` : ''), query ? `${query}` : ''),
    {
      method,
      ...(!del && { data: id ? { ...data, id } : data }),
      ...config,
    }
  )
  return response
}
