import { ApiPaginationResult } from '@/@types/api.types'
import {
  UseQueryOptionsWithId,
  UseQueryOptionsWithQuery,
} from '@/@types/react-query.types'
import { useQuery } from '@tanstack/react-query'
import { defaultApiQueryFn } from '@utils/axios'
import { UnitMeasure } from '@validations/unit-measure.validations'

export type useUnitMeasuresResult = ApiPaginationResult<UnitMeasure>

const UNIT_MEASURE_QUERY_KEY = 'units-measurement'
export const UNIT_MEASURES_QUERY_KEY = UNIT_MEASURE_QUERY_KEY.concat('s')
export const API_UNIT_MEASURE_URL = UNIT_MEASURE_QUERY_KEY

export function useUnitMeasureQuery({
  id,
  ...options
}: UseQueryOptionsWithId<UnitMeasure>) {
  return useQuery({
    queryKey: [API_UNIT_MEASURE_URL, id],
    queryFn: () =>
      defaultApiQueryFn<UnitMeasure>({
        url: API_UNIT_MEASURE_URL,
        query: id,
      }),
    ...options,
  })
}

export function useUnitMeasuresQuery(
  { query = '?companyId=1', ...options } = {} as UseQueryOptionsWithQuery<useUnitMeasuresResult>
) {
  return useQuery({
    queryKey: [UNIT_MEASURES_QUERY_KEY, query],
    queryFn: () =>
      defaultApiQueryFn<useUnitMeasuresResult>({
        url: API_UNIT_MEASURE_URL,
        query
      }),
    ...options,
  })
}
