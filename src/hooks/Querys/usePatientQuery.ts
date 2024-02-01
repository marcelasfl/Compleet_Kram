import { ApiPaginationResult } from '@/@types/api.types'
import {
  UseQueryOptionsWithId,
  UseQueryOptionsWithQuery,
} from '@/@types/react-query.types'
import { useQuery } from '@tanstack/react-query'
import { defaultApiQueryFn } from '@utils/axios'
import { Patient } from '@validations/patient.validations'

export type usePatientsResult = ApiPaginationResult<Patient>

const PATIENT_QUERY_KEY = 'patient'
export const PATIENTS_QUERY_KEY = PATIENT_QUERY_KEY.concat('s')
export const API_PATIENT_URL = PATIENT_QUERY_KEY

export function usePatientQuery({
  id,
  ...options
}: UseQueryOptionsWithId<Patient>) {
  return useQuery({
    queryKey: [PATIENT_QUERY_KEY, id],
    queryFn: () =>
      defaultApiQueryFn<Patient>({
        url: API_PATIENT_URL,
        id: id,
      }),
    ...options,
  })
}

export function usePatientsQuery(
  { query, ...options } = {} as UseQueryOptionsWithQuery<usePatientsResult>
) {
  return useQuery({
    queryKey: [PATIENTS_QUERY_KEY, query],
    queryFn: () =>
      defaultApiQueryFn<usePatientsResult>({
        url: API_PATIENT_URL,
      }),
    ...options,
  })
}
