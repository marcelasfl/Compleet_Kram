import { ApiPaginationResult } from '@/@types/api.types'
import {
  UseQueryOptionsWithId,
  UseQueryOptionsWithQuery,
} from '@/@types/react-query.types'
import { useQuery } from '@tanstack/react-query'
import { defaultApiQueryFn } from '@utils/axios'
import { Exame } from '@validations/exame.validations'

export type useExamesResult = ApiPaginationResult<Exame>

const EXAME_QUERY_KEY = 'exams'
export const EXAMES_QUERY_KEY = EXAME_QUERY_KEY.concat('s')
export const API_EXAME_URL = EXAME_QUERY_KEY

export function useExameQuery({
  id,
  ...options
}: UseQueryOptionsWithId<Exame>) {
  return useQuery({
    queryKey: [EXAME_QUERY_KEY, id],
    queryFn: () =>
      defaultApiQueryFn<Exame>({
        url: API_EXAME_URL,
        id,
      }),
    ...options,
  })
}

export function useExamesQuery(
  { query, ...options } = {} as UseQueryOptionsWithQuery<useExamesResult>
) {
  return useQuery({
    queryKey: [EXAMES_QUERY_KEY, query],
    queryFn: () =>
      defaultApiQueryFn<useExamesResult>({
        url: API_EXAME_URL,
      }),
    ...options,
  })
}
