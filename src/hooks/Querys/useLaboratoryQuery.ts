import { ApiPaginationResult } from '@/@types/api.types'
import {
  UseQueryOptionsWithId,
  UseQueryOptionsWithQuery,
} from '@/@types/react-query.types'
import { useQuery } from '@tanstack/react-query'
import { defaultApiQueryFn } from '@utils/axios'
import { Laboratory } from '@validations/laboratory.validations'

export type useLaboratorysResult = ApiPaginationResult<Laboratory>

const LABORATORY_QUERY_KEY = 'laboratory'
export const LABORATORYS_QUERY_KEY = LABORATORY_QUERY_KEY.concat('s')
export const API_LABORATORY_URL = LABORATORY_QUERY_KEY

export function useLaboratoryQuery({
  id,
  ...options
}: UseQueryOptionsWithId<Laboratory>) {
  return useQuery({
    queryKey: [LABORATORY_QUERY_KEY, id],
    queryFn: () =>
      defaultApiQueryFn<Laboratory>({
        url: API_LABORATORY_URL,
        query: id,
      }),
    ...options,
  })
}

export function useLaboratorysQuery(
  { query, ...options } = {} as UseQueryOptionsWithQuery<useLaboratorysResult>
) {
  return useQuery({
    queryKey: [LABORATORYS_QUERY_KEY, query],
    queryFn: () =>
      defaultApiQueryFn<useLaboratorysResult>({
        url: API_LABORATORY_URL,
      }),
    ...options,
  })
}
