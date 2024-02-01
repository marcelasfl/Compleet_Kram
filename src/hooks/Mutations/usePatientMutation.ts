import { setPaginationQueryData } from '@/utils/react-query.utils'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { defaultApiActionFn } from '@utils/axios'
import {
  MutationOptionsType,
  MutationResultType,
  MutationTypeVariables,
} from '../../@types/react-query.types'
import { Patient } from '../../validations/patient.validations'
import {
  API_PATIENT_URL,
  PATIENTS_QUERY_KEY,
  usePatientsResult,
} from '../Querys/usePatientQuery'

export default function usePatientMutation(
  options?: MutationOptionsType<Patient>
): MutationResultType<Patient> {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data, del }) =>
      defaultApiActionFn<Patient>({
        url: API_PATIENT_URL,
        id,
        del,
        data,
      }),
    onSuccess(data, variables) {
      queryClient.setQueryData(
        [PATIENTS_QUERY_KEY, undefined],
        (prev: usePatientsResult) => {
          return setPaginationQueryData<
            Patient,
            usePatientsResult,
            MutationTypeVariables<Patient>
          >(data, prev, variables)
        }
      )
    },
    ...options,
  })
}
